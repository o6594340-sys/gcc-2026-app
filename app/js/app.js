/* ═══════════════════════════════════════════
   Global Corporate Club 2026
   GreenCode International · App Logic
═══════════════════════════════════════════ */

const App = (() => {

  /* ─── TELEGRAM ───────────────────────── */
  const tg     = window.Telegram?.WebApp;
  const tgUser = tg?.initDataUnsafe?.user;

  function haptic(style = 'light') {
    tg?.HapticFeedback?.impactOccurred(style);
  }

  /* ─── DATA ────────────────────────────── */
  function adminData(key, fallback) {
    try {
      const s = localStorage.getItem('gcc_' + key);
      return s ? JSON.parse(s) : fallback;
    } catch { return fallback; }
  }

  function getEvent()      { return adminData('event', EVENT); }
  function getDays()       { return adminData('days', DAYS); }
  function getHotel()      { return adminData('hotel', HOTEL); }
  function getExhibitors() { return adminData('exhibitors', EXHIBITORS); }

  function getAnnouncement() {
    try {
      const s = localStorage.getItem('gcc_announcement');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  }

  const EMOJI = {
    transfer: '🚌', meal: '🍽', excursion: '🏛', hotel: '🏨',
    business: '💼', dinner: '🍷', gala: '🥂', free: '🛍',
    break: '☕', arrival: '📍', key: '🔑', default: '📌',
  };

  // Цвет точки по типу события
  const TYPE_COLOR = {
    business:  '#2563EB',
    meal:      '#D97706',
    dinner:    '#7C3AED',
    gala:      '#DB2777',
    excursion: '#059669',
    transfer:  '#6B7280',
    break:     '#92400E',
    free:      '#16A34A',
    hotel:     '#0284C7',
    key:       '#DC2626',
    arrival:   '#0284C7',
    default:   '#9CA3AF',
  };

  let state = { tab: 'today', programDay: TODAY_INDEX };

  /* ─── BRANDING ───────────────────────── */
  function applyBranding() {
    const ev    = getEvent();
    const brand = ev.brand || {};
    const color = brand.color || '#166534';

    document.documentElement.style.setProperty('--accent',       color);
    document.documentElement.style.setProperty('--accent-dark',  shadeColor(color, -15));
    document.documentElement.style.setProperty('--accent-light', hexToRgba(color, 0.08));

    const titleEl = document.getElementById('header-title');
    const subEl   = document.getElementById('header-sub');
    if (titleEl) titleEl.textContent = ev.title || titleEl.textContent;
    if (subEl)   subEl.textContent   = ev.dates ? ev.dates + (ev.location ? ' · ' + ev.location : '') : subEl.textContent;

    const logoEl = document.getElementById('header-logo');
    if (logoEl) {
      if (brand.logo) { logoEl.src = brand.logo; logoEl.classList.remove('hidden'); }
      else              logoEl.classList.add('hidden');
    }
  }

  function shadeColor(hex, pct) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + pct));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + pct));
    const b = Math.min(255, Math.max(0, (num & 0xff) + pct));
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  }

  function hexToRgba(hex, alpha) {
    const num = parseInt(hex.replace('#', ''), 16);
    return `rgba(${num >> 16},${(num >> 8) & 0xff},${num & 0xff},${alpha})`;
  }

  function applyGradient() {
    const root   = document.documentElement;
    const accent = root.style.getPropertyValue('--accent').trim() || '#166534';
    const dark   = shadeColor(accent, -40);
    root.style.setProperty('--header-bg', accent);
    root.style.setProperty('--now-bg',    `linear-gradient(135deg, ${accent} 0%, ${dark} 100%)`);
    root.style.setProperty('--now-shadow', `0 4px 20px ${hexToRgba(accent, 0.35)}`);
  }

  /* ─── INIT ────────────────────────────── */
  function init() {
    if (tg) { tg.ready(); tg.expand(); tg.BackButton?.hide(); }
    applyBranding();
    applyGradient();
    renderAnnouncement();
    renderToday();
  }

  /* ─── ANNOUNCEMENT ─────────────────────── */
  function renderAnnouncement() {
    const ann = getAnnouncement();
    let el = document.getElementById('announcement-bar');
    if (!el) {
      el = document.createElement('div');
      el.id = 'announcement-bar';
      document.querySelector('.main-content').prepend(el);
    }
    if (!ann || !ann.text) { el.style.display = 'none'; return; }
    const icons = { info: 'ℹ️', warning: '⚠️', success: '✅' };
    el.className = `announcement-bar ann-${ann.type}`;
    el.innerHTML = `${icons[ann.type] || 'ℹ️'} ${ann.text}`;
    el.style.display = 'block';
  }

  /* ─── TAB SWITCHER ────────────────────── */
  function switchTab(tab, btn) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.remove('hidden');
    btn.classList.add('active');
    state.tab = tab;
    haptic('light');

    const renderers = {
      today:      renderToday,
      program:    renderProgram,
      location:   renderLocation,
      excursion:  renderExcursion,
      exhibitors: renderExhibitors,
    };
    if (renderers[tab]) renderers[tab]();
  }

  /* ─── TODAY ───────────────────────────── */
  function renderToday() {
    const day  = getDays()[TODAY_INDEX];
    const now  = day.activities.find(a => a.isNow);
    const next = day.activities.find(a => a.isNext);
    const short = day.date.replace(/,.*$/, '');

    const greeting = tgUser?.first_name
      ? `Добро пожаловать, ${tgUser.first_name}`
      : 'Добро пожаловать';

    let html = `
      <div class="today-hero" style="background:linear-gradient(135deg,#052e16 0%,#166534 45%,${day.color} 80%,#4ade80 100%)">
        <div class="today-eyebrow">GCC 2026 · ${short}</div>
        <div class="today-name">${greeting}</div>
        <div class="today-theme">${day.theme}</div>
        <div class="today-live"><span class="live-dot"></span> Программа актуальна</div>
      </div>
      <div class="section-pad">
    `;

    if (now) html += `
      <div class="now-block">
        <div class="now-label">● СЕЙЧАС</div>
        <div class="now-title">${now.title}</div>
        <div class="now-meta">${now.location ? `📍 ${now.location} · ` : ''}${now.time}</div>
        ${now.note ? `<div class="now-note">${now.note}</div>` : ''}
      </div>`;

    if (next) html += `
      <div class="next-block">
        <div class="next-label">Следующее</div>
        <div class="next-title">${next.title}</div>
        <div class="next-meta">${next.location ? `📍 ${next.location} · ` : ''}${next.time}</div>
      </div>`;

    const ev = getEvent();
    html += `
      <div class="wifi-row" onclick="App.copyWifi()">
        <span>📶</span>
        <span class="wifi-net">${ev.wifi.network}</span>
        <span class="wifi-sep">·</span>
        <span class="wifi-pass">${ev.wifi.password}</span>
        <span class="wifi-copy" id="wifi-copied">Скопировано ✓</span>
      </div>
    `;

    html += `<div class="section-title" style="margin-top:24px">Программа дня</div>`;
    html += `<div class="card"><div class="card-body">`;
    day.activities.forEach(a => {
      const active = a.isNow ? 'active' : '';
      const dotColor = active ? '' : `background:${TYPE_COLOR[a.type] || TYPE_COLOR.default}`;
      html += `
        <div class="mini-timeline-item ${active}">
          <span class="mini-time">${a.time}</span>
          <span class="mini-dot ${active}" style="${dotColor}"></span>
          <div class="mini-info">
            <div class="mini-title">${a.title}</div>
            ${a.location ? `<div class="mini-loc">📍 ${a.location}</div>` : ''}
          </div>
        </div>`;
    });
    html += `</div></div>`;

    const hour = new Date().getHours();
    const timeSlot = hour >= 6 && hour < 12 ? 'morning'
                   : hour >= 12 && hour < 18 ? 'afternoon'
                   : hour >= 18 && hour < 23 ? 'evening'
                   : 'any';
    const candidates = PRACTICAL.filter(p => p.time === timeSlot || p.time === 'any');
    const pool = candidates.length ? candidates : PRACTICAL;
    const tip = pool[Math.floor(Math.random() * pool.length)];
    html += `
      <div class="tip-card">
        <div class="tip-icon">${tip.icon}</div>
        <div>
          <div class="tip-title">Совет: ${tip.title}</div>
          <div class="tip-text">${tip.text}</div>
        </div>
      </div>
    `;

    html += `</div>`;
    document.getElementById('tab-today').innerHTML = html;
  }

  function copyWifi() {
    navigator.clipboard.writeText(EVENT.wifi.password).catch(() => {});
    haptic('medium');
    const el = document.getElementById('wifi-copied');
    if (el) { el.style.opacity = '1'; setTimeout(() => el.style.opacity = '0', 2000); }
  }

  /* ─── PROGRAM ─────────────────────────── */
  function renderProgram() {
    const container = document.getElementById('tab-program');
    const day = getDays()[state.programDay];

    let tabs = '<div class="day-tabs">';
    getDays().forEach((d, i) => {
      const act = i === state.programDay ? 'active' : '';
      tabs += `<button class="day-tab ${act}"
        style="${act ? `background:${d.color};color:white` : ''}"
        onclick="App.selectProgramDay(${i})">${d.label}</button>`;
    });
    tabs += '</div>';

    let items = `<div class="program-meta">${day.date} · ${day.theme}</div>`;
    items += `<div class="card"><div class="card-body">`;
    day.activities.forEach(a => {
      const active = a.isNow ? 'active' : '';
      const dotColor = active ? '' : `background:${TYPE_COLOR[a.type] || TYPE_COLOR.default}`;
      items += `
        <div class="program-item">
          <span class="program-time" style="color:${TYPE_COLOR[a.type] || day.color}">${a.time}</span>
          <span class="program-dot ${active}" style="${dotColor}"></span>
          <div class="program-info">
            <div class="program-title">${a.title}</div>
            ${a.location ? `<div class="program-loc">📍 ${a.location}</div>` : ''}
            ${a.note     ? `<div class="program-note">${a.note}</div>` : ''}
          </div>
          ${active ? `<span class="now-badge" style="background:${day.color}22;color:${day.color}">Сейчас</span>` : ''}
        </div>`;
    });
    items += `</div></div>`;

    container.innerHTML = `<div class="section-pad">${tabs}${items}</div>`;
  }

  function selectProgramDay(i) {
    state.programDay = i;
    renderProgram();
  }

  /* ─── LOCATION (hotel + transfer + nearby) ───── */
  function renderLocation() {
    const h  = getHotel();
    const ev = getEvent();
    const stars = '★'.repeat(h.stars || 5);

    const amenityCards = (h.amenities || []).map(a => `
      <div class="hotel-amenity">
        <div class="hotel-amenity-icon">${a.icon}</div>
        <div class="hotel-amenity-title">${a.title}</div>
        <div class="hotel-amenity-note">${a.note}</div>
      </div>`).join('');

    let html = '';
    if (h.image) html += `<img class="hotel-photo" src="${h.image}" alt="${h.name}" loading="lazy">`;

    html += `<div class="section-pad">`;

    // — Отель
    html += `
      <div class="hotel-name-block">
        <div class="hotel-stars">${stars}</div>
        <h2 class="hotel-name">${h.name}</h2>
      </div>
      <div class="hotel-quickgrid">
        <div class="hotel-quickitem">
          <div class="hotel-quick-label">Заезд</div>
          <div class="hotel-quick-val">${h.checkin}</div>
        </div>
        <div class="hotel-quickitem">
          <div class="hotel-quick-label">Выезд</div>
          <div class="hotel-quick-val">${h.checkout}</div>
        </div>
        <div class="hotel-quickitem">
          <div class="hotel-quick-label">Wi-Fi</div>
          <div class="hotel-quick-val" style="font-size:12px">${ev.wifi.network}</div>
        </div>
        <div class="hotel-quickitem" onclick="window.location='tel:${h.phone}'" style="cursor:pointer">
          <div class="hotel-quick-label">Телефон</div>
          <div class="hotel-quick-val" style="font-size:12px;color:var(--accent)">${h.phone}</div>
        </div>
      </div>
      ${h.desc ? `<p class="hotel-desc">${h.desc}</p>` : ''}
      ${h.breakfast ? `<div class="hotel-breakfast">☕ <strong>Завтрак:</strong> ${h.breakfast}</div>` : ''}
    `;

    if (h.amenities?.length) {
      html += `<div class="section-title" style="margin-bottom:12px">Удобства</div>
               <div class="hotel-amenities-grid">${amenityCards}</div>`;
    }

    if (h.tips?.length) {
      html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">Советы об отеле</div>
               <div class="hotel-tips">${h.tips.map(t => `<div class="hotel-tip-row">💡 ${t}</div>`).join('')}</div>`;
    }

    if (h.address) {
      html += `<div class="hotel-tips" style="margin-top:8px"><div class="hotel-tip-row">📍 ${h.address}</div></div>`;
    }

    // — Трансфер
    html += `<div class="section-title" style="margin-top:28px;margin-bottom:12px">Трансферы</div>`;
    if (TRANSFERS.info) {
      html += `<div class="announcement-bar ann-info" style="margin-bottom:12px;display:block">ℹ️ ${TRANSFERS.info}</div>`;
    }

    const renderGroup = (groups) => groups.map(g => `
      <div class="card" style="margin-bottom:12px">
        <div class="card-body">
          <div style="font-weight:700;font-size:15px;margin-bottom:12px;color:${g.color}">${g.label}</div>
          ${g.items.map(item => `
            <div class="mini-timeline-item">
              <span class="mini-time">${item.time}</span>
              <span class="mini-dot" style="background:${g.color}"></span>
              <div class="mini-info">
                <div class="mini-title">${item.title}</div>
                ${item.note ? `<div class="mini-loc">${item.note}</div>` : ''}
              </div>
            </div>`).join('')}
        </div>
      </div>`).join('');

    html += `<div style="font-weight:600;font-size:13px;color:var(--text-secondary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">Заезд</div>`;
    html += renderGroup(TRANSFERS.arrival);
    html += `<div style="font-weight:600;font-size:13px;color:var(--text-secondary);margin-top:16px;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">Отъезд</div>`;
    html += renderGroup(TRANSFERS.departure);

    if (TRANSFERS.contacts?.length) {
      html += `<div class="section-title" style="margin-top:20px;margin-bottom:12px">Контакт по трансферу</div>`;
      TRANSFERS.contacts.forEach(c => {
        const tgLink = c.telegram ? `<a href="${c.telegram}" class="contact-btn tg-btn" target="_blank">✈️ Telegram</a>` : '';
        const phLink = c.phone    ? `<a href="tel:${c.phone}" class="contact-btn ph-btn">📞 Звонок</a>` : '';
        html += `
          <div class="card"><div class="card-body">
            <div style="font-weight:600;margin-bottom:2px">${c.name}</div>
            <div style="color:var(--text-secondary);font-size:14px;margin-bottom:10px">${c.role}</div>
            <div style="display:flex;gap:8px">${tgLink}${phLink}</div>
          </div></div>`;
      });
    }

    // — Рядом с отелем
    html += `<div class="section-title" style="margin-top:28px;margin-bottom:12px">Рядом с отелем</div>`;
    NEARBY.forEach(p => {
      html += `
        <div class="card" style="margin-bottom:12px">
          <div class="card-body">
            <div class="nearby-header">
              <span class="nearby-icon">${p.icon}</span>
              <div class="nearby-info">
                <div class="nearby-title">${p.title}</div>
                <div class="nearby-meta">${p.distance ? `📍 ${p.distance}` : ''}${p.hours ? ` · 🕐 ${p.hours}` : ''}</div>
              </div>
            </div>
            ${p.desc ? `<p class="nearby-desc">${p.desc}</p>` : ''}
            ${p.tip  ? `<div class="hotel-tip-row">💡 ${p.tip}</div>` : ''}
          </div>
        </div>`;
    });

    // — Кипрская кухня
    html += `<div class="section-title" style="margin-top:28px;margin-bottom:8px">Кипрская кухня</div>`;
    html += `<p class="hotel-desc" style="margin-top:0;margin-bottom:12px">${CUISINE.intro}</p>`;
    CUISINE.dishes.forEach(d => {
      html += `
        <div class="card" style="margin-bottom:10px">
          <div class="card-body">
            <div style="display:flex;gap:12px;align-items:flex-start">
              <span style="font-size:26px;flex-shrink:0;line-height:1">${d.icon}</span>
              <div>
                <div style="font-weight:700;font-size:15px;margin-bottom:4px">${d.name}</div>
                <div style="color:var(--text-secondary);font-size:13px;line-height:1.55">${d.desc}</div>
              </div>
            </div>
          </div>
        </div>`;
    });

    html += `</div>`;
    document.getElementById('tab-location').innerHTML = html;
  }

  /* ─── HOTEL (legacy, kept for reference) ──── */
  function renderHotel() {
    const h  = getHotel();
    const ev = getEvent();
    const stars = '★'.repeat(h.stars || 5);

    const amenityCards = (h.amenities || []).map(a => `
      <div class="hotel-amenity">
        <div class="hotel-amenity-icon">${a.icon}</div>
        <div class="hotel-amenity-title">${a.title}</div>
        <div class="hotel-amenity-note">${a.note}</div>
      </div>`).join('');

    const tipRows = (h.tips || []).map(t =>
      `<div class="hotel-tip-row">💡 ${t}</div>`).join('');

    document.getElementById('tab-hotel').innerHTML = `
      <img class="hotel-photo" src="${h.image}" alt="${h.name}" loading="lazy">
      <div class="section-pad">
        <div class="hotel-name-block">
          <div class="hotel-stars">${stars}</div>
          <h2 class="hotel-name">${h.name}</h2>
        </div>
        <div class="hotel-quickgrid">
          <div class="hotel-quickitem">
            <div class="hotel-quick-label">Заезд</div>
            <div class="hotel-quick-val">${h.checkin}</div>
          </div>
          <div class="hotel-quickitem">
            <div class="hotel-quick-label">Выезд</div>
            <div class="hotel-quick-val">${h.checkout}</div>
          </div>
          <div class="hotel-quickitem">
            <div class="hotel-quick-label">Wi-Fi</div>
            <div class="hotel-quick-val" style="font-size:12px">${ev.wifi.network}</div>
          </div>
          <div class="hotel-quickitem" onclick="window.location='tel:${h.phone}'" style="cursor:pointer">
            <div class="hotel-quick-label">Телефон</div>
            <div class="hotel-quick-val" style="font-size:12px;color:var(--accent)">${h.phone}</div>
          </div>
        </div>
        <p class="hotel-desc">${h.desc}</p>
        ${h.breakfast ? `<div class="hotel-breakfast">☕ <strong>Завтрак:</strong> ${h.breakfast}</div>` : ''}
        <div class="section-title" style="margin-bottom:12px">Удобства</div>
        <div class="hotel-amenities-grid">${amenityCards}</div>
        ${tipRows ? `<div class="section-title" style="margin-top:24px;margin-bottom:12px">Советы</div><div class="hotel-tips">${tipRows}</div>` : ''}
        ${h.address ? `<div class="section-title" style="margin-top:24px;margin-bottom:12px">Адрес</div><div class="hotel-tips"><div class="hotel-tip-row">📍 ${h.address}</div></div>` : ''}
      </div>`;
  }

  /* ─── NEARBY ─────────────────────────── */
  function renderNearby() {
    let html = `<div class="section-pad"><div class="section-title">Рядом с отелем</div>`;
    NEARBY.forEach(p => {
      html += `
        <div class="card" style="margin-bottom:12px">
          <div class="card-body">
            <div class="nearby-header">
              <span class="nearby-icon">${p.icon}</span>
              <div class="nearby-info">
                <div class="nearby-title">${p.title}</div>
                <div class="nearby-meta">${p.distance ? `📍 ${p.distance}` : ''}${p.hours ? ` · 🕐 ${p.hours}` : ''}</div>
              </div>
            </div>
            ${p.desc ? `<p class="nearby-desc">${p.desc}</p>` : ''}
            ${p.tip  ? `<div class="hotel-tip-row">💡 ${p.tip}</div>` : ''}
          </div>
        </div>`;
    });
    html += `</div>`;
    document.getElementById('tab-nearby').innerHTML = html;
  }

  /* ─── EXCURSION ──────────────────────── */
  function renderExcursion() {
    const ex = EXCURSION;

    let html = `
      <div class="today-hero" style="background:linear-gradient(135deg,#064e3b 0%,#059669 50%,#34d399 100%)">
        <div class="today-eyebrow">GCC 2026 · ${ex.date}</div>
        <div class="today-name">${ex.title}</div>
        <div class="today-theme">${ex.duration} · Сбор в ${ex.meetingTime}</div>
      </div>
      <div class="section-pad">
    `;

    html += `<p class="hotel-desc" style="margin-top:0">${ex.desc}</p>`;

    // — Программа
    html += `<div class="section-title" style="margin-bottom:12px">Программа</div>`;
    html += `<div class="card"><div class="card-body">`;
    ex.program.forEach(p => {
      html += `
        <div class="mini-timeline-item">
          <span class="mini-time">${p.time}</span>
          <span class="mini-dot" style="background:#059669"></span>
          <div class="mini-info">
            <div class="mini-title">${p.title}</div>
            ${p.note ? `<div class="mini-loc">${p.note}</div>` : ''}
          </div>
        </div>`;
    });
    html += `</div></div>`;

    // — Это интересно
    if (ex.funFacts?.length) {
      html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">Это интересно</div>`;
      ex.funFacts.forEach(f => {
        html += `
          <div class="card" style="margin-bottom:10px">
            <div class="card-body">
              <div style="display:flex;gap:12px;align-items:flex-start">
                <span style="font-size:26px;flex-shrink:0;line-height:1">${f.icon}</span>
                <div>
                  <div style="font-weight:700;font-size:15px;margin-bottom:4px">${f.title}</div>
                  <div style="color:var(--text-secondary);font-size:13px;line-height:1.55">${f.text}</div>
                </div>
              </div>
            </div>
          </div>`;
      });
    }

    // — Практические советы
    html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">Что взять / помнить</div>`;
    html += `<div class="hotel-tips">${ex.tips.map(t => `<div class="hotel-tip-row">💡 ${t}</div>`).join('')}</div>`;

    // — Фотоспоты
    html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">Где фотографировать</div>`;
    ex.photoSpots.forEach(s => {
      html += `
        <div class="card" style="margin-bottom:10px">
          <div class="card-body">
            <div style="display:flex;gap:10px;align-items:flex-start">
              <span style="font-size:22px">${s.icon}</span>
              <div>
                <div style="font-weight:600;font-size:15px;margin-bottom:2px">${s.title}</div>
                <div style="color:var(--text-secondary);font-size:13px">${s.desc}</div>
              </div>
            </div>
          </div>
        </div>`;
    });

    // — Галерея
    if (ex.images?.length) {
      html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">Фото</div>`;
      html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">`;
      ex.images.forEach(img => {
        const src   = typeof img === 'string' ? img : img.src;
        const caption = typeof img === 'object' && img.caption ? img.caption : '';
        html += `
          <div style="border-radius:12px;overflow:hidden;background:#f3f4f6">
            <img src="${src}" alt="${caption}" style="width:100%;height:140px;object-fit:cover;display:block">
            ${caption ? `<div style="padding:6px 8px;font-size:12px;color:var(--text-secondary)">${caption}</div>` : ''}
          </div>`;
      });
      html += `</div>`;
    }

    // — История
    html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">Немного истории</div>`;
    ex.history.forEach(h => {
      html += `
        <div class="card" style="margin-bottom:12px">
          <div class="card-body">
            <div style="display:flex;gap:10px;align-items:flex-start">
              <span style="font-size:26px;flex-shrink:0">${h.icon}</span>
              <div>
                <div style="font-weight:700;font-size:15px;margin-bottom:6px">${h.title}</div>
                <div style="color:var(--text-secondary);font-size:14px;line-height:1.5">${h.text}</div>
              </div>
            </div>
          </div>
        </div>`;
    });

    html += `</div>`;
    document.getElementById('tab-excursion').innerHTML = html;
  }

  /* ─── EXHIBITORS ─────────────────────── */
  function renderExhibitors() {
    const list = getExhibitors();

    let html = `<div class="section-pad">`;
    html += `<div class="section-title" style="margin-bottom:12px">Экспоненты GCC 2026</div>`;

    if (!list.length) {
      html += `<div class="empty-state">Список экспонентов появится здесь</div>`;
    } else {
      list.forEach(e => {
        const btns = [];
        if (e.telegram) btns.push(`<a href="${e.telegram}" class="contact-btn tg-btn" target="_blank">✈️ Telegram</a>`);
        if (e.whatsapp) btns.push(`<a href="https://wa.me/${e.whatsapp.replace(/\D/g,'')}" class="contact-btn wa-btn" target="_blank">💬 WhatsApp</a>`);
        if (e.phone)    btns.push(`<a href="tel:${e.phone}" class="contact-btn ph-btn">📞 Звонок</a>`);

        html += `
          <div class="card" style="margin-bottom:12px">
            <div class="card-body">
              <div class="exhibitor-header">
                <div class="exhibitor-logo">${e.logoEmoji || '🏢'}</div>
                <div class="exhibitor-main">
                  <div class="exhibitor-name">${e.company}</div>
                  ${e.contact ? `<div class="exhibitor-contact" style="margin-top:2px">👤 ${e.contact}${e.position ? ` · ${e.position}` : ''}</div>` : ''}
                </div>
              </div>
              ${e.desc ? `<p class="exhibitor-desc">${e.desc}</p>` : ''}
              ${btns.length ? `<div class="exhibitor-btns">${btns.join('')}</div>` : ''}
            </div>
          </div>`;
      });
    }

    html += `</div>`;
    document.getElementById('tab-exhibitors').innerHTML = html;
  }

  function filterExhibitors() {
    renderExhibitors();
  }

  /* ─── TRANSFER ───────────────────────── */
  function renderTransfer() {
    let html = `<div class="section-pad">`;

    if (TRANSFERS.info) {
      html += `<div class="announcement-bar ann-info" style="margin-bottom:16px;display:block">ℹ️ ${TRANSFERS.info}</div>`;
    }

    const renderGroup = (groups) => groups.map(g => `
      <div class="card" style="margin-bottom:12px">
        <div class="card-body">
          <div style="font-weight:700;font-size:15px;margin-bottom:12px;color:${g.color}">${g.label}</div>
          ${g.items.map(item => `
            <div class="mini-timeline-item">
              <span class="mini-time">${item.time}</span>
              <span class="mini-dot" style="background:${g.color}"></span>
              <div class="mini-info">
                <div class="mini-title">${item.title}</div>
                ${item.note ? `<div class="mini-loc">${item.note}</div>` : ''}
              </div>
            </div>`).join('')}
        </div>
      </div>`).join('');

    html += `<div class="section-title">Заезд</div>` + renderGroup(TRANSFERS.arrival);
    html += `<div class="section-title" style="margin-top:20px">Отъезд</div>` + renderGroup(TRANSFERS.departure);

    if (TRANSFERS.contacts?.length) {
      html += `<div class="section-title" style="margin-top:20px;margin-bottom:12px">Контакт по трансферу</div>`;
      TRANSFERS.contacts.forEach(c => {
        const tgLink = c.telegram ? `<a href="${c.telegram}" class="contact-btn tg-btn" target="_blank">✈️ Telegram</a>` : '';
        const phLink = c.phone    ? `<a href="tel:${c.phone}" class="contact-btn ph-btn">📞 Звонок</a>` : '';
        html += `
          <div class="card"><div class="card-body">
            <div style="font-weight:600;margin-bottom:2px">${c.name}</div>
            <div style="color:var(--text-secondary);font-size:14px;margin-bottom:10px">${c.role}</div>
            <div style="display:flex;gap:8px">${tgLink}${phLink}</div>
          </div></div>`;
      });
    }

    html += `</div>`;
    document.getElementById('tab-transfer').innerHTML = html;
  }

  /* ─── FAQ ─────────────────────────────── */
  function openFAQ() {
    renderFAQ(FAQ);
    document.getElementById('modal-faq').classList.add('open');
    setTimeout(() => document.getElementById('faq-search').focus(), 300);
    haptic('light');
  }

  function closeFAQ() {
    document.getElementById('modal-faq').classList.remove('open');
    document.getElementById('faq-search').value = '';
  }

  function searchFAQ(query) {
    const q = query.toLowerCase().trim();
    renderFAQ(q ? FAQ.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)) : FAQ);
  }

  function renderFAQ(items) {
    const list = document.getElementById('faq-list');
    if (!items.length) {
      list.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-hint)">Ничего не найдено</div>`;
      return;
    }
    list.innerHTML = items.map((f, i) => `
      <div class="faq-item" id="faq-${i}" onclick="App.toggleFAQ(${i})">
        <div class="faq-q"><span>${f.q}</span><span class="faq-chevron">›</span></div>
        <div class="faq-a">${f.a}</div>
      </div>`).join('');
  }

  function toggleFAQ(i) {
    document.getElementById('faq-' + i)?.classList.toggle('open');
  }

  /* ─── HELP FAB ────────────────────────── */
  function callHelp() {
    haptic('heavy');
    const ev = getEvent();
    if (ev.organizer?.telegram) window.open(ev.organizer.telegram, '_blank');
    else if (ev.emergency)      window.location.href = 'tel:' + ev.emergency;
  }

  /* ─── PUBLIC ──────────────────────────── */
  return {
    init, switchTab, selectProgramDay, copyWifi,
    openFAQ, closeFAQ, searchFAQ, toggleFAQ,
    filterExhibitors, renderExhibitors,
    renderExcursion,
    callHelp,
  };

})();

document.addEventListener('DOMContentLoaded', App.init);

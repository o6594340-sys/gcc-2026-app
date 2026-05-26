/* ═══════════════════════════════════════════
   Global Corporate Club 2026
   GreenCode International · App Logic
═══════════════════════════════════════════ */

/* ─── SUPABASE CONFIG ─────────────────────
   Замените на ваши значения из supabase.com → Settings → API
──────────────────────────────────────────── */
const SUPABASE_URL = 'https://jhtdcddqjuaqdksdrdhy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9ameNQDhrCsZNwuGpUwkOw_ElbnfwaX';

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

  /* ─── LANGUAGE ──────────────────────────── */
  function getLang() { return localStorage.getItem('gcc_lang') || 'ru'; }
  function T(ru, en) { return getLang() === 'en' ? en : ru; }

  function trDay(dayIdx) {
    const day = getDays()[dayIdx];
    if (getLang() !== 'en') return day;
    const tr = (TRANSLATIONS.en.days || [])[dayIdx] || {};
    return {
      ...day,
      theme: tr.theme || day.theme,
      date:  tr.date  || day.date,
      label: tr.label || day.label,
      weather: day.weather ? { ...day.weather, note: tr.weather_note || day.weather.note } : day.weather,
      activities: day.activities.map((a, i) => {
        const ta = (tr.activities || [])[i] || {};
        return {
          ...a,
          title:    ta.title    || a.title,
          location: ta.location || a.location,
          note: ta.hasOwnProperty('note') ? ta.note : a.note,
        };
      }),
    };
  }

  function trTip(tip) {
    if (getLang() !== 'en') return tip;
    const tr = (TRANSLATIONS.en.practical || [])[tip._idx] || {};
    return { ...tip, title: tr.title || tip.title, text: tr.text || tip.text };
  }

  function toggleLang() {
    localStorage.setItem('gcc_lang', getLang() === 'ru' ? 'en' : 'ru');
    updateLangUI();
    const renderers = { today: renderToday, program: renderProgram, location: renderLocation,
                        excursion: renderExcursion, exhibitors: renderExhibitors };
    if (renderers[state.tab]) renderers[state.tab]();
  }

  function updateLangUI() {
    const isEn = getLang() === 'en';
    const btn = document.getElementById('lang-btn');
    if (btn) btn.textContent = isEn ? 'RU' : 'EN';
    const subEl = document.getElementById('header-sub');
    if (subEl) subEl.textContent = isEn ? 'June 2–5 · North Cyprus' : '2–5 июня · Северный Кипр';
    document.querySelectorAll('.tab-label[data-en]').forEach(el => {
      el.textContent = isEn ? el.dataset.en : el.dataset.ru;
    });
  }

  /* ─── BRANDING ───────────────────────── */
  function applyBranding() {
    const ev    = getEvent();
    const brand = ev.brand || {};
    const color = brand.color || '#8A4FFF';

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
    root.style.setProperty('--header-bg', '#0D0818');
    root.style.setProperty('--now-bg',    'linear-gradient(135deg, #0D0818 0%, #1A0D35 100%)');
    root.style.setProperty('--now-shadow', '0 4px 20px rgba(138,79,255,0.25)');
  }

  /* ─── INIT ────────────────────────────── */
  function ensureLangBtn() {
    if (document.getElementById('lang-btn')) return;
    const faq = document.querySelector('.faq-trigger');
    if (!faq) return;
    const btn = document.createElement('button');
    btn.id = 'lang-btn';
    btn.className = 'lang-toggle';
    btn.setAttribute('aria-label', 'Switch language');
    btn.onclick = toggleLang;
    btn.textContent = 'EN';
    const wrapper = faq.parentElement;
    if (wrapper && wrapper !== document.querySelector('.app-header')) {
      wrapper.insertBefore(btn, faq);
    } else {
      faq.insertAdjacentElement('beforebegin', btn);
    }
  }

  function init() {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.BackButton?.hide();
      setTimeout(() => { tg.expand(); tg.requestFullscreen?.(); }, 300);
    }
    applyBranding();
    applyGradient();
    ensureLangBtn();
    updateLangUI();
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
      chat:       renderChat,
    };
    if (renderers[tab]) renderers[tab]();
  }

  /* ─── TODAY ───────────────────────────── */
  function renderToday() {
    const day  = trDay(TODAY_INDEX);
    const now  = day.activities.find(a => a.isNow);
    const next = day.activities.find(a => a.isNext);
    const short = day.date.replace(/,.*$/, '');

    const greeting = tgUser?.first_name
      ? `${T('Добро пожаловать', 'Welcome')}, ${tgUser.first_name}`
      : T('Добро пожаловать', 'Welcome');

    let html = `
      <div class="today-hero" style="background:linear-gradient(160deg,#050408 0%,#0D0818 55%,${day.color} 100%)">
        <div class="today-eyebrow">GCC 2026 · ${short}</div>
        <div class="today-name">${greeting}</div>
        <div class="today-theme">${day.theme}</div>
        ${day.pillar ? `<div class="today-pillar">✦ ${day.pillar}</div>` : ''}
        <div class="today-weather-row">
          ${day.weather ? `<span class="today-weather">${day.weather.icon} ${day.weather.temp} · ${day.weather.note}</span>` : ''}
          <span class="today-live"><span class="live-dot"></span> ${T('Программа актуальна', 'Schedule is live')}</span>
        </div>
      </div>
      <div class="section-pad">
    `;

    if (now) html += `
      <div class="now-block">
        <div class="now-label">● ${T('СЕЙЧАС', 'NOW')}</div>
        <div class="now-title">${now.title}</div>
        <div class="now-meta">${now.location ? `📍 ${now.location} · ` : ''}${now.time}</div>
        ${now.note ? `<div class="now-note">${now.note}</div>` : ''}
      </div>`;

    if (next) html += `
      <div class="next-block">
        <div class="next-label">${T('Следующее', 'Up Next')}</div>
        <div class="next-title">${next.title}</div>
        <div class="next-meta">${next.location ? `📍 ${next.location} · ` : ''}${next.time}</div>
      </div>`;

    const ev = getEvent();
    html += `
      <div class="wifi-row" onclick="App.copyWifi()">
        <span class="wifi-label">Wi-Fi:</span>
        <span class="wifi-net">${ev.wifi.network}</span>
        <span class="wifi-sep">·</span>
        <span class="wifi-label">${T('Пароль:', 'Password:')}</span>
        <span class="wifi-pass">${ev.wifi.password}</span>
        <span class="wifi-copy" id="wifi-copied">${T('Скопировано ✓', 'Copied ✓')}</span>
      </div>
    `;

    const ex = EXCURSION;
    const todayId = day.id;
    const nowHourMin = new Date().getHours() * 60 + new Date().getMinutes();
    const excursionCutoff = 14 * 60 + 30;
    const showExcursionBanner = ex.formUrl &&
      (todayId === 1 || (todayId === 2 && nowHourMin < excursionCutoff));
    if (showExcursionBanner) {
      html += `
        <div class="excursion-banner" onclick="App.openLink('${ex.formUrl}');haptic('medium')">
          <div class="excursion-banner-left">
            <div class="excursion-banner-title">🏛 ${T('Экскурсия · 3 июня', 'Excursion · June 3')}</div>
            <div class="excursion-banner-sub">${T('Кирения · сбор в лобби в 14:30', 'Kyrenia · lobby meetup at 14:30')}</div>
          </div>
          <div class="excursion-banner-btn">${T('Записаться →', 'Book →')}</div>
        </div>`;
    }

    html += `<div class="section-title" style="margin-top:24px">${T('Программа дня', "Today's Schedule")}</div>`;
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
    const nowMins = hour * 60 + new Date().getMinutes();
    const parseUntil = u => { if (!u) return Infinity; const [h,m] = u.split(':').map(Number); return h*60+m; };
    const currentDayId = getDays()[TODAY_INDEX].id;
    const withIdx = PRACTICAL.map((p, i) => ({ ...p, _idx: i }));
    const candidates = withIdx.filter(p =>
      (p.days === null || !p.days || p.days.includes(currentDayId)) &&
      (p.time === timeSlot || p.time === 'any') &&
      nowMins < parseUntil(p.until)
    );
    const pool = candidates.length ? candidates : withIdx.filter(p => (p.days === null || !p.days) && nowMins < parseUntil(p.until));
    const tip = trTip(pool[Math.floor(Math.random() * pool.length)]);
    html += `
      <div class="tip-card">
        <div class="tip-icon">${tip.icon}</div>
        <div>
          <div class="tip-title">${T('Совет:', 'Tip:')} ${tip.title}</div>
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
    const day = trDay(state.programDay);

    let tabs = '<div class="day-tabs">';
    getDays().forEach((d, i) => {
      const td  = trDay(i);
      const act = i === state.programDay ? 'active' : '';
      tabs += `<button class="day-tab ${act}"
        style="${act ? `background:${d.color};color:white` : ''}"
        onclick="App.selectProgramDay(${i})">${td.label}</button>`;
    });
    tabs += '</div>';

    const wBlock = day.weather
      ? `<span class="program-weather">${day.weather.icon} ${day.weather.temp}</span>`
      : '';
    const pillarBlock = day.pillar
      ? `<div class="program-pillar">✦ ${day.pillar}</div>`
      : '';
    let items = `<div class="program-meta">${day.date} · ${day.theme}${wBlock ? ' ' + wBlock : ''}</div>${pillarBlock}`;
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
          ${active ? `<span class="now-badge" style="background:${day.color}22;color:${day.color}">${T('Сейчас', 'Now')}</span>` : ''}
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
    const loc = getLang() === 'en' ? (TRANSLATIONS.en.location || {}) : {};

    const hDesc      = loc.hotel?.desc || h.desc;
    const hAmenities = h.amenities.map((a, i) => ({ ...a, ...((loc.hotel?.amenities || [])[i] || {}) }));
    const hTips      = loc.hotel?.tips || h.tips;
    const trInfo     = loc.transfers?.info || TRANSFERS.info;
    const trArrival  = TRANSFERS.arrival.map((g, i) => {
      const tg = (loc.transfers?.arrival || [])[i] || {};
      return { ...g, label: tg.label || g.label, items: g.items.map((it, j) => ({ ...it, ...((tg.items||[])[j]||{}) })) };
    });
    const trDep = TRANSFERS.departure.map((g, i) => {
      const tg = (loc.transfers?.departure || [])[i] || {};
      return { ...g, label: tg.label || g.label, items: g.items.map((it, j) => ({ ...it, ...((tg.items||[])[j]||{}) })) };
    });
    const trNearby  = NEARBY.map((p, i) => ({ ...p, ...((loc.nearby || [])[i] || {}) }));
    const trCuisine = {
      intro:  loc.cuisine?.intro || CUISINE.intro,
      dishes: CUISINE.dishes.map((d, i) => ({ ...d, ...((loc.cuisine?.dishes || [])[i] || {}) })),
    };

    const amenityCards = hAmenities.map(a => `
      <div class="hotel-amenity">
        <div class="hotel-amenity-icon">${a.icon}</div>
        <div class="hotel-amenity-title">${a.title}</div>
        <div class="hotel-amenity-note">${a.note}</div>
      </div>`).join('');

    let html = '';
    if (h.image) html += `<img class="hotel-photo" src="${h.image}" alt="${h.name}" loading="lazy">`;
    html += `<div class="section-pad">`;

    html += `
      <div class="hotel-name-block">
        <div class="hotel-stars">${stars}</div>
        <h2 class="hotel-name">${h.name}</h2>
      </div>
      <div class="hotel-quickgrid">
        <div class="hotel-quickitem">
          <div class="hotel-quick-label">${T('Заезд', 'Check-in')}</div>
          <div class="hotel-quick-val">${h.checkin}</div>
        </div>
        <div class="hotel-quickitem">
          <div class="hotel-quick-label">${T('Выезд', 'Check-out')}</div>
          <div class="hotel-quick-val">${h.checkout}</div>
        </div>
        <div class="hotel-quickitem">
          <div class="hotel-quick-label">Wi-Fi</div>
          <div class="hotel-quick-val" style="font-size:12px">${ev.wifi.network}<br><span style="font-size:11px;opacity:0.65">${ev.wifi.password}</span></div>
        </div>
        <div class="hotel-quickitem" onclick="window.location='tel:${h.phone}'" style="cursor:pointer">
          <div class="hotel-quick-label">${T('Телефон', 'Phone')}</div>
          <div class="hotel-quick-val" style="font-size:12px;color:var(--accent)">${h.phone}</div>
        </div>
      </div>
      ${hDesc ? `<p class="hotel-desc">${hDesc}</p>` : ''}
      ${h.breakfast ? `<div class="hotel-breakfast">☕ <strong>${T('Завтрак:', 'Breakfast:')}</strong> ${h.breakfast}</div>` : ''}
    `;

    if (hAmenities.length) {
      html += `<div class="section-title" style="margin-bottom:12px">${T('Удобства', 'Facilities')}</div>
               <div class="hotel-amenities-grid">${amenityCards}</div>`;
    }

    if (hTips?.length) {
      html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">${T('Советы об отеле', 'Hotel Tips')}</div>
               <div class="hotel-tips">${hTips.map(t => `<div class="hotel-tip-row">💡 ${t}</div>`).join('')}</div>`;
    }

    if (h.address) {
      html += `<div class="hotel-tips" style="margin-top:8px"><div class="hotel-tip-row">📍 ${h.address}</div></div>`;
    }

    html += `<div class="section-title" style="margin-top:28px;margin-bottom:12px">${T('Трансферы', 'Transfers')}</div>`;
    if (trInfo) {
      html += `<div class="announcement-bar ann-info" style="margin-bottom:12px;display:block">ℹ️ ${trInfo}</div>`;
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

    html += `<div style="font-weight:600;font-size:13px;color:var(--text-secondary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">${T('Заезд', 'Arrival')}</div>`;
    html += renderGroup(trArrival);
    html += `<div style="font-weight:600;font-size:13px;color:var(--text-secondary);margin-top:16px;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">${T('Отъезд', 'Departure')}</div>`;
    html += renderGroup(trDep);

    if (TRANSFERS.contacts?.length) {
      html += `<div class="section-title" style="margin-top:20px;margin-bottom:12px">${T('Контакт по трансферу', 'Transfer Coordinator')}</div>`;
      TRANSFERS.contacts.forEach(c => {
        const tgLink = c.telegram ? `<a href="${c.telegram}" class="contact-btn tg-btn" target="_blank">✈️ Telegram</a>` : '';
        const phLink = c.phone    ? `<a href="tel:${c.phone}" class="contact-btn ph-btn">📞 ${T('Звонок', 'Call')}</a>` : '';
        html += `
          <div class="card"><div class="card-body">
            <div style="font-weight:600;margin-bottom:2px">${c.name}</div>
            <div style="color:var(--text-secondary);font-size:14px;margin-bottom:10px">${c.role}</div>
            <div style="display:flex;gap:8px">${tgLink}${phLink}</div>
          </div></div>`;
      });
    }

    html += `<div class="section-title" style="margin-top:28px;margin-bottom:12px">${T('Рядом с отелем', 'Near the Hotel')}</div>`;
    trNearby.forEach(p => {
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

    html += `<div class="section-title" style="margin-top:28px;margin-bottom:8px">${T('Кипрская кухня', 'Cypriot Cuisine')}</div>`;
    html += `<p class="hotel-desc" style="margin-top:0;margin-bottom:12px">${trCuisine.intro}</p>`;
    trCuisine.dishes.forEach(d => {
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
    const raw  = EXCURSION;
    const exTr = getLang() === 'en' ? (TRANSLATIONS.en.excursion || {}) : {};
    const ex = {
      ...raw,
      title:      exTr.title      || raw.title,
      date:       exTr.date       || raw.date,
      duration:   exTr.duration   || raw.duration,
      desc:       exTr.desc       || raw.desc,
      program:    raw.program.map((p, i)    => ({ ...p,   ...((exTr.program    || [])[i] || {}) })),
      funFacts:   raw.funFacts.map((f, i)   => ({ ...f,   ...((exTr.funFacts   || [])[i] || {}) })),
      photoSpots: raw.photoSpots.map((s, i) => ({ ...s,   ...((exTr.photoSpots || [])[i] || {}) })),
      history:    raw.history.map((h, i)    => ({ ...h,   ...((exTr.history    || [])[i] || {}) })),
      images:     raw.images.map((img, i)   => {
        const cap = (exTr.imageCaptions || [])[i];
        return cap ? { ...img, caption: cap } : img;
      }),
    };

    let html = `
      <div class="today-hero" style="background:linear-gradient(160deg,#050408 0%,#0D0818 55%,#6E00FF 100%)">
        <div class="today-eyebrow">GCC 2026 · ${ex.date}</div>
        <div class="today-name">${ex.title}</div>
        <div class="today-theme">${ex.duration} · ${T('Сбор в', 'Meet at')} ${raw.meetingTime}</div>
      </div>
      <div class="section-pad">
    `;

    html += `<p class="hotel-desc" style="margin-top:0">${ex.desc}</p>`;

    if (ex.formUrl) {
      html += `
        <button class="excursion-signup-btn" onclick="App.openLink('${ex.formUrl}');haptic('medium')">
          ${T('Записаться на экскурсию →', 'Book the excursion →')}
        </button>`;
    }

    html += `<div class="section-title" style="margin-bottom:12px">${T('Программа', 'Itinerary')}</div>`;
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

    if (ex.funFacts?.length) {
      html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">${T('Это интересно', 'Did You Know')}</div>`;
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

    html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">${T('Где фотографировать', 'Photo Spots')}</div>`;
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

    if (ex.images?.length) {
      html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">${T('Фото', 'Gallery')}</div>`;
      html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">`;
      ex.images.forEach(img => {
        const src     = typeof img === 'string' ? img : img.src;
        const caption = typeof img === 'object' && img.caption ? img.caption : '';
        html += `
          <div style="border-radius:12px;overflow:hidden">
            <img src="${src}" alt="${caption}" style="width:100%;height:140px;object-fit:cover;display:block">
            ${caption ? `<div style="padding:6px 8px;font-size:12px;color:var(--text-secondary)">${caption}</div>` : ''}
          </div>`;
      });
      html += `</div>`;
    }

    html += `<div class="section-title" style="margin-top:24px;margin-bottom:12px">${T('Немного истории', 'History')}</div>`;
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

  /* ─── CHAT ───────────────────────────── */
  const ADMIN_IDS = ['1220760254'];

  function isAdmin() {
    if (new URLSearchParams(location.search).get('admin') === 'gcc2026') {
      localStorage.setItem('gcc_is_admin', '1');
    }
    const me = getChatUser();
    if (ADMIN_IDS.includes(me.id)) {
      localStorage.setItem('gcc_is_admin', '1');
      return true;
    }
    return localStorage.getItem('gcc_is_admin') === '1';
  }

  let _sb       = null;
  let _chatSub  = null;
  let _pollSub  = null;
  let _replyTo  = null;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function getSupabase() {
    if (!_sb && typeof supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
      _sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    return _sb;
  }

  function getChatUser() {
    let uid  = localStorage.getItem('gcc_chat_uid');
    let name = localStorage.getItem('gcc_chat_name');
    if (!uid) { uid = Math.random().toString(36).slice(2); localStorage.setItem('gcc_chat_uid', uid); }

    if (tgUser?.first_name) {
      const tgName = tgUser.first_name + (tgUser.last_name ? ' ' + tgUser.last_name : '');
      if (!name) { localStorage.setItem('gcc_chat_name', tgName); name = tgName; }
      return { id: String(tgUser.id), name };
    }
    return { id: 'anon_' + uid, name: name || '' };
  }

  function hasChatName() {
    return !!(tgUser?.first_name || localStorage.getItem('gcc_chat_name'));
  }

  function buildMsgHTML(msg, isOwn) {
    const time = new Date(msg.created_at).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
    const quoteBlock = msg.reply_to_text
      ? `<div class="chat-msg-quote">
          <div class="chat-msg-quote-name">${escapeHtml(msg.reply_to_name || '')}</div>
          <div class="chat-msg-quote-text">${escapeHtml(msg.reply_to_text || '')}</div>
         </div>`
      : '';
    const safeText = escapeHtml((msg.text || '').slice(0, 60).replace(/\n/g, ' '));
    const safeName = escapeHtml(msg.user_name);
    const deleteBtn = (isAdmin() && msg.id)
      ? `<button class="chat-msg-delete-btn" onclick="App.deleteMessage(${msg.id})" aria-label="Удалить">✕</button>`
      : '';
    return `<div class="chat-msg ${isOwn ? 'own' : 'other'}" data-msg-id="${msg.id || ''}">
      ${deleteBtn}
      <div class="chat-msg-name">${safeName}</div>
      ${quoteBlock}${escapeHtml(msg.text)}
      <div class="chat-msg-footer">
        <button class="chat-msg-reply-btn"
          data-reply-id="${msg.id || ''}"
          data-reply-name="${safeName}"
          data-reply-text="${safeText}"
          onclick="App.setReplyToBtn(this)">↩</button>
        <span class="chat-msg-time">${time}</span>
      </div>
    </div>`;
  }

  function scrollChatToBottom() {
    const el = document.getElementById('chat-messages');
    if (el) el.scrollTop = el.scrollHeight;
  }

  function renderChat() {
    const el = document.getElementById('tab-chat');
    if (!hasChatName()) {
      el.innerHTML = `
        <div class="chat-name-screen">
          <div class="chat-name-title">Как вас представить?</div>
          <div class="chat-name-sub">Имя будет видно другим участникам</div>
          <input class="chat-name-input" id="chat-name-input" type="text"
            placeholder="Имя и фамилия"
            maxlength="40"
            onkeydown="if(event.key==='Enter')App.saveChatName()">
          <button class="chat-name-btn" onclick="App.saveChatName()">Войти в чат</button>
        </div>`;
      setTimeout(() => document.getElementById('chat-name-input')?.focus(), 100);
      return;
    }
    el.innerHTML = `
      <div id="chat-polls"></div>
      <div class="chat-messages" id="chat-messages">
        <div class="chat-loading">Загрузка сообщений...</div>
      </div>
      <div class="chat-reply-bar hidden" id="chat-reply-bar">
        <div class="chat-reply-content">
          <span style="color:var(--accent);font-size:15px;flex-shrink:0">↩</span>
          <div style="flex:1;min-width:0">
            <div class="chat-reply-bar-name" id="chat-reply-bar-name"></div>
            <div class="chat-reply-bar-text" id="chat-reply-bar-text"></div>
          </div>
          <button class="chat-reply-cancel" onclick="App.cancelReply()">✕</button>
        </div>
      </div>
      <div class="chat-input-bar">
        <textarea class="chat-input" id="chat-input" rows="1"
          placeholder="Написать сообщение..."
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();App.sendChatMessage()}"
          oninput="App.resizeChatInput(this)"></textarea>
        ${isAdmin() ? `<button class="chat-poll-btn" onclick="App.openPollCreator()" title="Создать опрос">🗳</button>` : ''}
        <button class="chat-send-btn" onclick="App.sendChatMessage()" aria-label="Отправить">➤</button>
      </div>
      <div class="poll-modal-overlay hidden" id="poll-modal">
        <div class="poll-modal-sheet">
          <div class="poll-modal-title">Создать опрос</div>
          <input class="poll-modal-input" id="poll-question" placeholder="Вопрос..." maxlength="140">
          <input class="poll-modal-input" id="poll-opt-0" placeholder="Вариант 1" maxlength="80">
          <input class="poll-modal-input" id="poll-opt-1" placeholder="Вариант 2" maxlength="80">
          <input class="poll-modal-input" id="poll-opt-2" placeholder="Вариант 3 (необязательно)" maxlength="80">
          <input class="poll-modal-input" id="poll-opt-3" placeholder="Вариант 4 (необязательно)" maxlength="80">
          <div class="poll-modal-actions">
            <button class="poll-modal-cancel" onclick="App.closePollCreator()">Отмена</button>
            <button class="poll-modal-submit" onclick="App.submitPoll()">Опубликовать</button>
          </div>
        </div>
      </div>`;
    loadChatMessages();
    subscribeToChatMessages();
    loadPolls();
    subscribeToPollUpdates();
  }

  function saveChatName() {
    const input = document.getElementById('chat-name-input');
    const name  = input?.value.trim();
    if (!name) { input?.classList.add('shake'); setTimeout(() => input?.classList.remove('shake'), 400); return; }
    localStorage.setItem('gcc_chat_name', name);
    haptic('light');
    renderChat();
  }

  async function loadChatMessages() {
    const sb = getSupabase();
    const listEl = document.getElementById('chat-messages');
    if (!listEl) return;

    if (!sb) {
      listEl.innerHTML = '<div class="chat-empty">Чат не настроен.<br>Укажите Supabase URL и ключ в app.js</div>';
      return;
    }

    const { data, error } = await sb
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(200);

    if (!listEl) return;
    if (error) { listEl.innerHTML = '<div class="chat-empty">Ошибка загрузки сообщений</div>'; return; }

    const me = getChatUser();
    listEl.innerHTML = data.length
      ? data.map(m => buildMsgHTML(m, m.user_id === me.id)).join('')
      : '<div class="chat-empty">Пока нет сообщений.<br>Начните общение первыми!</div>';

    scrollChatToBottom();
  }

  function subscribeToChatMessages() {
    const sb = getSupabase();
    if (!sb) return;
    if (_chatSub) { sb.removeChannel(_chatSub); _chatSub = null; }

    _chatSub = sb.channel('gcc_chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        const me    = getChatUser();
        if (payload.new.user_id === me.id) return;
        const listEl = document.getElementById('chat-messages');
        if (!listEl) return;
        const emptyEl = listEl.querySelector('.chat-empty');
        if (emptyEl) emptyEl.remove();
        listEl.insertAdjacentHTML('beforeend', buildMsgHTML(payload.new, false));
        scrollChatToBottom();
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, payload => {
        const el = document.querySelector(`[data-msg-id="${payload.old.id}"]`);
        if (el) el.remove();
      })
      .subscribe();
  }

  async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const sb = getSupabase();
    if (!sb) return;

    const me = getChatUser();
    const reply = _replyTo ? { ..._replyTo } : null;
    cancelReply();
    input.value = '';
    resizeChatInput(input);
    haptic('light');

    const optimistic = {
      user_id: me.id, user_name: me.name, text,
      created_at: new Date().toISOString(),
      ...(reply ? { reply_to_name: reply.name, reply_to_text: reply.text } : {}),
    };

    const listEl = document.getElementById('chat-messages');
    if (listEl) {
      const emptyEl = listEl.querySelector('.chat-empty');
      if (emptyEl) emptyEl.remove();
      listEl.insertAdjacentHTML('beforeend', buildMsgHTML(optimistic, true));
      scrollChatToBottom();
    }

    await sb.from('messages').insert({
      user_id: me.id, user_name: me.name, text,
      ...(reply ? { reply_to_id: reply.id || null, reply_to_name: reply.name, reply_to_text: reply.text } : {}),
    });
  }

  function resizeChatInput(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  /* ─── DELETE MESSAGE ─────────────────── */
  async function deleteMessage(id) {
    haptic('medium');
    const el = document.querySelector(`[data-msg-id="${id}"]`);
    if (el) el.remove();
    const sb = getSupabase();
    if (sb) await sb.from('messages').delete().eq('id', id);
  }

  /* ─── REPLY ──────────────────────────── */
  function setReplyToBtn(btn) {
    haptic('light');
    _replyTo = { id: btn.dataset.replyId, name: btn.dataset.replyName, text: btn.dataset.replyText };
    const bar = document.getElementById('chat-reply-bar');
    if (bar) {
      bar.classList.remove('hidden');
      document.getElementById('chat-reply-bar-name').textContent = _replyTo.name;
      document.getElementById('chat-reply-bar-text').textContent = _replyTo.text;
    }
    document.getElementById('chat-input')?.focus();
  }

  function cancelReply() {
    _replyTo = null;
    document.getElementById('chat-reply-bar')?.classList.add('hidden');
  }

  /* ─── POLLS ──────────────────────────── */
  function openPollCreator() {
    haptic('light');
    document.getElementById('poll-modal')?.classList.remove('hidden');
  }

  function closePollCreator() {
    document.getElementById('poll-modal')?.classList.add('hidden');
    ['poll-question','poll-opt-0','poll-opt-1','poll-opt-2','poll-opt-3']
      .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  }

  async function submitPoll() {
    const q = document.getElementById('poll-question')?.value.trim();
    if (!q) return;
    const opts = [0,1,2,3]
      .map(i => document.getElementById(`poll-opt-${i}`)?.value.trim())
      .filter(Boolean);
    if (opts.length < 2) { haptic('medium'); return; }

    const sb = getSupabase();
    if (!sb) return;
    const me = getChatUser();
    await sb.from('polls').insert({ question: q, options: opts, created_by: me.id });
    haptic('medium');
    closePollCreator();
    loadPolls();
  }

  async function loadPolls() {
    const sb = getSupabase();
    const el = document.getElementById('chat-polls');
    if (!sb || !el) return;

    const me = getChatUser();
    const { data: polls } = await sb.from('polls').select('*').eq('is_active', true).order('created_at', { ascending: false });
    if (!polls?.length) { el.innerHTML = ''; return; }

    const { data: myVotes } = await sb.from('poll_votes').select('*').eq('user_id', me.id);
    const { data: allVotes } = await sb.from('poll_votes').select('*');

    el.innerHTML = polls.map(p => buildPollHTML(p, myVotes, allVotes)).join('');
  }

  function buildPollHTML(poll, myVotes, allVotes) {
    const myVote = myVotes?.find(v => v.poll_id === poll.id);
    const pollVotes = allVotes?.filter(v => v.poll_id === poll.id) || [];
    const total = pollVotes.length;
    const voted = !!myVote;

    const optionsHTML = poll.options.map((opt, i) => {
      const count = pollVotes.filter(v => v.option_index === i).length;
      const pct = total ? Math.round(count / total * 100) : 0;
      const isChosen = myVote?.option_index === i;
      return voted
        ? `<div class="poll-result ${isChosen ? 'chosen' : ''}">
            <div class="poll-result-bar" style="width:${pct}%"></div>
            <span class="poll-result-text">${escapeHtml(opt)}</span>
            <span class="poll-result-pct">${pct}%</span>
           </div>`
        : `<button class="poll-option" onclick="App.votePoll('${poll.id}',${i})">${escapeHtml(opt)}</button>`;
    }).join('');

    const adminClose = isAdmin()
      ? `<button class="poll-close-btn" onclick="App.closePoll('${poll.id}')">✕ Закрыть</button>`
      : '';

    return `<div class="poll-card">
      <div class="poll-card-header">
        <span class="poll-badge">🗳 Голосование</span>${adminClose}
      </div>
      <div class="poll-question">${escapeHtml(poll.question)}</div>
      <div class="poll-options">${optionsHTML}</div>
      ${voted ? `<div class="poll-meta">${total} ${total===1?'голос':total<5?'голоса':'голосов'}</div>` : ''}
    </div>`;
  }

  async function votePoll(pollId, optionIndex) {
    const sb = getSupabase();
    if (!sb) return;
    const me = getChatUser();
    haptic('medium');
    await sb.from('poll_votes').insert({ poll_id: pollId, option_index: optionIndex, user_id: me.id });
    loadPolls();
  }

  async function closePoll(pollId) {
    const sb = getSupabase();
    if (!sb) return;
    await sb.from('polls').update({ is_active: false }).eq('id', pollId);
    loadPolls();
  }

  function subscribeToPollUpdates() {
    const sb = getSupabase();
    if (!sb) return;
    if (_pollSub) { sb.removeChannel(_pollSub); _pollSub = null; }
    _pollSub = sb.channel('gcc_polls')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'poll_votes' }, () => loadPolls())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'polls' }, () => loadPolls())
      .subscribe();
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
                  <div class="exhibitor-name${e.website ? ' exhibitor-name-link' : ''}"${e.website ? ` onclick="App.openLink('${e.website}')"` : ''}>${e.company}${e.flag ? ' ' + e.flag : ''}${e.website ? ' <span class="exhibitor-link-icon">↗</span>' : ''}</div>
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

  function openLink(url) {
    haptic('light');
    if (window.Telegram?.WebApp?.openLink) window.Telegram.WebApp.openLink(url);
    else window.open(url, '_blank');
  }

  /* ─── PUBLIC ──────────────────────────── */
  return {
    init, switchTab, selectProgramDay, copyWifi,
    openFAQ, closeFAQ, searchFAQ, toggleFAQ,
    filterExhibitors, renderExhibitors,
    renderExcursion,
    callHelp,
    openLink,
    toggleLang,
    sendChatMessage, resizeChatInput, saveChatName,
    deleteMessage, setReplyToBtn, cancelReply,
    openPollCreator, closePollCreator, submitPoll, votePoll, closePoll,
  };

})();

document.addEventListener('DOMContentLoaded', App.init);


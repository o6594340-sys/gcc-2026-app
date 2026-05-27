// ═══════════════════════════════════════════
// Global Corporate Club 2026
// GreenCode International · Северный Кипр
// 2–5 июня 2026
// ═══════════════════════════════════════════

const EVENT = {
  title:    'Global Corporate Club 2026',
  subtitle: 'GreenCode International',
  dates:    '2–5 июня 2026',
  location: 'Северный Кипр',
  brand: {
    color:     '#8A4FFF',
    logo:      '',
    logoEmoji: '🌿',
  },
  hotel: {
    name:     'Elexus Hotel & Resort & SPA',
    address:  'Çatalköy, Kyrenia (Girne), Северный Кипр',
    phone:    '+90 392 444 0 650',
    maps:     '',
    checkin:  '14:00',
    checkout: '12:00',
  },
  wifi:      { network: 'Global Corporate Club', password: 'welcome2gcc' },
  organizer: { name: 'GreenCode International', telegram: 'https://t.me/greencode_intl' },
  emergency: '+905303850111',
};

const HOTEL = {
  name:    'Elexus Hotel & Resort & SPA',
  stars:   5,
  image:   'Elexus hotel.jpeg',
  address: 'Çatalköy, Kyrenia (Girne), Северный Кипр',
  phone:   '+90 392 444 0 650',
  checkin:  '14:00',
  checkout: '12:00',
  breakfast: '',
  desc:    'Курортный комплекс в районе Чаталкёй, в 10 км от центра Кирении. На территории — песчаный пляж с пирсом, открытые и крытый бассейны, аквапарк, СПА-центр Zoya Spa & Wellness, тренажёрный зал, казино и несколько ресторанов.',
  amenities: [
    { icon: '🍳', title: 'Завтрак',       note: 'Ресторан Reflection · шведский стол' },
    { icon: '🍽', title: 'Обед',          note: 'Ресторан Reflection' },
    { icon: '🍷', title: 'Ужин',          note: 'Ресторан Reflection' },
    { icon: '🏊', title: 'Бассейны',      note: 'Несколько открытых + крытый с подогревом' },
    { icon: '🌊', title: 'Аквапарк',      note: 'По сезонному расписанию' },
    { icon: '🏖', title: 'Пляж',          note: 'Собственный песчаный · лежаки и полотенца бесплатно' },
    { icon: '🧖', title: 'Zoya Spa',      note: 'Хаммам, сауны, процедуры — по записи, за доп. плату' },
    { icon: '💪', title: 'Тренажёрный зал', note: 'Для гостей отеля' },
    { icon: '🎰', title: 'Казино',        note: 'На территории отеля' },
    { icon: '📶', title: 'Wi-Fi',         note: 'Бесплатно на всей территории отеля' },
  ],
  tips: [
    'Завтрак в ресторане Reflection — шведский стол, включён в программу. При входе укажите, что вы в составе группы GCC 2026.',
    'Лежаки, зонты и полотенца на пляже предоставляются гостям отеля без дополнительной оплаты.',
    'Бары у бассейна, на пляже и лобби-бар работают в течение дня; часть позиций меню оплачивается отдельно.',
    'Процедуры в Zoya Spa рекомендуем бронировать заранее — запись через ресепшн или СПА-стойку.',
    'До центра Кирении — около 10–15 минут на такси. Рекомендуем заказывать через ресепшн.',
    'Сейф в номере — рекомендуем воспользоваться для хранения документов и ценных вещей.',
  ],
};

function getTodayIndex() {
  const now = new Date();
  // Use Cyprus timezone (UTC+3 in summer) — device locale does not matter
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Nicosia',
    year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', hour12: false,
  });
  const p = {};
  fmt.formatToParts(now).forEach(({ type, value }) => { p[type] = parseInt(value, 10); });
  let m = p.month - 1, d = p.day, h = p.hour % 24;
  if (h < 2) { // до 02:00 по Кипру — всё ещё предыдущий день
    const prev = new Date(now.getTime() - 86400000);
    const p2 = {};
    fmt.formatToParts(prev).forEach(({ type, value }) => { p2[type] = parseInt(value, 10); });
    m = p2.month - 1; d = p2.day;
  }
  if (m === 5 && d >= 2 && d <= 5) return d - 2; // 2→0, 3→1, 4→2, 5→3
  if (m < 5 || (m === 5 && d < 2)) return 0;     // до мероприятия — день 1
  return 3;                                        // после — день 4
}
const TODAY_INDEX = getTodayIndex();

const DAYS = [
  {
    id: 1, label: '2 июня', date: '2 июня, вторник',
    theme: 'Заезд', color: '#6E00FF', pillar: 'Power of Community',
    weather: { icon: '☀️', temp: '+29°C', note: 'ясно' },
    activities: [
      { time: '—',           title: 'Прилёт. Встреча в аэропорту Эрджан (ECN)', location: 'Аэропорт Эрджан', type: 'transfer', note: 'Согласно полётным данным · Встреча в зоне прилёта · Табличка «GCC 2026» · Координатор: Малик +90 530 385 01 11' },
      { time: '—',           title: 'Трансфер в отель', location: 'Elexus Hotel & Resort & SPA', type: 'transfer', note: 'Согласно полётным данным · ~45 мин от аэропорта' },
      { time: '14:00',       title: 'Заселение', location: 'Стойка регистрации', type: 'hotel', note: 'Получить бейдж и Welcome-kit' },
      { time: '18:00–21:30', title: 'Ужин', location: 'Ресторан Reflection', type: 'dinner', note: 'Включён в программу · Dress code: Casual' },
      { time: '22:00–02:00', title: 'After-party', location: 'The Gazino', type: 'gala', note: 'Dress code: Cocktail/Casual' },
    ],
  },
  {
    id: 2, label: '3 июня', date: '3 июня, среда',
    theme: 'Workshop & Экскурсия', color: '#C200D4', pillar: 'Power of Experience',
    weather: { icon: '☀️', temp: '+30°C', note: 'ясно' },
    activities: [
      { time: '07:00',       title: 'Завтрак', location: 'Ресторан Reflection', type: 'meal' },
      { time: '10:00–13:00', title: 'Workshop', location: 'Elexus 1', type: 'business', note: 'Деловая программа GCC 2026 · Dress code: Business casual' },
      { time: '13:00–14:30', title: 'Обед', location: 'Ресторан Reflection', type: 'meal' },
      { time: '14:30',       title: 'Сбор в лобби · отправление на экскурсию', location: 'Лобби отеля', type: 'transfer', note: 'Удобная обувь, солнцезащитный крем, головной убор' },
      { time: '19:30',       title: 'Возвращение в отель', location: 'Elexus Hotel & Resort & SPA', type: 'transfer' },
      { time: '19:30–00:00', title: 'Пляжная вечеринка', location: 'Mia Beach', type: 'gala', note: 'Dress code: Cocktail · удобная обувь' },
      { time: '00:00–02:00', title: 'After-party', location: 'The Gazino', type: 'dinner', note: 'Dress code: Cocktail/Casual' },
    ],
  },
  {
    id: 3, label: '4 июня', date: '4 июня, четверг',
    theme: 'Workshop & Гала-ужин', color: '#0077FF', pillar: 'Power of Ideas',
    weather: { icon: '⛅', temp: '+28°C', note: 'переменная облачность' },
    activities: [
      { time: '07:00–10:00', title: 'Завтрак', location: 'Ресторан Reflection', type: 'meal' },
      { time: '10:00–13:00', title: 'Workshop', location: 'Elexus 1', type: 'business', note: 'Деловая программа GCC 2026 · Dress code: Business casual' },
      { time: '13:00–14:00', title: 'Обед', location: 'Ресторан Reflection', type: 'meal' },
      { time: '14:00–16:00', title: 'Workshop', location: 'Elexus 1', type: 'business', note: 'Dress code: Business casual' },
      { time: '16:00–20:00', title: 'Свободное время', type: 'free', note: 'СПА, пляж, бассейн — на ваш выбор' },
      { time: '20:00–00:00', title: 'Гала-ужин GCC 2026', location: 'Elexus 3', type: 'gala', note: 'Dress code: Smart casual' },
      { time: '00:00–02:00', title: 'After-party', location: 'The Gazino', type: 'dinner', note: 'Dress code: Cocktail/Casual' },
    ],
  },
  {
    id: 4, label: '5 июня', date: '5 июня, пятница',
    theme: 'Отъезд', color: '#3D2E6B', pillar: null,
    weather: { icon: '☀️', temp: '+29°C', note: 'ясно' },
    activities: [
      { time: '07:00–10:00', title: 'Завтрак', location: 'Ресторан Reflection', type: 'meal' },
      { time: '12:00',       title: 'Выезд из отеля', location: 'Стойка регистрации', type: 'hotel', note: 'Багаж можно оставить у консьержа до отъезда' },
      { time: '—',           title: 'Трансферы в аэропорт Эрджан', location: 'Аэропорт Эрджан (ECN)', type: 'transfer', note: 'Согласно полётным данным · Координатор: Малик +90 530 385 01 11' },
    ],
  },
];

const NEARBY = [
  {
    icon: '🏖',
    title: 'Пляж отеля',
    desc: 'Собственный песчаный пляж с пирсом. Лежаки, зонты и полотенца — бесплатно для гостей. Можно купаться с берега или с пирса.',
    distance: 'На территории',
    hours: 'Весь день',
    tip: 'Не забудьте SPF и головной убор — пляж открыт, солнце активное.',
  },
  {
    icon: '🏙',
    title: 'Центр Кирении',
    desc: 'Старая гавань, рестораны у воды, узкие улочки исторического центра. Вечером набережная особенно оживлена.',
    distance: '~10 км · 10–15 мин на такси',
    hours: 'Рестораны с 12:00, бары до позднего вечера',
    tip: 'Такси вызывайте через ресепшн. Uber и Bolt тоже работают.',
  },
  {
    icon: '🏰',
    title: 'Замок Кирении',
    desc: 'Замок XII–XV веков на берегу Кирении. Внутри — музей с торговым судном 300 г. до н.э., старейшим сохранившимся деревянным кораблём в мире.',
    distance: '~10 км · 15 мин на такси',
    hours: '09:00–19:00',
    tip: 'Вход ~5 EUR. Панорама на гавань — с верхней галереи замка.',
  },
  {
    icon: '🍽',
    title: 'Рестораны у отеля',
    desc: 'Несколько местных ресторанов в курортной зоне Чаталкёй — в 5–10 минутах езды от отеля.',
    distance: '5–10 мин на такси',
    hours: 'Уточняйте на месте',
    tip: 'Конкретное место — лучше уточнить у консьержа.',
  },
  {
    icon: '💊',
    title: 'Аптека / магазины',
    desc: 'Ближайшая аптека и магазины — в нескольких минутах езды. Крупная аптека и торговые точки — в центре Кирении.',
    distance: '5–15 мин на такси',
    hours: '09:00–20:00',
    tip: 'Если нужна аптека срочно — ресепшн подскажет ближайшую дежурную.',
  },
];

const EXHIBITORS = [
  { id:  1, company: 'Calista Luxury Resort',        flag: '🇹🇷', logoEmoji: '🏨', website: 'https://calista.com.tr/en',                                                                                          contact: 'Batuhan Kısa',                            phone: '', telegram: '', whatsapp: '', desc: 'Первый в Турции отель с международной наградой «Зелёная звезда» — 120 000 м² среди соснового леса в Белеке прямо у Средиземного моря. Концепция Ultra All Inclusive и ежегодные международные награды за качество сервиса.' },
  { id: 24, company: 'Concorde De Luxe Resort',       flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.concordehotels.com.tr/en-US',                                                                             contact: 'Aziza Donmez, Daria Damar',               phone: '', telegram: '', whatsapp: '', desc: 'Тематический пятизвёздочный resort на первой береговой линии Лары, архитектурно выполненный в форме самолёта Конкорд, с прямым выходом на пляж с Голубым флагом. 380 номеров с балконами, 11 ресторанов и конференц-залы для мероприятий.' },
  { id:  2, company: 'Conrad Istanbul Bosphorus',    flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.hilton.com/en/hotels/isthcci-conrad-istanbul-bosphorus/',                                               contact: 'Işil Hünler',                             phone: '', telegram: '', whatsapp: '', desc: 'Пятизвёздочный отель на берегу Босфора с панорамными видами на пролив и исторические мосты Стамбула. Spa Soul, крытый и открытый бассейны, теннисный клуб и рестораны с авторской кухней.' },
  { id:  3, company: 'Crowne Plaza Belgrade',        flag: '🇷🇸', logoEmoji: '🏨', website: 'https://www.ihg.com/crowneplaza/hotels/us/en/belgrade/begcp/hoteldetail',                                           contact: 'Martina Lazic',                           phone: '', telegram: '', whatsapp: '', desc: 'Флагманский отель в деловом районе Нового Белграда, в 15 минутах от аэропорта и в пешей доступности от Stark Arena. Крупнейший в городе бальный зал, 14 конференц-залов и ресторан Prime с авторской сербской кухней.' },
  { id:  4, company: 'CVK Hotels & Resorts',         flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.cvkhotelsandresorts.com/',                                                                               contact: 'Timur Tajiyev',                           phone: '', telegram: '', whatsapp: '', desc: 'Турецкая luxury-сеть в центре Стамбула: флагман CVK Park Bosphorus Hotel — крупнейший гостиничный инвестиционный проект в истории города. 68 апартаментов-люксов, безупречный spa и центральное расположение.' },
  { id:  5, company: 'Doria Hotel Bodrum',           flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.doriahotelbodrum.com/en-US/',                                                                            contact: 'İpek Gaye Sungur',                        phone: '', telegram: '', whatsapp: '', desc: 'Boutique-отель с видом на бухту Битез в Бодруме, работающий круглый год и отражающий живой дух Эгейского моря в каждой детали. Современный дизайн и элегантная простота в одном из самых живописных мест Турции.' },
  { id:  6, company: 'Ducale Lara',                  flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.ducalehotels.com/',                                                                                      contact: 'Fırat Sakarya',                           phone: '', telegram: '', whatsapp: '', desc: 'Уникальный Ultra All Inclusive отель в Анталье, где на берегу Средиземного моря воссозданы площадь Сан-Марко, Дворец Дожей и мост Риальто из Венеции. Масштабный архитектурный ансамбль, поражающий деталировкой и атмосферой.' },
  { id:  7, company: 'Ela Excellence Resort Belek',  flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.elahotels.com/en/our-hotels/ela-excellence-resort-belek/',                                              contact: 'Seda Gürgen',                             phone: '', telegram: '', whatsapp: '', desc: 'Пятизвёздочный resort в первой береговой линии Белека с номерами в современном минималистичном стиле у самого моря. Длинный песчаный пляж, открытые бассейны, аквапарк и рестораны с изысканной кухней для отдыха любого возраста.' },
  { id:  8, company: 'Ethno Belek',                 flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.ethnohotels.com/en',                                                                                     contact: 'Mariia Andrieieva, Şeyda Kara, Bora Hazinecioğlu',           phone: '', telegram: '', whatsapp: '', desc: 'Культурный resort-концепт в Белеке, где традиции, ритуалы и истории разных народов мира соединяются в живую мозаику. Ethno Culture превращает каждое пребывание в уникальное путешествие между цивилизациями.' },
  { id:  9, company: 'Gloria Hotels & Resorts',      flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.gloria.com.tr/en/',                                                                                      contact: 'Ali Doğuş Tanyıldız, Gökhan Gümüşdede, Sefa Kızılay',  phone: '', telegram: '', whatsapp: '', desc: 'Легендарная гостиничная группа Белека с историей с 1997 года: Gloria Golf Resort, Verde Resort и Serenity Resort. Идеальное сочетание luxury-отдыха, гольфа мирового уровня и семейного сервиса на Средиземном море.' },
  { id: 28, company: 'GreenCode International',    flag: '',    logoEmoji: '🌿', website: 'https://greencode.travel',                                                                                              contact: 'Maria Kots, Ismayil Samadov, Iraklii Kedia',                              phone: '', telegram: '', whatsapp: '', desc: 'Организатор GCC 2026 — DMC-компания, специализирующаяся на корпоративных инсентив-турах и MICE-мероприятиях. Создают программы под ключ: от концепции и логистики до проведения мероприятия.' },
  { id: 10, company: 'KHG (Nirvana Hotels)',          flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.nirvanahotels.com.tr/en/',                                                                               contact: 'Merve Demir',                             phone: '', telegram: '', whatsapp: '', desc: 'Группа KHG управляет тремя концептуальными отелями бренда Nirvana: Mediterranean Excellence в сосновом лесу, Cosmopolitan с городским ритмом и Dolce Vita с приватной бухтой у Таврских гор. Три разных мира отдыха — одна философия сервиса.' },
  { id: 11, company: 'Le Meridien Istanbul Etiler',  flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.marriott.com/en-us/hotels/istmd-le-meridien-istanbul-etiler/overview/',                                  contact: 'Meltem Doğanok',                          phone: '', telegram: '', whatsapp: '', desc: '34-этажный 5-звёздочный отель в Стамбуле с панорамными видами на Босфор и мосты города из каждого из 255 номеров. Более 2 500 м² event-пространств, турецкий хаммам и открытый бассейн.' },
  { id: 25, company: 'Limak Lara Deluxe Hotel & Resort', flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.limakhotels.com/lara',                                                                                 contact: 'Nazlı Kağan, Yasin Genç, Ayşenur Kavaloğlu',                             phone: '', telegram: '', whatsapp: '', desc: 'Курортный отель в Лара-Кунду с архитектурой в азиатском стиле, частным пляжем с голубым флагом и обширной конгресс-инфраструктурой. 604 номера с видом на Средиземное море, семь ресторанов и Aster Spa.' },
  { id: 26, company: "Lord's Palace Hotel",            flag: '🇹🇷', logoEmoji: '🏨', website: 'https://lordspalace.com/en/',                                                                                        contact: 'Gonca Saltik, Ekren Misra',                            phone: '', telegram: '', whatsapp: '', desc: 'Пятизвёздочный отель Casino & SPA на берегу Средиземного моря в Анталье с 250 номерами с видами на море, горы и город. Rooftop-терраса с бассейном, современный спа-центр и конференц-залы для корпоративных групп.' },
  { id: 12, company: 'MATCH POINT',                  flag: '',    logoEmoji: '🤝', website: 'https://matchpoints.ru/english',                                                                                     contact: 'Daria Ignatieva',                         phone: '', telegram: '', whatsapp: '', desc: 'Маркетинговое представительство ведущих DMC в Омане, Катаре, Японии, Вьетнаме и Китае. Надёжный партнёр для организации MICE-мероприятий в наиболее востребованных направлениях Ближнего Востока и Азии.' },
  { id: 27, company: 'Merit Park Hotel',               flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.merithotels.com/en/merit-park-hotel',                                                                    contact: 'Gürkan Cihan, Atam Fidan Yılmaz',                            phone: '', telegram: '', whatsapp: '', desc: 'Пятизвёздочный resort на набережной Кирении — флагманский объект группы Merit Hotels на Северном Кипре, с casino и полным спа-комплексом. 273 реновированных номера и конференц-залы для MICE-мероприятий.' },
  { id: 13, company: 'NG Phaselis Bay',                    flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.nghotels.com.tr/en/',                                                                                    contact: 'Salih Aygün, Mert Gunur Bertan',          phone: '', telegram: '', whatsapp: '', desc: 'Один из ведущих luxury-брендов Турции: курорты NG Sapanca, NG Enjoy, NG Afyon и NG Phaselis Bay — каждый с уникальной концепцией и природным окружением. Изысканная гастрономия, wellness и high-end event-инфраструктура.' },
  { id: 14, company: "Princes' Palace Resort",       flag: '🇹🇷', logoEmoji: '🏨', website: 'https://princespalace.com/',                                                                                         contact: 'Engin Alper',                             phone: '', telegram: '', whatsapp: '', desc: 'Уединённый luxury-курорт на Принцевых островах близ Стамбула, где особняк XIX века переосмыслен в духе современной роскоши. Приватная пляжная лагуна, infinity-бассейны и ANIM Wellbeing & Spa.' },
  { id: 15, company: 'REGNUM Hotels',                flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.regnumhotels.com/en/',                                                                                   contact: 'Burhan Alperen Aslan, Esra Köseoğlu',     phone: '', telegram: '', whatsapp: '', desc: 'Regnum Carya и Regnum The Crown — два premier-отеля в Белеке с философией устойчивого развития и персонализированного сервиса. Regnum The Crown открывает виды на Средиземное море с Rooftop-террасы.' },
  { id: 16, company: 'RIXOS Egypt',                  flag: '🇪🇬', logoEmoji: '🏨', website: 'https://www.rixos.com/destinations/egypt',                                                                           contact: 'Uğur Can Dilsiz',                         phone: '', telegram: '', whatsapp: '', desc: 'Часть группы Accor, Rixos Egypt объединяет iconic resort-отели на Красном и Средиземном морях — от adults-only концепций до семейных курортов. Фирменный All Inclusive сочетает luxury-стандарты, гастрономию и яркие развлечения.' },
  { id: 17, company: 'Sacred Mansion',               flag: '🇹🇷', logoEmoji: '🏨', website: 'https://sacredmansion.com.tr/',                                                                                      contact: 'Leyla Aydin',                             phone: '', telegram: '', whatsapp: '', desc: 'Boutique luxury-отель в пещерной архитектуре Каппадокии с 37 уникальными номерами и интерьерами в стиле арт-галереи — с видом на воздушные шары над Гёреме. Легендарный Inferno SPA с Red Pool и ресторан Lilith.' },
  { id: 18, company: 'Sheraton Istanbul Levent',     flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.istanbulsheratonlevent.com/',                                                                            contact: 'Selma Yılmaz Patat',                      phone: '', telegram: '', whatsapp: '', desc: 'Современный отель и spa-комплекс в деловом районе Левент, в шаговой доступности от ключевых бизнес-хабов Стамбула. Shine Spa, уютный сад в сердце города и ресторан The Levantino с кухней Восточного Средиземноморья.' },
  { id: 19, company: 'Silk Hospitality',             flag: '🇬🇪', logoEmoji: '🏢', website: 'https://silkhospitality.com/',                                                                                       contact: 'Sophio Meskhi',                           phone: '', telegram: '', whatsapp: '', desc: 'Ведущий гостиничный оператор Грузии с 7 объектами мирового уровня в Тбилиси, Батуми, Цинандали и Кохта. Портфель включает upscale-отели, luxury-казино и рестораны под ведущими международными брендами.' },
  { id: 20, company: 'Sinnada Resort & Thermaland',  flag: '🇹🇷', logoEmoji: '🏨', website: 'https://sinnada.com/en',                                                                                             contact: 'Merih Gülmez',                            phone: '', telegram: '', whatsapp: '', desc: 'Первый в Турции термальный SPA-отель с тропической концепцией: 19 850 м² с 280 пальмами, термальными бассейнами и ощущением лета круглый год. Три коллекции размещения для разных потребностей — от wellness до эксклюзивного отдыха.' },
  { id: 21, company: 'Sueno Hotels',                 flag: '🇹🇷', logoEmoji: '🏨', website: 'https://sueno.com.tr/anasayfa-en/',                                                                                  contact: 'Araz Hadi, Cihan Şengül',                 phone: '', telegram: '', whatsapp: '', desc: 'Luxury all-inclusive resort в Белеке, где традиционное турецкое гостеприимство встречается с роскошью Средиземного моря. Уникальные гольф-поля, семейные активности и exclusive spa для пар — всё под одной крышей.' },
  { id: 22, company: 'Susesi Luxury Resort',         flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.susesihotel.com/en/',                                                                                    contact: 'Şefika Uluçay',                           phone: '', telegram: '', whatsapp: '', desc: 'Flagship luxury resort в Белеке с обновлёнными номерами, авторским спа-центром и ресторанами мировой кухни с живой музыкой. Каждая деталь Susesi создана для того, чтобы каждый момент отдыха был особенным.' },
  { id: 23, company: 'Wyndham Grand Tbilisi',        flag: '🇬🇪', logoEmoji: '🏨', website: 'https://www.wyndhamhotels.com/wyndham-grand/tbilisi-georgia/wyndham-grand-tbilisi/overview',                        contact: 'Ana Chechelashvili, Manana Ashadze',      phone: '', telegram: '', whatsapp: '', desc: '5-звёздочный отель в самом центре Тбилиси, в нескольких шагах от площади Свободы и Старого города. Более 906 м² event-пространств и ballroom с панорамным видом на 9-м этаже — идеально для MICE-мероприятий до 330 гостей.' },
];

const TRANSFERS = {
  info: 'Трансферы аэропорт–отель–аэропорт организованы GreenCode International. Координация: Малик +90 530 385 01 11',
  arrival: [
    {
      label: 'Заезд · 2 июня',
      color: '#D4A838',
      items: [
        { time: '—', title: 'Встреча в аэропорту Эрджан (ECN)', note: 'Встреча в зоне прилёта · Табличка «GCC 2026»' },
        { time: '—', title: 'Выезд из аэропорта', note: '~45 мин до отеля' },
        { time: '—', title: 'Прибытие в отель', note: 'Трансфер организован для всех рейсов группы' },
      ],
    },
  ],
  departure: [
    {
      label: 'Отъезд · 5 июня',
      color: '#6B7280',
      items: [
        { time: '—', title: 'Трансферы будут организованы согласно полётным данным', note: 'Выезд от главного входа отеля' },
      ],
    },
  ],
  contacts: [],
};

const FAQ = [
  { q: 'Во сколько завтрак?',              a: 'Завтрак в ресторане Reflection — 07:00–10:00, шведский стол, включён в программу. При входе укажите, что вы в составе группы GCC 2026.' },
  { q: 'Как вызвать трансфер?',            a: 'Расписание трансферов — во вкладке «Локация». По индивидуальным вопросам обращайтесь к координатору или на ресепшн.' },
  { q: 'Где получить бейдж?',              a: 'Бейдж и Welcome-kit выдаются при заселении на стойке регистрации. По любым вопросам — координатор GreenCode.' },
  { q: 'Есть ли Wi-Fi в конференц-зале?',  a: 'Да. Сеть: Global Corporate Club · Пароль: welcome2gcc' },
  { q: 'Что входит в программу?',          a: 'Проживание, завтраки, деловая программа, кофе-брейки, групповые ужины и экскурсия 3 июня.' },
{ q: 'Будет ли возможность выйти в город?',          a: 'Да, в свободное время — Кирения к вашим услугам. Подборка мест и расстояния — во вкладке «Локация».' },
  { q: 'Что взять на экскурсию 3 июня?',   a: 'Рекомендуем удобную обувь, солнцезащитный крем и головной убор. Вода будет обеспечена. Время сбора — в программе.' },
  { q: 'Дресс-код на гала-ужине?',         a: 'Smart casual. Подробности уточним накануне.' },
  { q: 'Какие розетки на Кипре?',          a: 'Тип G — британский стандарт, три прямоугольных контакта. Адаптер можно получить на ресепшн.' },
];

// time: 'morning' (6-11) | 'afternoon' (12-17) | 'evening' (17-22) | 'any'
const PRACTICAL = [
  // День 1 — заезд
  { icon: '🔌', title: 'Розетки',              text: 'Тип G (британский стандарт).',                                                             time: 'any',       until: null,    days: [1] },
  { icon: '🏷️', title: 'Бейдж и Welcome-kit',  text: 'Получите при заселении. Бейдж нужен на всех деловых мероприятиях.',                        time: 'afternoon', until: null,    days: [1] },
  { icon: '📶', title: 'Wi-Fi в отеле',         text: 'Сеть: Global Corporate Club · Пароль: welcome2gcc.',                                       time: 'any',       until: null,    days: [1] },

  // День 2 — воркшоп + экскурсия
  { icon: '👟', title: 'Экскурсия сегодня',     text: 'Сбор в лобби в 14:30. Удобная обувь обязательна.',                                        time: 'any',       until: '14:30', days: [2] },
  { icon: '🧴', title: 'Крем и головной убор',  text: '+30°C. SPF 30+.',                                                                          time: 'any',       until: '14:30', days: [2] },
  { icon: '🎉', title: 'Пляжная вечеринка',     text: 'Mia Beach.',                                                                               time: 'any',       until: '19:30', days: [2] },
  { icon: '👔', title: 'Dress code',             text: 'Cocktail · удобная обувь. Начало в 19:30.',                                               time: 'any',       until: '19:30', days: [2] },

  // День 3 — воркшоп + гала-ужин
  { icon: '👔', title: 'Dress code',             text: 'Smart casual. Гала-ужин в 20:00, зал Elexus 3.',                                          time: 'any',       until: '20:00', days: [3] },
  { icon: '🧖', title: 'Свободное время',        text: 'С 16:00 — спа/пляж/бассейн. Запись в Zoya Spa через ресепшн.',                           time: 'afternoon', until: '16:00', days: [3] },
  { icon: '🤝', title: 'Workshop',               text: 'Во вкладке «Экспоненты».',                                                                time: 'any',       until: null,    days: [3] },

  // День 4 — отъезд
  { icon: '🧳', title: 'Выезд сегодня',          text: 'Расчётный час 12:00. Багаж можно оставить в багажной комнате.',                           time: 'morning',   until: '12:00', days: [4] },
  { icon: '✈️', title: 'Трансфер в аэропорт',   text: 'Согласно рейсам. По вопросам — представитель GreenCode Малик: +90 530 385 01 11.',         time: 'morning',   until: null,    days: [4] },

  // Каждый день
  { icon: '☀️', title: 'Завтрак',               text: 'Ресторан Reflection, шведский стол с 07:00.',                                              time: 'morning',   until: '10:00', days: null },
  { icon: '🚕', title: 'Такси',                  text: 'Через ресепшн или Uber/Bolt.',                                                            time: 'any',       until: null,    days: null },
  { icon: '🌡️', title: 'Погода',                text: '+28–32°C, солнечно. SPF 30+.',                                                             time: 'any',       until: null,    days: null },
];

const CUISINE = {
  intro: 'Кипрская кухня строится на нескольких принципах: местные продукты, открытый огонь и минимум лишнего. Оливковое масло, морепродукты, сыры и мясо на углях — то, с чем вы встретитесь за столом в Elexus.',
  dishes: [
    {
      icon: '🧀',
      name: 'Халлуми',
      desc: 'Визитная карточка кипрской кухни — сыр из козьего и овечьего молока, который обжаривают на гриле. Снаружи — тонкая хрустящая корочка, внутри — нежная упругая текстура. Подают горячим, традиционно с дольками арбуза или свежей мятой.',
    },
    {
      icon: '🍽',
      name: 'Мезе',
      desc: 'Не одно блюдо, а целая философия стола: 15–20 небольших подач — хумус, тахини, оливки, долма, сыры, рыба, зелень. Мезе — это неторопливое застолье, где каждая тарелочка открывает новый вкус.',
    },
    {
      icon: '🥩',
      name: 'Клефтико',
      desc: 'Баранина, маринованная с лимоном и специями, запекается несколько часов при низкой температуре. К моменту подачи мясо отходит от кости без усилий. Готовят на Кипре в неизменном виде уже несколько столетий.',
    },
    {
      icon: '🍢',
      name: 'Шефталия',
      desc: 'Кипрские колбаски из рубленой баранины и свинины с луком и петрушкой, приготовленные на углях. Подают вместе с халлуми, питой и овощами — как часть общего стола, а не отдельным блюдом.',
    },
    {
      icon: '🐟',
      name: 'Рыба и морепродукты',
      desc: 'Дорада, морской окунь, осьминог, кальмары из Средиземного моря. Гриль, лимон, оливковое масло — никаких соусов, которые перебивают вкус. Всё решает качество самого продукта.',
    },
    {
      icon: '🍯',
      name: 'Лукумадес',
      desc: 'Шарики из дрожжевого теста, обжаренные во фритюре и политые мёдом с корицей. Подают горячими — есть нужно сразу. Впервые упомянуты ещё в текстах Древней Греции.',
    },
    {
      icon: '🥃',
      name: 'Зивания',
      desc: 'Кипрский дистиллят из виноградных выжимок — прозрачный, без добавок, крепостью около 40–45°. Производится на острове с XV века. Подают охлаждённым в маленьких рюмках — в начале или конце ужина.',
    },
  ],
};

const EXCURSION = {
  title:        'Кирения · Обзорная экскурсия',
  date:         '3 июня, среда',
  duration:     '~5 часов',
  meetingPoint: 'Главный вход отеля',
  meetingTime:  '14:30',
  formUrl:      'https://forms.gle/hMeiKMGcaQ2LhtE99',
  desc:         'Выездная экскурсия в Кирению (Girne) — главный исторический город Северного Кипра. От отеля 20–30 минут на комфортабельном транспорте.',

  program: [
    { time: '14:30', title: 'Сбор у главного входа отеля', note: 'Отправление строго по расписанию' },
    { time: '19:30', title: 'Возвращение в отель',          note: '' },
  ],

  funFacts: [
    { icon: '🥇', title: 'Слово «карат» — родом с Кипра', text: 'Кипрские рожковые деревья давали бобы с удивительно стабильным весом. Ювелиры использовали их как гири — и слово «карат» произошло от греческого «кератион» (рожковое дерево).' },
    { icon: '🐢', title: 'Черепахи выбирают Северный Кипр', text: 'Карпасский полуостров — одна из немногих территорий Средиземноморья, где морские черепахи Caretta caretta откладывают яйца прямо на диких пляжах. Сезон кладки — май–август.' },
    { icon: '⚗️', title: 'Кипр дал имя меди', text: 'Латинское слово «cuprum» (медь) происходит от «Kypros» — так в древности называли остров. Кипр был главным источником меди для всего античного мира.' },
    { icon: '🥃', title: 'Зивания — напиток с историей', text: 'Зивания — традиционный кипрский дистиллят из виноградных выжимок, который производят на Северном Кипре уже более 500 лет. Крепкий, чистый, без добавок — чем-то похож на граппу. Часто подают как аперитив или после еды.' },
    { icon: '🏔', title: 'Пять пальцев на горе', text: 'Горный хребет над Киренией называется Бешпармак — «Пять пальцев» по-турецки. Легенда гласит, что это отпечаток руки великана, который опёрся о горы, выходя из моря.' },
    { icon: '☀️', title: 'Более 300 солнечных дней в году', text: 'В Северном Кипре в среднем 320 солнечных дней в году. Купальный сезон — с апреля по ноябрь. В июне температура воды достигает +26–28°C.' },
    { icon: '🧀', title: 'Халлуми — только с Кипра', text: 'Халлуми производят на острове тысячи лет. Это единственный сыр, который можно жарить и гриллировать — он не плавится. В 2021 году получил статус защищённого наименования происхождения ЕС.' },
  ],

  tips: [
    'Удобная обувь — в замке много ступеней и неровных мощёных поверхностей.',
    'Солнцезащитный крем и головной убор — территория открытая, тени мало.',
    'Вход в замок ~5 EUR, оплата наличными или картой.',
    'Воду лучше взять с собой — внутри замка не продаётся.',
    'В сувенирных лавках у гавани принимают EUR и TRY.',
  ],

  photoSpots: [
    { icon: '📸', title: 'Вид на гавань с башни замка',  desc: 'Панорама на старую гавань, яхты и горный хребет Бешпармак — с верхней галереи замка.' },
    { icon: '📸', title: 'Ворота замка',                  desc: 'Массивные ворота XV века — хороший кадр в любое время суток.' },
    { icon: '📸', title: 'Набережная старой гавани',      desc: 'Рыбацкие лодки, рестораны у воды, отражение крепостных стен — узнаваемый вид Кирении.' },
    { icon: '📸', title: 'Улочки старого города',         desc: 'Белые стены, деревянные ставни, тенистые переулки — Кирения без туристического шума.' },
  ],

  history: [
    {
      icon: '🏰',
      title: 'Киренийский замок',
      text: 'Замок XII–XV веков с четырьмя сторожевыми башнями и крепостными стенами толщиной до 3 метров. Перестраивался лузиньянами, венецианцами — последние укрепили стены специально против артиллерии. В 1570 году сдался османской армии практически без боя.',
    },
    {
      icon: '⛵',
      title: 'Корабль Кирении · 300 лет до н.э.',
      text: 'Внутри замка — одно из главных чудес острова: торговое судно возрастом ~2300 лет, обнаруженное в 1967 году на дне залива. Это старейший полностью сохранившийся деревянный корабль в мире. На борту нашли амфоры с вином, миндаль и жернова — редкий живой срез торговли древнего Средиземноморья.',
    },
    {
      icon: '🌊',
      title: 'Старая гавань',
      text: 'Гавань Кирении функционировала непрерывно с эпохи бронзового века. Сегодня — рестораны прямо у воды, яхты, рыбацкие лодки. Замковые стены отражаются в воде — самый узнаваемый вид города.',
    },
    {
      icon: '⛪',
      title: 'Аббатство Беллапаис · XIII век',
      text: 'В горной деревне Беллапаис, в нескольких километрах от Кирении, стоит редкий образец готической архитектуры для этой части Средиземноморья. Аббатство построено августинскими монахами в начале XIII века. Английский писатель Лоренс Даррелл жил здесь в 1950-х и написал роман «Горькие лимоны Кипра».',
    },
  ],

  images: [
    { src: 'castle.jpg',           caption: 'Киренийский замок' },
    { src: 'Kirenia_old port.jpg', caption: 'Старая гавань Кирении' },
    { src: 'embankment.jpg',       caption: 'Набережная Кирении' },
    { src: 'abbatstvo.jpg',        caption: 'Аббатство Беллапаис' },
    { src: 'northen Cyprus.jpg',   caption: 'Северный Кипр' },
    { src: 'Northen Cyprus 2.jpg', caption: 'Северный Кипр' },
  ],
};

// ─── TRANSLATIONS (English) ────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    days: [
      {
        label: 'Jun 2',
        date: 'June 2, Tuesday',
        theme: 'Check-in Day',
        weather_note: 'clear',
        activities: [
          { title: 'Arrival. Meet at Ercan Airport (ECN)', location: 'Ercan Airport',              note: 'According to flight schedule · «GCC 2026» sign at customs exit · Coordinator: Malik +90 530 385 01 11' },
          { title: 'Transfer to Hotel',                    location: 'Elexus Hotel & Resort & SPA', note: 'According to flight schedule · ~45 min from airport' },
          { title: 'Check-in',                             location: 'Check-in Desk',               note: 'Collect your badge and Welcome Kit' },
          { title: 'Dinner',                               location: 'Reflection Restaurant',        note: 'Included in the program · Dress code: Casual' },
          { title: 'After-party',                          location: 'The Gazino',                  note: 'Dress code: Cocktail/Casual' },
        ],
      },
      {
        label: 'Jun 3',
        date: 'June 3, Wednesday',
        theme: 'Workshop & Excursion',
        weather_note: 'clear',
        activities: [
          { title: 'Breakfast',                               location: 'Reflection Restaurant' },
          { title: 'Workshop',                                location: 'Elexus 1',        note: 'GCC 2026 Business Program · Dress code: Business casual' },
          { title: 'Lunch',                                   location: 'Reflection Restaurant' },
          { title: 'Lobby meetup · departure for excursion',  location: 'Hotel Lobby',     note: 'Comfortable shoes, sunscreen, hat' },
          { title: 'Return to Hotel',                         location: 'Elexus Hotel & Resort & SPA' },
          { title: 'Beach Party',                             location: 'Mia Beach',        note: 'Dress code: Cocktail · comfortable shoes' },
          { title: 'After-party',                             location: 'The Gazino',       note: 'Dress code: Cocktail/Casual' },
        ],
      },
      {
        label: 'Jun 4',
        date: 'June 4, Thursday',
        theme: 'Workshop & Gala Dinner',
        weather_note: 'partly cloudy',
        activities: [
          { title: 'Breakfast',              location: 'Reflection Restaurant' },
          { title: 'Workshop',               location: 'Elexus 1',   note: 'GCC 2026 Business Program · Dress code: Business casual' },
          { title: 'Lunch',                  location: 'Reflection Restaurant' },
          { title: 'Workshop',               location: 'Elexus 1',   note: 'Dress code: Business casual' },
          { title: 'Free Time',                                        note: 'Spa, beach, pool — your choice' },
          { title: 'GCC 2026 Gala Dinner',   location: 'Elexus 3',   note: 'Dress code: Smart casual' },
          { title: 'After-party',            location: 'The Gazino', note: 'Dress code: Cocktail/Casual' },
        ],
      },
      {
        label: 'Jun 5',
        date: 'June 5, Friday',
        theme: 'Departure Day',
        weather_note: 'clear',
        activities: [
          { title: 'Breakfast',                  location: 'Reflection Restaurant' },
          { title: 'Hotel Check-out',            location: 'Reception',           note: 'Luggage can be stored with the concierge until departure' },
          { title: 'Transfers to Ercan Airport', location: 'Ercan Airport (ECN)', note: 'According to flight schedule · Coordinator: Malik +90 530 385 01 11' },
        ],
      },
    ],
    excursion: {
      title:    'Kyrenia · City Tour',
      date:     'June 3, Wednesday',
      duration: '~5 hours',
      desc:     'A guided tour to Kyrenia (Girne) — the main historic city of Northern Cyprus. 20–30 minutes from the hotel by comfortable coach.',
      program: [
        { title: 'Gather at hotel main entrance', note: 'Departure strictly on schedule' },
        { title: 'Return to hotel',               note: '' },
      ],
      funFacts: [
        { title: 'The word "carat" comes from Cyprus',   text: 'Cypriot carob trees produced beans of remarkably consistent weight. Jewellers used them as counterweights — and the word "carat" derives from the Greek "keratia" (carob tree).' },
        { title: 'Sea turtles choose Northern Cyprus',   text: 'The Karpaz Peninsula is one of the few places in the Mediterranean where Caretta caretta sea turtles nest directly on wild beaches. Nesting season: May–August.' },
        { title: 'Cyprus gave copper its name',          text: 'The Latin word "cuprum" (copper) derives from "Kypros" — the ancient name for the island. Cyprus was the primary source of copper for the entire ancient world.' },
        { title: 'Zivania — a drink with history',       text: 'Zivania is a traditional Cypriot grape-pomace distillate produced in Northern Cyprus for over 500 years. Strong, clear, unaged — somewhat like grappa. Often served as an aperitif or after dinner.' },
        { title: 'Five Fingers Mountain',                text: 'The mountain ridge above Kyrenia is called Beşparmak — "Five Fingers" in Turkish. Legend has it that this is the imprint of a giant who leaned on the mountains as he emerged from the sea.' },
        { title: 'Over 300 sunny days a year',           text: 'Northern Cyprus averages 320 sunny days per year. Swimming season runs from April to November. In June the sea temperature reaches +26–28°C.' },
        { title: 'Halloumi — only from Cyprus',          text: 'Halloumi has been made on the island for thousands of years. It is the only cheese that can be fried or grilled without melting. In 2021 it received EU Protected Designation of Origin status.' },
      ],
      photoSpots: [
        { title: 'Harbour view from the castle tower', desc: 'Panorama of the old harbour, yachts and the Beşparmak mountain range — from the castle\'s upper gallery.' },
        { title: 'Castle gates',                       desc: '15th-century gates — a great shot at any time of day.' },
        { title: 'Old harbour waterfront',             desc: 'Fishing boats, waterfront restaurants, the reflection of the castle walls — the iconic view of Kyrenia.' },
        { title: 'Old town streets',                   desc: 'White walls, wooden shutters, shaded alleyways — Kyrenia away from the tourist crowds.' },
      ],
      history: [
        { title: 'Kyrenia Castle',                text: 'A 12th–15th century castle with four watchtowers and walls up to 3 metres thick. Rebuilt by the Lusignans, then the Venetians — who reinforced the walls specifically against artillery. In 1570 it surrendered to the Ottoman army with almost no resistance.' },
        { title: 'The Kyrenia Ship · 300 BC',     text: 'Inside the castle — one of the island\'s greatest wonders: a merchant vessel around 2,300 years old, discovered in 1967 on the bay floor. It is the oldest fully preserved wooden ship in the world. On board: amphorae of wine, almonds and millstones — a rare snapshot of ancient Mediterranean trade.' },
        { title: 'The Old Harbour',               text: 'Kyrenia harbour has functioned continuously since the Bronze Age. Today — restaurants right at the water\'s edge, yachts, fishing boats. The castle walls reflected in the water — the city\'s most recognisable view.' },
        { title: 'Bellapais Abbey · 13th century', text: 'In the mountain village of Bellapais, a few kilometres from Kyrenia, stands a rare example of Gothic architecture for this part of the Mediterranean. Built by Augustinian monks in the early 13th century. British author Lawrence Durrell lived here in the 1950s and wrote Bitter Lemons of Cyprus.' },
      ],
      imageCaptions: ['Kyrenia Castle', 'Kyrenia Old Harbour', 'Kyrenia Waterfront', 'Bellapais Abbey', 'Northern Cyprus', 'Northern Cyprus'],
    },
    location: {
      hotel: {
        desc: 'A resort complex in the Çatalköy area, 10 km from Kyrenia city centre. On site: private sandy beach with a pier, outdoor and indoor pools, waterpark, Zoya Spa & Wellness, gym, casino and several restaurants.',
        amenities: [
          { title: 'Breakfast',  note: 'Reflection Restaurant · buffet' },
          { title: 'Lunch',      note: 'Reflection Restaurant' },
          { title: 'Dinner',     note: 'Reflection Restaurant' },
          { title: 'Pools',      note: 'Multiple outdoor + heated indoor pool' },
          { title: 'Waterpark',  note: 'Seasonal hours' },
          { title: 'Beach',      note: 'Private sandy beach · sun loungers and towels included' },
          { title: 'Zoya Spa',   note: 'Hammam, saunas, treatments — by appointment, extra charge' },
          { title: 'Gym',        note: 'Complimentary for hotel guests' },
          { title: 'Casino',     note: 'On hotel premises' },
          { title: 'Wi-Fi',      note: 'Complimentary throughout the hotel' },
        ],
        tips: [
          'Breakfast at Reflection Restaurant — buffet, included in the program. Mention GCC 2026 at the entrance.',
          'Sun loungers, umbrellas and towels at the beach are complimentary for hotel guests.',
          'Poolside, beach and lobby bars open during the day; some items are charged separately.',
          'We recommend booking Zoya Spa treatments in advance — via reception or the spa desk.',
          'Kyrenia city centre is about 10–15 min by taxi. Best arranged through reception.',
          'In-room safe available — recommended for documents and valuables.',
        ],
      },
      transfers: {
        info: 'Airport–hotel–airport transfers organised by GreenCode International. Coordinator: Malik +90 530 385 01 11',
        arrival: [
          {
            label: 'Arrival · June 2',
            items: [
              { title: 'Meet at Ercan Airport (ECN)',  note: '«GCC 2026» sign at customs exit' },
              { title: 'Departure from airport',        note: '~45 min to the hotel' },
              { title: 'Arrival at hotel',              note: 'Transfer arranged for all group flights' },
            ],
          },
        ],
        departure: [
          {
            label: 'Departure · June 5',
            items: [
              { title: 'Transfers arranged according to flight schedules', note: 'Departure from main hotel entrance' },
            ],
          },
        ],
      },
      nearby: [
        { title: 'Hotel Beach',         desc: 'Private sandy beach with pier. Sun loungers, umbrellas and towels complimentary for guests. Swim from shore or the pier.',                                                               distance: 'On-site',                    hours: 'All day',                                tip: 'Don\'t forget SPF and a hat — the beach is open and the sun is strong.' },
        { title: 'Kyrenia City Centre', desc: 'The old harbour, waterfront restaurants, narrow streets of the historic centre. The seafront promenade is especially lively in the evenings.',                                          distance: '~10 km · 10–15 min by taxi', hours: 'Restaurants from 12:00, bars until late', tip: 'Arrange taxis through reception. Uber and Bolt also available.' },
        { title: 'Kyrenia Castle',      desc: 'A 12th–15th century castle on the Kyrenia waterfront. Inside — a museum housing a 300 BC merchant vessel, the oldest surviving wooden ship in the world.',                             distance: '~10 km · 15 min by taxi',    hours: '09:00–19:00',                            tip: 'Entry ~€5. Panoramic harbour views from the upper gallery.' },
        { title: 'Nearby Restaurants',  desc: 'Several local restaurants in the Çatalköy resort area, 5–10 minutes from the hotel.',                                                                                                   distance: '5–10 min by taxi',           hours: 'Check locally',                          tip: 'Ask the concierge for a specific recommendation.' },
        { title: 'Pharmacy / Shops',    desc: 'Nearest pharmacy and shops a few minutes away by car. Larger pharmacy and shops in Kyrenia city centre.',                                                                               distance: '5–15 min by taxi',           hours: '09:00–20:00',                            tip: 'If you need a pharmacy urgently, reception can direct you to the nearest duty pharmacy.' },
      ],
      cuisine: {
        intro: 'Cypriot cuisine is built on a few principles: local produce, open fire and nothing superfluous. Olive oil, seafood, cheese and charcoal-grilled meat — this is what you\'ll encounter at the table in Elexus.',
        dishes: [
          { name: 'Halloumi',      desc: 'The hallmark of Cypriot cuisine — a goat and sheep\'s milk cheese griddled until golden. Thin and crispy outside, tender and squeaky within. Served hot, traditionally with watermelon slices or fresh mint.' },
          { name: 'Meze',         desc: 'Not one dish but an entire philosophy of the table: 15–20 small servings — hummus, tahini, olives, dolma, cheese, fish, greens. Meze is an unhurried feast where each small plate opens a new flavour.' },
          { name: 'Kleftiko',     desc: 'Lamb marinated with lemon and spices, slow-roasted for several hours. By the time it arrives at the table, the meat falls effortlessly off the bone. Made in Cyprus the same way for centuries.' },
          { name: 'Sheftalia',    desc: 'Cypriot sausages of minced lamb and pork with onion and parsley, cooked over charcoal. Served with halloumi, pitta and vegetables — part of a shared table rather than a standalone dish.' },
          { name: 'Fish & Seafood', desc: 'Sea bream, sea bass, octopus, squid from the Mediterranean. Grilled with lemon and olive oil — no sauces to mask the flavour. Quality of the ingredient is all that matters.' },
          { name: 'Loukoumades', desc: 'Yeast-dough balls deep-fried and drizzled with honey and cinnamon. Served hot — eat immediately. First mentioned in ancient Greek texts.' },
          { name: 'Zivania',      desc: 'Cypriot grape-pomace distillate — clear, unaged, around 40–45% ABV. Produced on the island since the 15th century. Served chilled in small glasses at the start or end of dinner.' },
        ],
      },
    },
    practical: [
      { title: 'Power Outlets',       text: 'Type G (British standard).' },
      { title: 'Badge & Welcome Kit', text: 'Collect at check-in. Badge required at all business events.' },
      { title: 'Hotel Wi-Fi',         text: 'Network: Global Corporate Club · Password: welcome2gcc.' },
      { title: 'Excursion today',     text: 'Lobby meetup at 14:30. Comfortable shoes required.' },
      { title: 'Sunscreen & Hat',     text: '+30°C. SPF 30+.' },
      { title: 'Beach Party',         text: 'Mia Beach.' },
      { title: 'Dress code',          text: 'Cocktail · comfortable shoes. Starts at 19:30.' },
      { title: 'Dress code',          text: 'Smart casual. Gala Dinner at 20:00, Elexus 3 hall.' },
      { title: 'Free Time',           text: 'From 16:00 — spa / beach / pool. Book Zoya Spa at reception.' },
      { title: 'Workshop',            text: 'See the Exhibitors tab.' },
      { title: 'Check-out today',     text: 'Check-out at 12:00. Luggage storage available.' },
      { title: 'Airport Transfer',    text: 'According to flight schedule. Questions — GreenCode coordinator Malik: +90 530 385 01 11.' },
      { title: 'Breakfast',           text: 'Reflection Restaurant, buffet from 07:00.' },
      { title: 'Taxi',                text: 'Via reception or Uber/Bolt.' },
      { title: 'Weather',             text: '+28–32°C, sunny. SPF 30+.' },
    ],
    faq: [
      { q: 'What time is breakfast?',                    a: 'Breakfast at Reflection Restaurant — 07:00–10:00, buffet, included in the program. Mention GCC 2026 group at the entrance.' },
      { q: 'How do I arrange a transfer?',               a: 'Transfer schedule is in the Location tab. For individual questions, contact the coordinator or reception.' },
      { q: 'Where do I collect my badge?',               a: 'Badge and Welcome kit are handed out at check-in. For any questions — the GreenCode coordinator.' },
      { q: 'Is there Wi-Fi in the conference hall?',     a: 'Yes. Network: Global Corporate Club · Password: welcome2gcc' },
      { q: 'What is included in the program?',           a: 'Accommodation, breakfasts, business program, coffee breaks, group dinners, and the excursion on June 3.' },
{ q: 'Can I go into town?',                        a: 'Yes, during free time — Kyrenia is right there. Places and distances are listed in the Location tab.' },
      { q: 'What should I bring on the June 3 excursion?', a: 'Comfortable shoes, sunscreen, and a hat. Water will be provided. Meeting time is in the schedule.' },
      { q: 'Dress code for the gala dinner?',            a: 'Smart casual. Details will be confirmed the day before.' },
      { q: 'What power outlets does Cyprus use?',        a: 'Type G — British standard, three rectangular pins. An adapter is available at reception.' },
    ],
    exhibitors: [
      // Same order as EXHIBITORS array (alphabetical)
      { desc: 'The first internationally certified Green Star hotel in Turkey — 120,000 m² of pine forest meets the Mediterranean in Antalya-Belek. Ultra All Inclusive concept with consistently high service quality awards.' },
      { desc: 'A premium beachfront resort in Antalya\'s Lara district, architecturally shaped like a Concorde aircraft, with direct access to a Blue Flag beach. 380 balcony rooms, 11 restaurants, and dedicated conference facilities.' },
      { desc: 'A five-star hotel on the Bosphorus shore with panoramic views of the strait and Istanbul\'s historic bridges. Features Spa Soul, indoor and outdoor pools, a tennis club, and signature dining.' },
      { desc: 'A city landmark in New Belgrade\'s business district, 15 minutes from the airport and walking distance from Stark Arena. Home to the city\'s largest ballroom, 14 conference rooms, and restaurant Prime with modern Serbian cuisine.' },
      { desc: 'A Turkish luxury hotel group centred on flagship CVK Park Bosphorus — the largest hotel investment project in Istanbul\'s history. 68 luxury suites, a world-class spa, and a prime central location.' },
      { desc: 'A boutique hotel overlooking Bitez Bay in Bodrum, open year-round, capturing the authentic spirit of the Aegean. Contemporary design and understated elegance in one of Turkey\'s most scenic settings.' },
      { desc: 'An Ultra All Inclusive hotel in Antalya where San Marco Square, the Doge\'s Palace, and the Rialto Bridge have been recreated on the Mediterranean shore. A remarkable architectural ensemble impressive in both scale and detail.' },
      { desc: 'A five-star beachfront resort in Belek with rooms in a contemporary minimalist style right by the sea. Long sandy beach, outdoor pools, waterpark, and fine dining for guests of all ages.' },
      { desc: 'A cultural resort concept in Belek where traditions, rituals, and stories from civilizations around the world come together. Every stay becomes a living journey across different eras and peoples.' },
      { desc: 'A legendary Belek hotel group with a history since 1997: Gloria Golf Resort, Verde Resort, and Serenity Resort. The ideal blend of luxury, world-class golf, and family hospitality on the Mediterranean.' },
      { desc: 'GCC 2026 organizer — a DMC specializing in corporate incentive travel and MICE events. End-to-end solutions: from concept and logistics to full event execution.' },
      { desc: 'KHG operates three distinct Nirvana hotel concepts: Mediterranean Excellence in a pine forest, Cosmopolitan with an urban rhythm, and Dolce Vita with a private bay at the foot of the Taurus Mountains. Three unique worlds, one service philosophy.' },
      { desc: 'A 34-story five-star hotel in Istanbul with panoramic Bosphorus views from all 255 rooms. Over 2,500 m² of event space, a Turkish hammam, and a rooftop pool.' },
      { desc: 'A beachfront resort in Lara-Kundu with Asian-inspired architecture, a Blue Flag private beach, and extensive congress infrastructure. 604 sea-view rooms, seven restaurants, and Aster Spa.' },
      { desc: 'A five-star Casino & SPA hotel on the Antalya coastline with 250 rooms offering sea, mountain, and city views. Rooftop pool terrace, modern spa, and conference facilities for corporate groups.' },
      { desc: 'Marketing representation for leading DMCs in Oman, Qatar, Japan, Vietnam, and China. A reliable partner for MICE events across the most in-demand destinations in the Middle East and Asia.' },
      { desc: 'A five-star seafront resort near Kyrenia — flagship property of Merit Hotels in North Cyprus, with casino and full-service spa. 273 renovated rooms and conference facilities for MICE events.' },
      { desc: 'One of Turkey\'s leading luxury hotel brands: NG Sapanca, NG Enjoy, NG Afyon, and award-winning NG Phaselis Bay — each with a distinct concept and natural setting. Premium gastronomy, wellness, and high-end event infrastructure.' },
      { desc: 'A secluded luxury resort on Büyükada (Princes\' Islands) near Istanbul, where a 19th-century estate has been reimagined as a contemporary retreat. Private beach lagoon, infinity pools, and ANIM Wellbeing & Spa.' },
      { desc: 'Regnum Carya and Regnum The Crown — two premier hotels in Belek built on sustainable architecture and a personalized service philosophy. Regnum The Crown offers Mediterranean panoramas from a rooftop terrace.' },
      { desc: 'Part of Accor Group, Rixos Egypt brings together iconic resort properties on the Red Sea and Mediterranean — from adults-only retreats to family-oriented group resorts. Signature All Inclusive experience combining luxury standards with vibrant entertainment.' },
      { desc: 'A boutique luxury hotel in Göreme, Cappadocia — cave architecture, 37 unique rooms with gallery-style interiors, and views of hot air balloons over the valley. Home to the legendary Inferno SPA with its Red Pool and restaurant Lilith.' },
      { desc: 'A contemporary hotel and spa in Istanbul\'s Levent business district, steps from the city\'s key corporate hubs. Features Shine Spa, a courtyard garden in the heart of the city, and The Levantino restaurant with Eastern Mediterranean cuisine.' },
      { desc: 'Georgia\'s leading hospitality operator with 7 world-class properties across Tbilisi, Batumi, Tsinandali, and Kohta. Portfolio spans upscale hotels, luxury casinos, and restaurants under top international brands.' },
      { desc: 'Turkey\'s first tropical thermal spa hotel — 19,850 m² with 280 palm trees, thermal pools, and a year-round summer atmosphere. Three accommodation collections tailored to wellness stays, leisure, and exclusive retreats.' },
      { desc: 'A luxury all-inclusive resort in Belek where traditional Turkish hospitality meets Mediterranean splendour. Championship golf courses, family programming, and an exclusive couples\' spa — all under one roof.' },
      { desc: 'A flagship luxury resort in Belek with redesigned rooms, a signature spa, and world cuisine restaurants with live music. Every detail crafted to make each moment of the stay exceptional.' },
      { desc: 'A five-star hotel in the heart of Tbilisi, steps from Freedom Square and the Old City. Over 906 m² of event space and a 9th-floor ballroom with panoramic views — ideal for MICE events of up to 330 guests.' },
    ],
  },
};

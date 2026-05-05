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
    color:     '#166534',
    logo:      '',
    logoEmoji: '🌿',
  },
  hotel: {
    name:     '[Название отеля]',
    address:  '[Адрес], Северный Кипр',
    phone:    '[+90 ...]',
    maps:     '',
    checkin:  '14:00',
    checkout: '12:00',
  },
  wifi:      { network: '[Название сети]', password: '[Пароль]' },
  organizer: { name: 'GreenCode International', telegram: 'https://t.me/greencode_intl' },
  emergency: '[Экстренный номер]',
};

const HOTEL = {
  name:    '[Название отеля]',
  stars:   5,
  image:   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  address: '[Адрес], Северный Кипр',
  phone:   '[+90 ...]',
  checkin:  '14:00',
  checkout: '12:00',
  breakfast: '[Ресторан] · 07:30–10:00 · включён в программу',
  desc:    '[Описание отеля — расположение, стиль, что особенного для 100 гостей]',
  amenities: [
    { icon: '🏊', title: 'Бассейн',   note: '08:00–22:00' },
    { icon: '🏖', title: 'Пляж',      note: 'Прямой выход' },
    { icon: '💪', title: 'Фитнес',    note: '07:00–22:00' },
    { icon: '🧖', title: 'СПА',       note: '[Часы работы]' },
    { icon: '🍽', title: 'Ресторан',  note: '[Название]' },
    { icon: '🏛', title: 'Конф-залы', note: '[Описание]' },
    { icon: '📶', title: 'Wi-Fi',     note: 'Бесплатно везде' },
  ],
  tips: [
    'Завтрак с 07:30 до 10:00. Укажите, что вы из группы GCC 2026.',
    'Парковка — бесплатно для гостей.',
    'Такси лучше вызывать через ресепшн.',
    'Сейф в номере — рекомендуем хранить паспорта.',
  ],
};

const TODAY_INDEX = 0;

const DAYS = [
  {
    id: 1, label: 'День 1', date: '2 июня, вторник',
    theme: 'Заезд', color: '#166534',
    activities: [
      { time: '12:00–17:00', title: 'Встреча в аэропорту Эрджан (ECN)', location: 'Аэропорт Эрджан', type: 'transfer', note: 'Табличка «GCC 2026» у выхода из таможни' },
      { time: '[XX:XX]',     title: 'Трансфер в отель', location: '[Название отеля]', type: 'transfer', note: '~45 мин от аэропорта' },
      { time: '14:00',       title: 'Заселение', location: 'Стойка регистрации', type: 'hotel', note: 'Получить бейдж и Welcome-kit' },
      { time: '[XX:XX]',     title: 'Приветственный брифинг', location: '[Зал]', type: 'business', isNow: true, note: 'Программа GCC 2026, команда GreenCode International' },
      { time: '[XX:XX]',     title: 'Welcome dinner', location: '[Ресторан]', type: 'dinner', isNext: true, note: 'Включён в программу' },
    ],
  },
  {
    id: 2, label: 'День 2', date: '3 июня, среда',
    theme: 'Деловой день', color: '#1D4ED8',
    activities: [
      { time: '07:30', title: 'Завтрак', location: '[Ресторан]', type: 'meal' },
      { time: '[XX:XX]', title: 'Открытие GCC 2026', location: '[Главный зал]', type: 'business', isNow: true, note: 'GreenCode International — приветственное слово' },
      { time: '[XX:XX]', title: 'Сессия 1: [Тема]', location: '[Зал]', type: 'business' },
      { time: '[XX:XX]', title: 'Кофе-брейк', location: 'Фойе', type: 'break', isNext: true },
      { time: '[XX:XX]', title: 'Сессия 2: [Тема]', location: '[Зал]', type: 'business' },
      { time: '[XX:XX]', title: 'Деловой обед / нетворкинг', location: '[Зал]', type: 'meal' },
      { time: '[XX:XX]', title: 'Сессия 3: [Тема]', location: '[Зал]', type: 'business' },
      { time: '[XX:XX]', title: 'Кофе-брейк', location: 'Фойе', type: 'break' },
      { time: '[XX:XX]', title: 'Панельная дискуссия', location: '[Главный зал]', type: 'business' },
      { time: '[XX:XX]', title: 'Свободное время', type: 'free' },
      { time: '[XX:XX]', title: 'Ужин', location: '[Ресторан]', type: 'dinner' },
    ],
  },
  {
    id: 3, label: 'День 3', date: '4 июня, четверг',
    theme: 'Опыт и нетворкинг', color: '#D97706',
    activities: [
      { time: '07:30', title: 'Завтрак', location: '[Ресторан]', type: 'meal' },
      { time: '[XX:XX]', title: 'Сбор у главного входа', location: 'Главный вход отеля', type: 'key', note: 'Отправление строго в [XX:XX]' },
      { time: '[XX:XX]', title: 'Экскурсионная программа', location: '[Направление]', type: 'excursion', isNow: true, note: 'Удобная обувь, солнцезащитный крем' },
      { time: '[XX:XX]', title: 'Обед', location: '[Ресторан]', type: 'meal', isNext: true },
      { time: '[XX:XX]', title: 'Свободное время', type: 'free', note: 'Пляж, СПА, прогулка — на ваш выбор' },
      { time: '[XX:XX]', title: 'Гала-ужин GCC 2026', location: '[Площадка]', type: 'gala', note: 'Smart casual' },
    ],
  },
  {
    id: 4, label: 'День 4', date: '5 июня, пятница',
    theme: 'Итоги и отъезд', color: '#6B7280',
    activities: [
      { time: '07:30', title: 'Завтрак', location: '[Ресторан]', type: 'meal' },
      { time: '[XX:XX]', title: 'Итоговая сессия', location: '[Зал]', type: 'business', note: 'Итоги GCC 2026, следующие шаги' },
      { time: '11:00', title: 'Выселение', location: 'Стойка регистрации', type: 'hotel', note: 'Багаж можно оставить у консьержа' },
      { time: '[XX:XX]–[XX:XX]', title: 'Трансферы в аэропорт Эрджан', location: 'Аэропорт Эрджан (ECN)', type: 'transfer', note: 'Расписание по рейсам — вкладка Трансфер' },
    ],
  },
];

const NEARBY = [
  {
    icon: '🏖',
    title: 'Пляж отеля',
    desc: 'Прямой выход к морю, лежаки и зонтики для гостей.',
    distance: '2 мин пешком',
    hours: 'Круглосуточно',
    tip: 'Лежаки занимают рано — лучше выйти до 09:00.',
  },
  {
    icon: '🏰',
    title: 'Замок Кирении',
    desc: 'Средневековый замок XII века прямо на берегу. Яхтенная гавань и вид на море.',
    distance: '~15 мин на такси',
    hours: '09:00–19:00',
    tip: 'Лучшие фото — с набережной перед входом. Вход ~5 EUR.',
  },
  {
    icon: '🍽',
    title: 'Рестораны набережной',
    desc: 'Кипрская кухня: мезе, свежая рыба, халлуми. Много ресторанов у воды.',
    distance: '5–15 мин пешком',
    hours: 'Обед с 12:00, ужин с 18:00',
    tip: 'Спросите ресепшн про любимые места местных — лучше любого путеводителя.',
  },
  {
    icon: '🛒',
    title: 'Супермаркет',
    desc: 'Вода, снэки, местные продукты, сувениры. Принимают карты.',
    distance: '5 мин пешком',
    hours: '08:00–22:00',
    tip: 'Кипрский йогурт и халлуми — must try.',
  },
  {
    icon: '💊',
    title: 'Аптека',
    desc: 'Стандартный ассортимент, международные бренды.',
    distance: '10 мин пешком',
    hours: '09:00–20:00',
    tip: 'Если закрыта — ресепшн подскажет дежурную.',
  },
];

// Список участников/экспонентов — заполнить перед мероприятием
const EXHIBITORS = [
  {
    id: 1,
    company: 'GreenCode International',
    typeLabel: 'Организатор',
    typeColor: '#166534',
    logoEmoji: '🌿',
    desc: 'Организатор Global Corporate Club 2026. По всем вопросам мероприятия — к нам.',
    contact: '[Имя координатора]',
    position: 'Руководитель программы',
    telegram: 'https://t.me/greencode_intl',
    whatsapp: '',
    phone: '[+7 / +90 ...]',
  },
  {
    id: 2,
    company: '[Название отеля]',
    typeLabel: 'Отель',
    typeColor: '#2563EB',
    logoEmoji: '🏨',
    desc: '[Описание: тип, вместимость, преимущества для MICE]',
    contact: '[Имя]',
    position: '[MICE-координатор]',
    telegram: '',
    whatsapp: '',
    phone: '',
  },
  {
    id: 3,
    company: '[Название DMC]',
    typeLabel: 'DMC',
    typeColor: '#0D9488',
    logoEmoji: '🌍',
    desc: '[Направления, специализация, продукты для корпоративных групп]',
    contact: '[Имя]',
    position: '[Должность]',
    telegram: '',
    whatsapp: '',
    phone: '',
  },
  {
    id: 4,
    company: '[Название агентства]',
    typeLabel: 'MICE-агентство',
    typeColor: '#9333EA',
    logoEmoji: '🎯',
    desc: '[Специализация: инсентив / конференции / корпоративные события]',
    contact: '[Имя]',
    position: '[Должность]',
    telegram: '',
    whatsapp: '',
    phone: '',
  },
  {
    id: 5,
    company: '[Название компании]',
    typeLabel: 'Корпоративный клиент',
    typeColor: '#D97706',
    logoEmoji: '🏢',
    desc: '[Отрасль, масштаб корпоративных мероприятий]',
    contact: '[Имя]',
    position: '[Должность]',
    telegram: '',
    whatsapp: '',
    phone: '',
  },
];

const TRANSFERS = {
  info: 'Все трансферы организованы GreenCode International. При изменениях вы получите уведомление.',
  arrival: [
    {
      label: 'Заезд · 2 июня',
      color: '#166534',
      items: [
        { time: '[XX:XX]', title: 'Встреча в аэропорту Эрджан (ECN)', note: 'Табличка «GCC 2026» у выхода из таможни' },
        { time: '[XX:XX]', title: 'Выезд из аэропорта', note: '~45 мин до отеля' },
        { time: '[XX:XX]', title: 'Прибытие в отель', note: 'Трансфер организован для всех рейсов группы' },
      ],
    },
  ],
  departure: [
    {
      label: 'Отъезд · 5 июня',
      color: '#6B7280',
      items: [
        { time: '[XX:XX]', title: 'Первый трансфер в аэропорт', note: 'Выезд от главного входа' },
        { time: '[XX:XX]', title: 'Второй трансфер в аэропорт', note: 'Выезд от главного входа' },
        { time: '[XX:XX]', title: 'Третий трансфер в аэропорт', note: 'Выезд от главного входа' },
      ],
    },
  ],
  contacts: [
    { role: 'Трансферный координатор', name: '[Имя]', phone: '[Телефон]', telegram: '' },
  ],
};

const FAQ = [
  { q: 'Во сколько завтрак?',              a: 'Завтрак с 07:30 до 10:00. Укажите, что вы из группы GCC 2026.' },
  { q: 'Как вызвать трансфер?',            a: 'Расписание — вкладка «Трансфер». Индивидуальное такси — ресепшн или координатор.' },
  { q: 'Где получить бейдж?',              a: 'При заселении на стойке регистрации. Потеряли — к координатору GreenCode.' },
  { q: 'Есть ли Wi-Fi в конференц-зале?',  a: 'Да. Сеть и пароль — на главном экране (нажмите на строку Wi-Fi).' },
  { q: 'Что входит в программу?',          a: 'Проживание, завтраки, деловая программа, кофе-брейки, групповые ужины и экскурсия Дня 3.' },
  { q: 'Как связаться с организаторами?',  a: 'Кнопка 🆘 внизу экрана — мгновенная связь с командой GreenCode.' },
  { q: 'Можно ли выйти в город?',          a: 'Да, в свободное время. Рекомендации — вкладка «Рядом».' },
  { q: 'Что взять на экскурсию (День 3)?', a: 'Удобная обувь, солнцезащитный крем, головной убор. Вода будет. Сбор — см. программу.' },
  { q: 'Дресс-код на гала-ужине?',         a: 'Smart casual. Детали уточним накануне через уведомление.' },
  { q: 'Какие розетки на Кипре?',          a: 'Тип G (три прямоугольных штыря, британский стандарт). Адаптер — на ресепшн.' },
];

// time: 'morning' (6-11) | 'afternoon' (12-17) | 'evening' (17-22) | 'any'
const PRACTICAL = [
  { icon: '☀️', title: 'Доброе утро',    text: 'Завтрак с 07:30. Столы зарезервированы — скажите, что вы из группы GCC 2026.',            time: 'morning'   },
  { icon: '📋', title: 'Программа дня',  text: 'Загляните во вкладку «Программа» — там актуальное расписание и все изменения.',             time: 'morning'   },
  { icon: '🤝', title: 'Нетворкинг',     text: 'Загляните во вкладку «Участники» — найдите нужных людей и напишите им напрямую.',           time: 'afternoon' },
  { icon: '🏖', title: 'Свободное время',text: 'Пляж в 2 минутах от отеля. Лежаки занимают рано — лучше сразу после обеда.',               time: 'afternoon' },
  { icon: '🍽', title: 'Ужин',           text: 'Рестораны набережной — 5–15 мин пешком. Спросите ресепшн про лучшие места.',               time: 'evening'   },
  { icon: '🌅', title: 'Вечер на Кипре', text: 'Закат на набережной Кирении — один из лучших на Средиземноморье. Стоит прогуляться.',       time: 'evening'   },
  { icon: '🌡', title: 'Погода',         text: '+28–32°C, солнечно. Солнцезащитный крем обязателен.',                                       time: 'any'       },
  { icon: '💳', title: 'Деньги',         text: 'TRY и евро, карты везде. Банкомат в отеле.',                                                time: 'any'       },
  { icon: '🔌', title: 'Розетки',        text: 'Тип G (три прямоугольных штыря, британский стандарт). Адаптер — на ресепшн.',               time: 'any'       },
  { icon: '🚕', title: 'Такси',          text: 'Через ресепшн — быстро. Также Uber и Bolt в Кирении.',                                      time: 'any'       },
];

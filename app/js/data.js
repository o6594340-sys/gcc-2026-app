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
  emergency: '[Экстренный номер]',
};

const HOTEL = {
  name:    'Elexus Hotel & Resort & SPA',
  stars:   5,
  image:   'Elexus hotel.jpeg',
  address: 'Çatalköy, Kyrenia (Girne), Северный Кипр',
  phone:   '+90 392 444 0 650',
  checkin:  '14:00',
  checkout: '12:00',
  breakfast: 'Ресторан Reflection · шведский стол · включён в программу',
  desc:    'Курортный комплекс в районе Чаталкёй, в 10 км от центра Кирении. На территории — песчаный пляж с пирсом, открытые и крытый бассейны, аквапарк, СПА-центр Zoya Spa & Wellness, тренажёрный зал, казино и несколько ресторанов.',
  amenities: [
    { icon: '🍳', title: 'Завтрак',       note: 'Ресторан Reflection · шведский стол' },
    { icon: '🏊', title: 'Бассейны',      note: 'Несколько открытых + крытый с подогревом' },
    { icon: '🌊', title: 'Аквапарк',      note: 'По сезонному расписанию' },
    { icon: '🏖', title: 'Пляж',          note: 'Собственный песчаный · лежаки и полотенца бесплатно' },
    { icon: '🧖', title: 'Zoya Spa',      note: 'Хаммам, сауны, процедуры — по записи, за доп. плату' },
    { icon: '💪', title: 'Тренажёрный зал', note: 'Для гостей отеля' },
    { icon: '🎰', title: 'Казино',        note: 'На территории отеля' },
    { icon: '📶', title: 'Wi-Fi',         note: 'Бесплатно везде' },
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

const TODAY_INDEX = 0;

const DAYS = [
  {
    id: 1, label: '2 июня', date: '2 июня, вторник',
    theme: 'Заезд', color: '#6E00FF', pillar: 'Power of Community',
    weather: { icon: '☀️', temp: '+29°C', note: 'ясно' },
    activities: [
      { time: '[XX:XX]',     title: 'Прилёт. Встреча в аэропорту Эрджан (ECN)', location: 'Аэропорт Эрджан', type: 'transfer', note: 'Табличка «GCC 2026» у выхода из таможни' },
      { time: '[XX:XX]',     title: 'Трансфер в отель', location: 'Elexus Hotel & Resort & SPA', type: 'transfer', note: '~45 мин от аэропорта' },
      { time: '14:00',       title: 'Заселение', location: 'Стойка регистрации', type: 'hotel', note: 'Получить бейдж и Welcome-kit' },
      { time: '18:00–21:30', title: 'Ужин', location: 'Ресторан Reflection', type: 'dinner', note: 'Включён в программу' },
      { time: '22:00–02:00', title: 'After-party', location: 'The Gazino', type: 'gala' },
    ],
  },
  {
    id: 2, label: '3 июня', date: '3 июня, среда',
    theme: 'Воркшоп & Экскурсия', color: '#C200D4', pillar: 'Power of Experience',
    weather: { icon: '☀️', temp: '+30°C', note: 'ясно' },
    activities: [
      { time: '07:00',       title: 'Завтрак', location: 'Ресторан Reflection', type: 'meal' },
      { time: '10:00–13:00', title: 'Воркшоп', location: 'Elexus 1', type: 'business', note: 'Деловая программа GCC 2026' },
      { time: '13:00–14:30', title: 'Обед', location: 'Ресторан Reflection', type: 'meal' },
      { time: '14:30',       title: 'Сбор в лобби · отправление на экскурсию', location: 'Лобби отеля', type: 'transfer', note: 'Удобная обувь, солнцезащитный крем, головной убор' },
      { time: '14:30–19:00', title: 'Экскурсионная программа', location: 'Кирения', type: 'excursion' },
      { time: '19:30–00:00', title: 'Пляжная вечеринка', location: 'Mia Beach', type: 'gala', note: 'Купальник, лёгкая одежда' },
      { time: '00:00–02:00', title: 'After-party', location: 'The Gazino', type: 'dinner' },
    ],
  },
  {
    id: 3, label: '4 июня', date: '4 июня, четверг',
    theme: 'Воркшоп & Гала-ужин', color: '#0077FF', pillar: 'Power of Ideas',
    weather: { icon: '⛅', temp: '+28°C', note: 'переменная облачность' },
    activities: [
      { time: '07:00–10:00', title: 'Завтрак', location: 'Ресторан Reflection', type: 'meal' },
      { time: '10:00–13:00', title: 'Воркшоп', location: 'Elexus 1', type: 'business', note: 'Деловая программа GCC 2026' },
      { time: '13:00–14:00', title: 'Обед', location: 'Ресторан Reflection', type: 'meal' },
      { time: '14:00–16:00', title: 'Воркшоп', location: 'Elexus 1', type: 'business' },
      { time: '16:00–20:00', title: 'Свободное время', type: 'free', note: 'СПА, пляж, бассейн — на ваш выбор' },
      { time: '20:00–00:00', title: 'Гала-ужин GCC 2026', location: 'Elexus 3', type: 'gala', note: 'Smart casual' },
      { time: '00:00–02:00', title: 'After-party', location: 'The Gazino', type: 'dinner' },
    ],
  },
  {
    id: 4, label: '5 июня', date: '5 июня, пятница',
    theme: 'Отъезд', color: '#3D2E6B', pillar: null,
    weather: { icon: '☀️', temp: '+29°C', note: 'ясно' },
    activities: [
      { time: '07:00–10:00', title: 'Завтрак', location: 'Ресторан Reflection', type: 'meal' },
      { time: '12:00',       title: 'Выезд из отеля', location: 'Стойка регистрации', type: 'hotel', note: 'Багаж можно оставить у консьержа до отъезда' },
      { time: '[XX:XX]',     title: 'Трансферы в аэропорт Эрджан', location: 'Аэропорт Эрджан (ECN)', type: 'transfer', note: 'Расписание по рейсам — уточните у координатора' },
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
    tip: 'Рекомендуем занимать места до 09:00.',
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
  { id: 24, company: 'Concorde De Luxe Resort',       flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.concordehotels.com.tr/en-US',                                                                             contact: 'Aziza Donmez',                            phone: '', telegram: '', whatsapp: '', desc: 'Тематический пятизвёздочный resort на первой береговой линии Лары, архитектурно выполненный в форме самолёта Конкорд, с прямым выходом на пляж с Голубым флагом. 380 номеров с балконами, 11 ресторанов и конференц-залы для мероприятий.' },
  { id:  2, company: 'Conrad Istanbul Bosphorus',    flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.hilton.com/en/hotels/isthcci-conrad-istanbul-bosphorus/',                                               contact: 'Işil Hünler',                             phone: '', telegram: '', whatsapp: '', desc: 'Пятизвёздочный отель на берегу Босфора с панорамными видами на пролив и исторические мосты Стамбула. Spa Soul, крытый и открытый бассейны, теннисный клуб и рестораны с авторской кухней.' },
  { id:  3, company: 'Crowne Plaza Belgrade',        flag: '🇷🇸', logoEmoji: '🏨', website: 'https://www.ihg.com/crowneplaza/hotels/us/en/belgrade/begcp/hoteldetail',                                           contact: 'Martina Lazic',                           phone: '', telegram: '', whatsapp: '', desc: 'Флагманский отель в деловом районе Нового Белграда, в 15 минутах от аэропорта и в пешей доступности от Stark Arena. Крупнейший в городе бальный зал, 14 конференц-залов и ресторан Prime с авторской сербской кухней.' },
  { id:  4, company: 'CVK Hotels & Resorts',         flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.cvkhotelsandresorts.com/',                                                                               contact: 'Timur Tajiyev',                           phone: '', telegram: '', whatsapp: '', desc: 'Турецкая luxury-сеть в центре Стамбула: флагман CVK Park Bosphorus Hotel — крупнейший гостиничный инвестиционный проект в истории города. 68 апартаментов-люксов, безупречный spa и центральное расположение.' },
  { id:  5, company: 'Doria Hotel Bodrum',           flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.doriahotelbodrum.com/en-US/',                                                                            contact: 'İpek Gaye Sungur',                        phone: '', telegram: '', whatsapp: '', desc: 'Boutique-отель с видом на бухту Битез в Бодруме, работающий круглый год и отражающий живой дух Эгейского моря в каждой детали. Современный дизайн и элегантная простота в одном из самых живописных мест Турции.' },
  { id:  6, company: 'Ducale Lara',                  flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.ducalehotels.com/',                                                                                      contact: 'Fırat Sakarya',                           phone: '', telegram: '', whatsapp: '', desc: 'Уникальный Ultra All Inclusive отель в Анталье, где на берегу Средиземного моря воссозданы площадь Сан-Марко, Дворец Дожей и мост Риальто из Венеции. Масштабный архитектурный ансамбль, поражающий деталировкой и атмосферой.' },
  { id:  7, company: 'Ela Excellence Resort Belek',  flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.elahotels.com/en/our-hotels/ela-excellence-resort-belek/',                                              contact: 'Seda Gürgen',                             phone: '', telegram: '', whatsapp: '', desc: 'Пятизвёздочный resort в первой береговой линии Белека с номерами в современном минималистичном стиле у самого моря. Длинный песчаный пляж, открытые бассейны, аквапарк и рестораны с изысканной кухней для отдыха любого возраста.' },
  { id:  8, company: 'Ethno Hotels',                 flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.ethnohotels.com/en',                                                                                     contact: 'Mariia Andrieieva, Şeyda Kara',           phone: '', telegram: '', whatsapp: '', desc: 'Культурный resort-концепт в Белеке, где традиции, ритуалы и истории разных народов мира соединяются в живую мозаику. Ethno Culture превращает каждое пребывание в уникальное путешествие между цивилизациями.' },
  { id:  9, company: 'Gloria Hotels & Resorts',      flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.gloria.com.tr/en/',                                                                                      contact: 'Ali Doğuş Tanyıldız, Gökhan Gümüşdede',  phone: '', telegram: '', whatsapp: '', desc: 'Легендарная гостиничная группа Белека с историей с 1997 года: Gloria Golf Resort, Verde Resort и Serenity Resort. Идеальное сочетание luxury-отдыха, гольфа мирового уровня и семейного сервиса на Средиземном море.' },
  { id: 10, company: 'KHG (Nirvana Hotels)',          flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.nirvanahotels.com.tr/en/',                                                                               contact: 'Merve Demir',                             phone: '', telegram: '', whatsapp: '', desc: 'Группа KHG управляет тремя концептуальными отелями бренда Nirvana: Mediterranean Excellence в сосновом лесу, Cosmopolitan с городским ритмом и Dolce Vita с приватной бухтой у Таврских гор. Три разных мира отдыха — одна философия сервиса.' },
  { id: 11, company: 'Le Meridien Istanbul Etiler',  flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.marriott.com/en-us/hotels/istmd-le-meridien-istanbul-etiler/overview/',                                  contact: 'Meltem Doğanok',                          phone: '', telegram: '', whatsapp: '', desc: '34-этажный 5-звёздочный отель в Стамбуле с панорамными видами на Босфор и мосты города из каждого из 255 номеров. Более 2 500 м² event-пространств, турецкий хаммам и открытый бассейн.' },
  { id: 25, company: 'Limak Lara Deluxe Hotel & Resort', flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.limakhotels.com/lara',                                                                                 contact: 'Nazlı Kağan',                             phone: '', telegram: '', whatsapp: '', desc: 'Курортный отель в Лара-Кунду с архитектурой в азиатском стиле, частным пляжем с голубым флагом и обширной конгресс-инфраструктурой. 604 номера с видом на Средиземное море, семь ресторанов и Aster Spa.' },
  { id: 26, company: "Lord's Palace Hotel",            flag: '🇹🇷', logoEmoji: '🏨', website: 'https://lordspalace.com/en/',                                                                                        contact: 'Gonca Saltik',                            phone: '', telegram: '', whatsapp: '', desc: 'Пятизвёздочный отель Casino & SPA на берегу Средиземного моря в Анталье с 250 номерами с видами на море, горы и город. Rooftop-терраса с бассейном, современный спа-центр и конференц-залы для корпоративных групп.' },
  { id: 12, company: 'MATCH POINT',                  flag: '',    logoEmoji: '🤝', website: 'https://matchpoints.ru/english',                                                                                     contact: 'Daria Ignatieva',                         phone: '', telegram: '', whatsapp: '', desc: 'Маркетинговое представительство ведущих DMC в Омане, Катаре, Японии, Вьетнаме и Китае. Надёжный партнёр для организации MICE-мероприятий в наиболее востребованных направлениях Ближнего Востока и Азии.' },
  { id: 27, company: 'Merit Park Hotel',               flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.merithotels.com/en/merit-park-hotel',                                                                    contact: 'Gürkan Cihan',                            phone: '', telegram: '', whatsapp: '', desc: 'Пятизвёздочный resort на набережной Кирении — флагманский объект группы Merit Hotels на Северном Кипре, с casino и полным спа-комплексом. 273 реновированных номера и конференц-залы для MICE-мероприятий.' },
  { id: 13, company: 'NG Hotels',                    flag: '🇹🇷', logoEmoji: '🏨', website: 'https://www.nghotels.com.tr/en/',                                                                                    contact: 'Salih Aygün, Mert Gunur Bertan',          phone: '', telegram: '', whatsapp: '', desc: 'Один из ведущих luxury-брендов Турции: курорты NG Sapanca, NG Enjoy, NG Afyon и NG Phaselis Bay — каждый с уникальной концепцией и природным окружением. Изысканная гастрономия, wellness и high-end event-инфраструктура.' },
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
  info: 'Все трансферы организованы GreenCode International. При изменениях вы получите уведомление.',
  arrival: [
    {
      label: 'Заезд · 2 июня',
      color: '#D4A838',
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
  { q: 'Во сколько завтрак?',              a: 'Завтрак в ресторане Reflection — 07:00–10:00, шведский стол, включён в программу. При входе укажите, что вы в составе группы GCC 2026.' },
  { q: 'Как вызвать трансфер?',            a: 'Расписание трансферов — во вкладке «Локация». По индивидуальным вопросам обращайтесь к координатору или на ресепшн.' },
  { q: 'Где получить бейдж?',              a: 'Бейдж и Welcome-kit выдаются при заселении на стойке регистрации. По любым вопросам — координатор GreenCode.' },
  { q: 'Есть ли Wi-Fi в конференц-зале?',  a: 'Да. Название сети и пароль — на главном экране приложения.' },
  { q: 'Что входит в программу?',          a: 'Проживание, завтраки, деловая программа, кофе-брейки, групповые ужины и экскурсия 3 июня.' },
  { q: 'Как связаться с организаторами?',  a: 'Кнопка связи внизу экрана — прямой контакт с командой GreenCode International.' },
  { q: 'Можно ли выйти в город?',          a: 'Да, в свободное время — Кирения к вашим услугам. Подборка мест и расстояния — во вкладке «Локация».' },
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
  { icon: '👟', title: 'Экскурсия сегодня',     text: 'Сбор в лобби в 14:30. Удобная обувь обязательна.',                                        time: 'morning',   until: '14:30', days: [2] },
  { icon: '🧴', title: 'Крем и головной убор',  text: '+30°C. SPF 30+.',                                                                          time: 'morning',   until: '14:30', days: [2] },
  { icon: '👙', title: 'Пляжная вечеринка',     text: 'Mia Beach.',                                                                               time: 'afternoon', until: '19:30', days: [2] },
  { icon: '👔', title: 'Dress code',             text: 'Casual и удобная обувь. Начало в 19:30.',                                                  time: 'afternoon', until: '19:30', days: [2] },

  // День 3 — воркшоп + гала-ужин
  { icon: '👔', title: 'Dress code',             text: 'Smart casual. Гала-ужин в 20:00, зал Elexus 3.',                                          time: 'morning',   until: '20:00', days: [3] },
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
  duration:     '~3 часа',
  meetingPoint: 'Главный вход отеля',
  meetingTime:  '[XX:XX]',
  formUrl:      'https://docs.google.com/forms/d/e/1FAIpQLSf3EkTWq9xR-tSLXcSteLA-xxfgd9yATEihu58TWHk0-vdDTg/viewform',
  desc:         'Выездная экскурсия в Кирению (Girne) — главный исторический город Северного Кипра. От отеля 20–30 минут на комфортабельном транспорте.',

  program: [
    { time: '[XX:XX]',        title: 'Сбор у главного входа отеля',       note: 'Отправление строго по расписанию' },
    { time: '[XX:XX]',        title: 'Переезд в Кирению',                  note: '~20–30 мин от отеля' },
    { time: '[XX:XX]–[XX:XX]', title: 'Киренийский замок',                 note: '~40–60 мин с учётом входа и фотостопов' },
    { time: '[XX:XX]',        title: 'Прогулка по набережной старой гавани', note: 'Узкие улочки исторического центра' },
    { time: '[XX:XX]',        title: 'Свободное время · 20–25 мин',        note: 'Кофе с видом на море, фото, сувениры' },
    { time: '[XX:XX]',        title: 'Возвращение в отель',                note: '~20–30 мин' },
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

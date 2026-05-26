# Global Corporate Club 2026 — App

## Что это
Telegram Mini App для корпоративного инсентив-тура GCC 2026.
Организатор: **GreenCode International**. Мероприятие: 2–5 июня 2026, Северный Кипр, ~100 участников.
Аудитория: отели, DMC, MICE-агентства, корпоративные клиенты.
Деплой: https://o6594340-sys.github.io/gcc-2026-app/
Репозиторий: https://github.com/o6594340-sys/gcc-2026-app.git

## Структура проекта
```
app/
  index.html         — разметка, 5 вкладок
  manifest.json      — PWA манифест
  css/main.css       — дизайн-система, бренд-палитра GreenCode (лайм #6B9E2A)
  js/data.js         — все данные (EVENT, DAYS, HOTEL, NEARBY, CUISINE,
                       EXHIBITORS, TRANSFERS, FAQ, PRACTICAL, EXCURSION)
  js/app.js          — вся логика (App IIFE)
  Elexus hotel.jpeg  — фото отеля (HOTEL.image)
  castle.jpg         — Киренийский замок
  Kirenia_old port.jpg — Старая гавань Кирении (имя с пробелом!)
  embankment.jpg     — Набережная Кирении
  abbatstvo.jpg      — Аббатство Беллапаис
  northen Cyprus.jpg — Северный Кипр
  Northen Cyprus 2.jpg — Северный Кипр
```

## Стек
- Чистый HTML/CSS/JS, без фреймворков и сборщиков
- Telegram Web App SDK (`window.Telegram.WebApp`)
- localStorage с префиксом `gcc_` для override данных (safe wrapper `ls` для iOS Private Browsing)
- Supabase (Realtime Database) — чат участников, план Pro (500 соединений)
- PWA: manifest + Service Worker (`app/sw.js`, cache-first, версия `gcc2026-v{version}`)

## 6 вкладок (финальные, не менять без причины)
Порядок в nav-баре: Chat → Today → Program → Location → Excursion → Exhibitors

| tab id | label | что внутри |
|--------|-------|-----------|
| `chat` | 💬 Чат | групповой чат (первый в баре) |
| `today` | ☀️ Сегодня | до 2 июня — обратный отсчёт; с 2 июня — герой-блок, сейчас/следующее, wifi, программа дня, совет |
| `program` | 📅 Программа | полная программа по дням |
| `location` | 🏨 Локация | отель + кухня + трансферы + рядом с отелем (всё в одном) |
| `excursion` | 🏛 Экскурсия | программа, история Кирении, советы, фототочки, галерея |
| `exhibitors` | 🤝 Экспоненты | карточки 28 участников с контактами (без фильтров) |

## Ключевые соглашения

### Палитра (бренд GreenCode International)
Источник: сайт greencode.travel — лаймово-авокадный зелёный на тёплом кремовом.
- `--accent: #6B9E2A` — основной лайм (кнопки, активные табы, точки)
- `--accent-dark: #4A7A15` — тёмный лайм (фон хедера)
- `--accent-light: #F0F7E6` — светлый лайм (подсветки, фоны карточек)
- `--bg: #F7F4EF` — тёплый кремовый фон (не холодная мята)
- `--bg-secondary: #EDE9E2` — вторичный тёплый фон
- `--text: #2A1E14` — тёплый тёмно-коричневый текст
- Хедер: `--header-bg` устанавливается JS через `applyGradient()` = brand.color из data.js
- `brand.color` в data.js = `#6B9E2A` (ВАЖНО: JS перезаписывает CSS-переменные при старте)
- Герои (today-hero, excursion-hero): `linear-gradient(135deg,#9DD645 0%,#8DC63F 45%,#5A8A1F 100%)` + `${day.color}` на 80% для «сегодня»

### Анимированные волны в хедере
SVG `.header-waves` внутри `<header>` — 3 пути, stroke rgba(196,150,122,0.28), 18s бесшовный цикл translateX(-50%). Header имеет `overflow: hidden`.

### Заголовок (header)
Текстовый бренд без логотипа:
- `.header-organizer` — "GreenCode International" (10px, uppercase, opacity 0.65)
- `.header-title` — "Global Corporate Club 2026"
- `.header-sub` — "2–5 июня · Северный Кипр"

### Цвета типов событий (TYPE_COLOR в app.js)
business=синий, meal=оранжевый, dinner=фиолетовый, gala=розовый,
excursion=зелёный, transfer=серый, break=коричневый, free=зелёный,
hotel=голубой, key=красный, arrival=голубой

### Советы по времени (PRACTICAL в data.js)
Поле `time`: `morning` (6–12), `afternoon` (12–18), `evening` (18–23), `any` (всегда)

### Текущий день (TODAY_INDEX)
- Вычисляется автоматически функцией `getTodayIndex()` в data.js по реальной дате
- Переключение в **02:00** (не в 00:00) — до 02:00 приложение считает текущим предыдущий день
- До мероприятия → день 1 (2 июня); после → день 4 (5 июня)
- Вручную менять `TODAY_INDEX` не нужно
- Всё через `Intl.DateTimeFormat` с `timeZone: 'Asia/Nicosia'` (UTC+3)

### Обратный отсчёт (до 2 июня)
- `isPreEvent()` в app.js — возвращает true до 2 июня 02:00 по Кипру
- `renderCountdown()` — экран с таймером дней/часов/минут/секунд
- Целевое время: **2 июня 15:00 по Кипру** (основной прилёт групп) = `2026-06-02T12:00:00Z`
- Обновляется через `setInterval` каждую секунду, хранится в `state.countdownInterval`
- При переходе на другую вкладку интервал очищается
- Поддерживает RU/EN язык

### Программа мероприятия — dress codes
- 2 июня: ужин — Casual, after-party — Casual
- 3 июня: воркшоп — Business casual, after-party — Casual
- 4 июня: воркшоп — Business casual, гала-ужин — Smart casual, after-party — Casual
- Прилёт и трансферы 2 июня: время `—`, note «Согласно полётным данным»

### Данные-заглушки (ещё не заполнены)
- `[XX:XX]` — время части событий в программе (ждём от организатора)
- WiFi пароль `welcome2gcc` — подтверждён организатором как реальный
- Имя/телефон координатора трансфера
- Телефоны/Telegram экспонентов (поля `phone`, `telegram`, `whatsapp` пустые — контактов более не будет)
- Emergency: Малик `+905303850111`; кнопка 📞 вызывает `EVENT.organizer.telegram` (когда организатор даст WhatsApp — заменить на `https://wa.me/НОМЕР`)

### Северный Кипр — важно
Никаких ссылок на греческую часть, Южный Кипр, Лимасол, Командарию.
История — только северная: финикийцы, лузиньяны, венецианцы, османы, британцы.
Вино — только Зивания (северокипрская), не Командария.

### Тон
Аудитория — VIP (отельеры, MICE-агентства, корпоративные клиенты).
Никаких клише: "один из лучших", "иконичный", "открыточный кадр", "в полной мере",
"свежайший", "Средиземноморье в его лучшем проявлении", "пастухи-партизаны".
Конкретные факты вместо общих фраз (например: "320 солнечных дней в году").

## Что НЕ трогать
- `mini-app/app/` — это ДРУГОЙ проект (Пекинский форум), не связан с GCC 2026. Не изменять.
- Программу мероприятия не комментировать и не корректировать — мы не организатор.

## Чат (Supabase)
- Конфиг: `SUPABASE_URL` и `SUPABASE_KEY` в начале `app/js/app.js`
- Проект: `jhtdcddqjuaqdksdrdhy.supabase.co` (Frankfurt), план Pro (500 соединений)
- Таблица `messages`: id (bigint), user_id, user_name, text, created_at, reply_to_id, reply_to_text, reply_to_name
- Таблица `reactions`: id (bigint), message_id (bigint), user_id (text), emoji (text), created_at; UNIQUE(message_id, user_id, emoji)
- RLS включён на обеих таблицах: политики `read_all` (SELECT), `insert_all` (INSERT), `delete_all` (DELETE)
- Realtime включён через Publications → supabase_realtime (INSERT + DELETE на `messages` и `reactions`)
- Имя пользователя: берётся из `tgUser.first_name` или из localStorage (`gcc_chat_name`)
- При первом входе без Telegram-данных показывается экран ввода имени (переведён на EN)
- FAB-кнопка помощи: 📞 (вызов организатора/экстренный)
- Ответ на сообщение (reply): кнопка ↩ у каждого сообщения, цитата отображается внутри пузырька
- Удаление сообщений: кнопка ✕ (красная) — только для админа, синхронизируется у всех через DELETE event
- Реакции: 👍 ❤️ 😂 🔥 👏 😮 — кнопка ＋ под каждым сообщением, пиклер поверх экрана, realtime-синхронизация
- Лимит загрузки: последние 200 сообщений; лимит реакций: 10000 на загрузку
- Восстановление соединения: `visibilitychange` — переподписка на все каналы при возврате в foreground

## Админ-доступ
- `ADMIN_IDS = ['1220760254']` в app.js (Telegram ID Ольги) — поддерживает несколько ID
- Активация в браузере: открыть URL с `?admin=gcc2026` один раз → флаг `gcc_is_admin=1` сохраняется в localStorage навсегда
- Полный URL для активации: `https://o6594340-sys.github.io/gcc-2026-app/app/index.html?admin=gcc2026`
- Функции только для админа: создание голосований (🗳), удаление любых сообщений (✕)

## Экспоненты (вкладка Экспоненты)
- 28 компаний, отсортированы в английском алфавитном порядке
- Структура записи: `{ id, company, flag, logoEmoji, website, contact, phone, telegram, whatsapp, desc }`
- `flag` — эмодзи флага страны (🇹🇷 Турция, 🇷🇸 Сербия, 🇪🇬 Египет, 🇬🇪 Грузия, '' — без флага для MATCH POINT)
- `website` — официальный сайт; если заполнен, название компании становится кликабельной ссылкой (зелёный цвет + ↗)
- `contact` — до 2 имён представителей (из файла Sellers final.xlsx, лист MARINA)
- `desc` — 2 предложения по-русски
- Телефоны/мессенджеры пустые — заполнить когда организатор пришлёт
- IDs не строго последовательны (4 новых = id 24–27), но массив в алфавитном порядке — рендер идёт по порядку массива

## Экскурсия (вкладка Экскурсия)
- Кнопка **«Записаться на экскурсию →»** — зелёная, после описания, перед программой
- URL формы хранится в `EXCURSION.formUrl` в data.js — менять там, если организатор перенесёт форму на свой аккаунт
- Блок «Что взять / помнить» (tips) — убран из рендера, данные в data.js остались
- Телефон отеля: `+90 392 444 0 650` — прописан в `EVENT.hotel.phone` и `HOTEL.phone`

## Планы (ещё не сделано)
- [ ] Заполнить `[XX:XX]` времена в программе (ждём от организатора)
- [ ] Имя/телефон координатора трансфера
- [ ] Перенести Google Form экскурсии на аккаунт организатора (обновить `EXCURSION.formUrl`)
- [ ] Заменить кнопку помощи на WhatsApp организатора (когда решат чей номер)
- [ ] Telegram-бот (Python): /start → открывает Mini App

## Сделано (для истории)
- [x] Service Worker для офлайн-режима (`app/sw.js`)
- [x] Обратный отсчёт до 2 июня 15:00 на вкладке «Сегодня»
- [x] Реакции в чате (👍❤️😂🔥👏😮) с realtime-синхронизацией
- [x] Перевод на английский: FAQ, экспоненты, экскурсия, экран имени в чате
- [x] Timezone Cyprus (Asia/Nicosia) везде через Intl.DateTimeFormat
- [x] Safe localStorage (iOS Private Browsing)
- [x] isAdmin() с кешем, URL param strips after activation
- [x] WiFi пароль `welcome2gcc` подтверждён
- [x] Emergency: Малик +905303850111

## Стиль кода
- Функции рендеринга: `render{TabName}()` возвращают HTML строку в `document.getElementById('tab-{name}')`
- Данные всегда через геттеры: `getEvent()`, `getDays()`, `getHotel()`, `getExhibitors()`
- Haptic feedback на каждое взаимодействие: `haptic('light')`
- Галерея поддерживает оба формата: строка-путь и `{src, caption}`

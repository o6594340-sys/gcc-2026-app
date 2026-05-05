# Global Corporate Club 2026 — App

## Что это
Telegram Mini App для корпоративного инсентив-тура GCC 2026.
Организатор: **GreenCode International**. Мероприятие: 2–5 июня 2026, Северный Кипр, ~100 участников.
Аудитория: отели, DMC, MICE-агентства, корпоративные клиенты.

## Структура проекта
```
app/
  index.html       — разметка, 4 вкладки
  manifest.json    — PWA манифест
  css/main.css     — дизайн-система, зелёная тема #166534
  js/data.js       — все данные (EVENT, DAYS, HOTEL, NEARBY, EXHIBITORS, TRANSFERS, FAQ, PRACTICAL)
  js/app.js        — вся логика (App IIFE)
```

## Стек
- Чистый HTML/CSS/JS, без фреймворков и сборщиков
- Telegram Web App SDK (`window.Telegram.WebApp`)
- localStorage с префиксом `gcc_` для override данных
- PWA (manifest + service worker планируется)

## 4 вкладки (финальные, не менять без причины)
| tab id | label | что внутри |
|--------|-------|-----------|
| `today` | ☀️ Сегодня | герой-блок, сейчас/следующее, wifi, программа дня, совет |
| `program` | 📅 Программа | полная программа по дням |
| `location` | 🏨 Локация | отель + трансферы + рядом с отелем (всё в одном) |
| `exhibitors` | 🤝 Участники | карточки с фильтрами по типу |

## Ключевые соглашения

### Цвета типов событий (TYPE_COLOR в app.js)
business=синий, meal=оранжевый, dinner=фиолетовый, gala=розовый,
excursion=зелёный, transfer=серый, break=коричневый, free=зелёный,
hotel=голубой, key=красный, arrival=голубой

### Советы по времени (PRACTICAL в data.js)
Поле `time`: `morning` (6–12), `afternoon` (12–18), `evening` (18–23), `any` (всегда)

### Данные-заглушки
В data.js много `[placeholder]` значений — их заполнит пользователь, когда будет реальная информация об отеле, программе, участниках.

## Что НЕ трогать
- `mini-app/app/` — это ДРУГОЙ проект (Пекинский форум), не связан с GCC 2026. Не изменять.

## Планы (ещё не сделано)
- [ ] Telegram-бот (Python): /start → открывает Mini App, FAQ по ключевым словам
- [ ] Деплой на GitHub Pages или Vercel (нужен HTTPS для Telegram)
- [ ] Заполнить реальные данные в data.js
- [ ] Service Worker для офлайн-режима

## Стиль кода
- Функции рендеринга: `render{TabName}()` возвращают HTML строку в `document.getElementById('tab-{name}')`
- Данные всегда через геттеры: `getEvent()`, `getDays()`, `getHotel()`, `getExhibitors()`
- Haptic feedback на каждое взаимодействие: `haptic('light')`

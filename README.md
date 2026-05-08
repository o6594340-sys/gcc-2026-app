# Global Corporate Club 2026

Telegram Mini App для корпоративного инсентив-тура **GCC 2026**.

**Организатор:** GreenCode International  
**Мероприятие:** 2–5 июня 2026, Elexus Hotel & Resort & SPA, Северный Кипр (~100 участников)  
**Аудитория:** отели, DMC, MICE-агентства, корпоративные клиенты  
**Деплой:** https://o6594340-sys.github.io/gcc-2026-app/

---

## Структура

```
app/
  index.html         — разметка, 5 вкладок
  manifest.json      — PWA манифест
  css/main.css       — дизайн-система, зелёная тема #166534
  js/data.js         — все данные (EVENT, DAYS, HOTEL, NEARBY, CUISINE,
                       EXHIBITORS, TRANSFERS, FAQ, PRACTICAL, EXCURSION)
  js/app.js          — вся логика (App IIFE)
  Elexus hotel.jpeg  — фото отеля
  castle.jpg         — Киренийский замок
  Kirenia_old port.jpg — Старая гавань Кирении
  embankment.jpg     — Набережная Кирении
  abbatstvo.jpg      — Аббатство Беллапаис
  northen Cyprus.jpg — Северный Кипр
  Northen Cyprus 2.jpg — Северный Кипр
index.html           — редирект на app/index.html (для GitHub Pages)
```

## Стек

- Чистый HTML/CSS/JS — без фреймворков и сборщиков
- [Telegram Web App SDK](https://core.telegram.org/bots/webapps)
- `localStorage` с префиксом `gcc_` для override данных
- PWA (`manifest.json`, service worker запланирован)

## Вкладки

| ID | Лейбл | Содержимое |
|----|-------|------------|
| `today` | ☀️ Сегодня | Герой-блок, текущее/следующее событие, WiFi, программа дня, совет |
| `program` | 📅 Программа | Полная программа по дням |
| `location` | 🏨 Локация | Отель, кухня, трансферы, достопримечательности рядом |
| `excursion` | 🏛 Экскурсия | Программа экскурсии, история Кирении, советы, фототочки, галерея |
| `exhibitors` | 🤝 Экспоненты | Карточки участников с контактами |

## Деплой

Приложение задеплоено на **GitHub Pages**.  
Корневой `index.html` перенаправляет на `app/index.html` через JS.  
Для работы Telegram Mini App обязателен HTTPS — GitHub Pages это обеспечивает.

## Что ещё запланировано

- [ ] Telegram-бот (Python): `/start` открывает Mini App, FAQ по ключевым словам
- [ ] Service Worker для офлайн-режима
- [ ] Заполнить реальные данные: WiFi, телефоны, экспоненты (10 компаний)
- [ ] Заполнить время событий в программе (`[XX:XX]` → реальное время)

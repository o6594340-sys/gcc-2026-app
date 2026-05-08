# Global Corporate Club 2026

Telegram Mini App для корпоративного инсентив-тура **GCC 2026**.

**Организатор:** GreenCode International  
**Мероприятие:** 2–5 июня 2026, Северный Кипр (~100 участников)  
**Аудитория:** отели, DMC, MICE-агентства, корпоративные клиенты

---

## Структура

```
app/
  index.html       — разметка, 4 вкладки
  manifest.json    — PWA манифест
  css/main.css     — дизайн-система, зелёная тема #166534
  js/data.js       — все данные (EVENT, DAYS, HOTEL, NEARBY, EXHIBITORS, TRANSFERS, FAQ, PRACTICAL)
  js/app.js        — вся логика (App IIFE)
index.html         — редирект на app/index.html (для GitHub Pages)
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
| `location` | 🏨 Локация | Отель, трансферы, достопримечательности рядом |
| `exhibitors` | 🤝 Участники | Карточки с фильтрами по типу |

## Деплой

Приложение задеплоено на **GitHub Pages**.  
Корневой `index.html` перенаправляет на `app/index.html`.  
Для работы Telegram Mini App обязателен HTTPS — GitHub Pages это обеспечивает.

## Что ещё запланировано

- [ ] Telegram-бот (Python): `/start` открывает Mini App, FAQ по ключевым словам
- [ ] Service Worker для офлайн-режима
- [ ] Заполнить реальные данные в `data.js` (сейчас стоят плейсхолдеры)

# 🧑‍💻 rizamamedow.github.io

> Личный сайт-портфолио с информацией обо мне.

[![Deploy](https://img.shields.io/badge/deployed-GitHub%20Pages-181717?logo=github)](https://rizamamedow.github.io)
[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## 📌 О проекте

Этот сайт — моя цифровая визитка. Здесь собрано всё обо мне.

**Live:** [rizamamedow.github.io](https://rizamamedow.github.io)

---

## 🚀 Стек

| Слой | Технологии |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Язык | TypeScript 5 |
| База данных | [Supabase](https://supabase.com/) |
| Стейт-менеджмент | [Zustand 5](https://zustand-demo.pmnd.rs/) |
| Анимации | [GSAP 3](https://gsap.com/), [Motion](https://motion.dev/) |
| 3D / WebGL | [Three.js](https://threejs.org/), [OGL](https://github.com/oframe/ogl) |
| Стили | [Tailwind CSS v4](https://tailwindcss.com/) |
| Иконки | [Lucide React](https://lucide.dev/) |
| Деплой | GitHub Pages |

---

## ⚙️ Установка и запуск

### Требования

- Node.js >= 18
- npm / yarn / pnpm

### Клонирование репозитория

```bash
git clone https://github.com/RizaMamedow/rizamamedow.github.io.git
cd rizamamedow.github.io
```

### Установка зависимостей

```bash
npm install
```

### Переменные окружения

Создайте файл `.env.local` в корне проекта и заполните переменные:

```dotenv
# Базовый URL вашего API
NEXT_PUBLIC_API_BASE_URL=

# Публичный ключ для доступа к API
NEXT_PUBLIC_API_PUBLIC_KEY=
```

### Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Сборка для продакшна

```bash
npm run build
npm run start
```

---

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Главная страница
│   ├── about/page.tsx      # Страница "Обо мне"
│   ├── certificates/       # Страница сертификатов
│   ├── layout.tsx          # Корневой layout
│   └── not-found.tsx       # 404
└── lib/
    ├── api/                # Клиент, эндпоинты, сервис
    ├── bits/               # Анимационные компоненты (ASCII, Spark, Reveal...)
    ├── components/         # UI-компоненты (Header, Footer, Cards...)
    ├── data/               # Zustand store + слайсы
    ├── hooks.ts            # Кастомные хуки
    ├── routes.ts           # Роуты приложения
    ├── types/              # TypeScript-типы
    └── utils.ts            # Утилиты
```

---


## 📄 Лицензия

Распространяется под лицензией [MIT](./LICENSE).

---

<p align="center">Сделано с ❤️ by <a href="https://github.com/RizaMamedow">Riza Mamedow</a></p>

# Инструкция по запуску проекта

## Шаг 1: Установка зависимостей

```bash
cd ~/remonteka
npm install
```

## Шаг 2: Настройка базы данных

### Вариант А: Локальная PostgreSQL

1. Установи PostgreSQL (если еще не установлен)
2. Создай базу данных:
```bash
createdb remonteka
```

3. Создай файл `.env` в корне проекта:
```env
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/remonteka?schema=public"
NEXTAUTH_SECRET="сгенерируй-случайную-строку-здесь"
NEXTAUTH_URL="http://localhost:3000"
```

### Вариант Б: Supabase (бесплатно)

1. Зарегистрируйся на [supabase.com](https://supabase.com)
2. Создай новый проект
3. Скопируй Connection String из настроек проекта
4. Создай файл `.env`:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
NEXTAUTH_SECRET="сгенерируй-случайную-строку-здесь"
NEXTAUTH_URL="http://localhost:3000"
```

### Вариант В: Neon (бесплатно)

1. Зарегистрируйся на [neon.tech](https://neon.tech)
2. Создай новый проект
3. Скопируй Connection String
4. Создай файл `.env` с этим URL

## Шаг 3: Генерация Prisma Client

```bash
npm run db:generate
```

## Шаг 4: Создание миграций базы данных

```bash
npm run db:migrate
```

При первом запуске Prisma спросит имя миграции - введи `init`

## Шаг 5: Запуск проекта

```bash
npm run dev
```

Открой браузер и перейди на [http://localhost:3000](http://localhost:3000)

## Что дальше?

1. Открой Prisma Studio для просмотра данных:
```bash
npm run db:studio
```

2. Создай первого пользователя через Prisma Studio или через API

3. Создай первый пресет через панель менеджера (когда она будет готова)

## Полезные команды

- `npm run dev` - запуск dev сервера
- `npm run build` - сборка проекта
- `npm run lint` - проверка кода
- `npm run db:generate` - генерация Prisma Client
- `npm run db:migrate` - создание миграций
- `npm run db:studio` - открыть Prisma Studio

# Ремонтека - Платформа отслеживания ремонта

Платформа для отслеживания процесса производства ремонта квартиры.

## Технологии

- **Next.js 14** - React фреймворк с App Router
- **TypeScript** - Типизация
- **Prisma** - ORM для работы с базой данных
- **PostgreSQL** - База данных
- **Tailwind CSS** - Стилизация
- **NextAuth.js** - Аутентификация

## Установка

1. Установи зависимости:
```bash
npm install
```

2. Настрой базу данных:
   - Создай файл `.env` в корне проекта
   - Добавь строку подключения:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/remonteka?schema=public"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. Сгенерируй Prisma Client:
```bash
npm run db:generate
```

4. Создай миграции базы данных:
```bash
npm run db:migrate
```

5. Запусти проект:
```bash
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

```
remonteka/
├── app/              # Next.js App Router страницы
├── components/       # React компоненты
├── lib/             # Утилиты и библиотеки
├── prisma/          # Prisma схема
├── hooks/           # Custom React hooks
└── types/           # TypeScript типы
```

## Основные функции

- ✅ Каталог готовых решений (пресетов)
- ✅ Создание проектов из пресетов
- ✅ Отслеживание этапов работ
- ✅ Управление сметой
- ✅ Система чек-пойнтов
- ✅ График работ с зависимостями
- ✅ Управление платежами

## Следующие шаги

1. Настрой базу данных PostgreSQL
2. Создай первый пресет через панель менеджера
3. Создай проект из пресета
4. Начни отслеживать прогресс ремонта

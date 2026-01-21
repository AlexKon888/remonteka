# Информация о Pooler подключениях

Session Pooler иногда имеет ограничения для миграций. Попробуй:

## Вариант 1: Использовать Transaction Pooler

В Supabase:
1. Settings → Database → Connection string
2. Method: выбери **"Transaction pooler"**
3. Скопируй строку и отправь мне

## Вариант 2: Использовать Direct Connection для миграций

Для миграций можно временно использовать Direct Connection:
1. Method: выбери **"Direct connection"**
2. Скопируй строку
3. Выполни миграции
4. Потом вернись на Session Pooler для приложения

## Вариант 3: Выполнить миграции через Supabase SQL Editor

1. Открой Supabase Dashboard
2. SQL Editor (иконка слева)
3. Скопируй SQL из файла `prisma/migrations/.../migration.sql`
4. Выполни в SQL Editor

Какой вариант попробуем?

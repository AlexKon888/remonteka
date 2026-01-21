# Исправление подключения к базе данных

## Вариант 1: Проверь статус проекта в Supabase

1. Открой https://supabase.com/dashboard/project/krofvpdnsimqoannchan
2. Убедись что проект имеет статус "Active" (зеленый)
3. Если статус "Setting up" - подожди еще несколько минут

## Вариант 2: Используй Pooler Connection

Иногда Supabase требует использовать Pooler вместо прямого подключения.

1. В Supabase: Settings → Database → Connection string
2. Выбери вкладку **"Session mode"** или **"Transaction mode"**
3. Скопируй строку - она будет выглядеть так:
   ```
   postgresql://postgres.krofvpdnsimqoannchan:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
4. Отправь мне эту строку, и я обновлю .env

## Вариант 3: Проверь правильность пароля

Убедись что пароль правильный:
- Пароль: `Qwerty1323132!777369`
- В Connection String пароль должен быть URL-encoded (спецсимволы экранированы)

## Что сделать сейчас:

1. Открой Supabase Dashboard
2. Проверь статус проекта
3. Перейди в Settings → Database → Connection string
4. Выбери вкладку "URI" или "Session mode"
5. Скопируй полную строку и отправь мне

Или просто скажи "готово" когда проект будет активен, и я попробую снова.

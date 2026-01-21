# Проверка подключения к базе данных

Возможные причины ошибки:

1. **База данных еще создается** - подожди еще 1-2 минуты после создания проекта в Supabase

2. **Неправильный формат Connection String** - проверь в Supabase:
   - Settings → Database → Connection string
   - Убедись что выбрана вкладка "URI" (не "Session mode")
   - Скопируй строку полностью

3. **Нужно использовать Pooler** - иногда Supabase требует использовать pooler:
   ```
   postgresql://postgres.krofvpdnsimqoannchan:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

## Что сделать:

1. Открой Supabase: https://supabase.com/dashboard/project/krofvpdnsimqoannchan
2. Перейди в Settings → Database
3. Прокрути до "Connection string"
4. Выбери вкладку "URI"
5. Скопируй полную строку (она должна включать пароль)
6. Отправь мне эту строку, и я обновлю .env файл

Или проверь, что проект полностью создан (зеленый статус в Supabase).

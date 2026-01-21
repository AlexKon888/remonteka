# Развертывание на GitHub

## Быстрый способ (через скрипт)

1. Запусти скрипт:
```bash
cd ~/remonteka
./.github-setup.sh
```

2. Следуй инструкциям в скрипте

## Ручной способ

### Шаг 1: Создай репозиторий на GitHub

1. Перейди на https://github.com/new
2. Название: `remonteka` (или любое другое)
3. Выбери Public или Private
4. **НЕ добавляй** README, .gitignore или лицензию
5. Нажми "Create repository"

### Шаг 2: Подключи локальный репозиторий

```bash
cd ~/remonteka

# Замени YOUR_USERNAME на свой GitHub username
git remote add origin https://github.com/YOUR_USERNAME/remonteka.git

# Переименуй ветку в main (если нужно)
git branch -M main

# Отправь код на GitHub
git push -u origin main
```

### Шаг 3: Проверь результат

Открой https://github.com/YOUR_USERNAME/remonteka - там должен быть весь код проекта.

## Что дальше?

После того как код на GitHub:

1. **Настрой GitHub Actions** для автоматического деплоя (опционально)
2. **Подключи Vercel** для автоматического деплоя:
   - Перейди на https://vercel.com
   - Импортируй репозиторий с GitHub
   - Vercel автоматически определит Next.js и задеплоит проект

3. **Настрой переменные окружения** в Vercel:
   - `DATABASE_URL` - строка подключения к БД
   - `NEXTAUTH_SECRET` - секретный ключ
   - `NEXTAUTH_URL` - URL приложения

## Текущий статус

✅ Git репозиторий инициализирован
✅ Первый коммит создан
✅ Все файлы добавлены в git

Готово к отправке на GitHub!

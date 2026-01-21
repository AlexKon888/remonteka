#!/bin/bash

# Скрипт для настройки GitHub репозитория

echo "🚀 Настройка GitHub репозитория для Ремонтека"
echo ""

# Проверка, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Убедитесь, что вы в корне проекта."
    exit 1
fi

# Проверка git
if ! command -v git &> /dev/null; then
    echo "❌ Git не установлен. Установите Git сначала."
    exit 1
fi

echo "✅ Git найден"
echo ""

# Запрос имени репозитория
read -p "Введите имя репозитория на GitHub (или нажмите Enter для 'remonteka'): " REPO_NAME
REPO_NAME=${REPO_NAME:-remonteka}

# Запрос username
read -p "Введите ваш GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username обязателен"
    exit 1
fi

echo ""
echo "📝 Создайте репозиторий на GitHub:"
echo "   1. Перейдите на https://github.com/new"
echo "   2. Название репозитория: $REPO_NAME"
echo "   3. Выберите Public или Private"
echo "   4. НЕ добавляйте README, .gitignore или лицензию"
echo "   5. Нажмите 'Create repository'"
echo ""
read -p "Нажмите Enter после создания репозитория..."

# Добавление remote
GITHUB_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo ""
echo "🔗 Добавляю remote origin..."
git remote add origin $GITHUB_URL 2>/dev/null || git remote set-url origin $GITHUB_URL

echo "✅ Remote добавлен: $GITHUB_URL"
echo ""

# Проверка статуса
echo "📊 Текущий статус git:"
git status

echo ""
echo "🚀 Готово к push!"
echo ""
echo "Выполните следующие команды:"
echo "  git branch -M main"
echo "  git push -u origin main"
echo ""
echo "Или выполните автоматически? (y/n)"
read -p "> " AUTO_PUSH

if [ "$AUTO_PUSH" = "y" ] || [ "$AUTO_PUSH" = "Y" ]; then
    git branch -M main
    echo ""
    echo "📤 Отправляю код на GitHub..."
    git push -u origin main
    echo ""
    echo "✅ Готово! Репозиторий доступен по адресу:"
    echo "   https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
else
    echo ""
    echo "Выполните команды вручную:"
    echo "  git branch -M main"
    echo "  git push -u origin main"
fi

# Отправка кода на GitHub

Репозиторий уже подключен: https://github.com/AlexKon888/remonteka

## Способ 1: Через GitHub Desktop (самый простой)

1. Установи GitHub Desktop: https://desktop.github.com/
2. Открой GitHub Desktop
3. File → Add Local Repository
4. Выбери папку `~/remonteka`
5. Нажми "Publish repository" или "Push origin"

## Способ 2: Через терминал с Personal Access Token

1. Создай Personal Access Token:
   - Перейди на https://github.com/settings/tokens
   - Нажми "Generate new token (classic)"
   - Выбери scope: `repo` (полный доступ к репозиториям)
   - Скопируй токен

2. Выполни команды:
```bash
cd ~/remonteka
git push -u origin main
```

3. Когда попросит username: введи `AlexKon888`
4. Когда попросит password: вставь Personal Access Token (не пароль!)

## Способ 3: Настрой SSH ключ (для будущего)

1. Создай SSH ключ (если еще нет):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Скопируй публичный ключ:
```bash
cat ~/.ssh/id_ed25519.pub
```

3. Добавь ключ на GitHub:
   - Перейди на https://github.com/settings/keys
   - Нажми "New SSH key"
   - Вставь скопированный ключ

4. Измени remote на SSH:
```bash
cd ~/remonteka
git remote set-url origin git@github.com:AlexKon888/remonteka.git
git push -u origin main
```

## Текущий статус

✅ Git репозиторий готов
✅ Remote подключен: https://github.com/AlexKon888/remonteka.git
✅ Ветка: main
✅ 2 коммита готовы к отправке:
   - Initial commit: Ремонтека - платформа отслеживания ремонта
   - Add GitHub setup script and instructions

**Осталось только отправить код одним из способов выше!**

# 🔧 Исправление ошибки NextAuth CLIENT_FETCH_ERROR

## Проблема
Ошибка `CLIENT_FETCH_ERROR` с сообщением `"Unexpected token '<', "<!DOCTYPE "... is not valid JSON"` возникает, когда NextAuth получает HTML-страницу вместо JSON-ответа.

## ✅ Решение

### 1. Обновите переменные окружения

Проверьте файл `.env.local` и убедитесь, что все переменные правильно настроены:

```bash
# Запустите диагностику
node scripts/check-env.js
```

### 2. Правильная конфигурация .env.local

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=f43e52cd7ac5c140c4677d19e3a8f45fc310339de9133a226e1b54de12108afa

# Database Configuration (замените на вашу реальную БД)
DATABASE_URL=postgresql://username:password@hostname.neon.tech/dbname?sslmode=require
```

### 3. Для тестирования без базы данных

В режиме разработки можно использовать тестовые учетные данные:
- **Логин:** `admin`
- **Пароль:** `admin123`

### 4. Перезапустите сервер разработки

```bash
npm run dev
```

## 🔍 Проверка работоспособности

1. Откройте http://localhost:3000/api/test-auth
2. Должен вернуться JSON с статусом "ok"
3. Попробуйте авторизоваться на http://localhost:3000/auth/login

## 🚨 Если проблема не решена

1. Очистите кэш браузера
2. Проверьте консоль разработчика на наличие других ошибок
3. Убедитесь, что порт 3000 не занят другими приложениями

## 📋 Чек-лист для продакшена

- [ ] Настроить реальную базу данных Neon
- [ ] Установить правильный NEXTAUTH_URL для домена
- [ ] Использовать безопасный NEXTAUTH_SECRET (минимум 32 символа)
- [ ] Убрать тестовые учетные данные из кода

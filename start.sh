#!/bin/bash

echo "🚀 Запуск Symfony + Docker + PostgreSQL проекта..."

# Проверяем наличие Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Пожалуйста, установите Docker."
    exit 1
fi

# Проверяем наличие Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Пожалуйста, установите Docker Compose."
    exit 1
fi

# Копируем файл переменных окружения если его нет
if [ ! -f .env.local ]; then
    echo "📝 Копируем файл переменных окружения..."
    cp env.example .env.local
fi

# Останавливаем контейнеры если они запущены
echo "🛑 Останавливаем существующие контейнеры..."
docker-compose down

# Собираем и запускаем контейнеры
echo "🐳 Запускаем Docker контейнеры..."
docker-compose up -d --build

# Ждем немного чтобы контейнеры запустились
echo "⏳ Ждем запуска контейнеров..."
sleep 10

# Проверяем что контейнеры запущены
if ! docker-compose ps | grep -q "Up"; then
    echo "❌ Ошибка запуска контейнеров. Проверьте логи:"
    docker-compose logs
    exit 1
fi

# Устанавливаем зависимости PHP
echo "📦 Устанавливаем PHP зависимости..."
docker-compose exec -T php composer install --no-interaction

# Создаем базу данных
echo "🗄️ Создаем базу данных..."
docker-compose exec -T php php bin/console doctrine:database:create --if-not-exists

# Выполняем миграции
echo "🔄 Выполняем миграции базы данных..."
docker-compose exec -T php php bin/console doctrine:migrations:migrate --no-interaction

# Очищаем кэш
echo "🧹 Очищаем кэш..."
docker-compose exec -T php php bin/console cache:clear

echo ""
echo "✅ Проект успешно запущен!"
echo ""
echo "🌐 Доступные сервисы:"
echo "   - Приложение: http://localhost:8080"
echo "   - MailHog: http://localhost:8025"
echo "   - PostgreSQL: localhost:5432"
echo "   - Redis: localhost:6379"
echo ""
echo "🔧 Полезные команды:"
echo "   - Просмотр логов: docker-compose logs -f"
echo "   - Остановка: docker-compose down"
echo "   - Symfony консоль: docker-compose exec php php bin/console"
echo "" 
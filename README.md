# Symfony + Docker + PostgreSQL Project

Полноценный проект Symfony 7.3 с Docker, PostgreSQL и Vue3 для быстрого старта разработки.

## 🚀 Быстрый старт

### Предварительные требования
- Docker
- Docker Compose

### Запуск проекта

1. **Клонируйте проект и перейдите в папку:**
```bash
cd symfony-docker-project
```

2. **Скопируйте файл переменных окружения:**
```bash
cp env.example .env
```

3. **Запустите Docker контейнеры:**
```bash
docker-compose up -d
```

4. **Установите зависимости PHP:**
```bash
docker-compose exec php composer install
```

5. **Создайте базу данных и выполните миграции:**
```bash
docker-compose exec php php bin/console doctrine:database:create
docker-compose exec php php bin/console doctrine:migrations:migrate
```

6. **Соберите frontend assets (опционально):**
```bash
# Локально
npm install && npm run build

# Или в Docker контейнере
docker-compose exec node npm run build
```

7. **Откройте браузер и перейдите по адресу:**
```
http://localhost:8080
```

**Примечание:** Node.js контейнер автоматически запускает Vite dev-сервер при старте проекта.

## 📁 Структура проекта

```
symfony-docker-project/
├── assets/                # Frontend assets
│   ├── js/               # JavaScript файлы
│   │   ├── components/   # Vue компоненты
│   │   ├── composables/  # Vue composables
│   │   └── app.js        # Главный JS файл
│   └── css/              # CSS файлы
├── config/                # Конфигурация Symfony
├── docker/                # Docker конфигурация
│   ├── nginx/             # Nginx конфигурация
│   ├── php/               # PHP конфигурация
│   └── postgres/          # PostgreSQL конфигурация
├── public/                # Публичная директория
├── src/                   # Исходный код приложения
├── templates/             # Twig шаблоны
├── docker-compose.yml     # Docker Compose конфигурация
├── composer.json          # PHP зависимости
├── package.json           # Node.js зависимости
└── webpack.config.js      # Webpack конфигурация
```

## 🐳 Docker сервисы

- **PHP 8.4** с FPM - основной сервис приложения
- **Nginx** - веб-сервер
- **PostgreSQL 16** - база данных
- **Redis** - кэширование и очереди
- **MailHog** - тестирование email
- **Node.js 18** - сборка frontend assets
- **Symfony 7.3** - PHP фреймворк
- **Vue3 Composition API** - современный фронтенд
- **Vuetify** - Material Design компоненты
- **Tailwind CSS** - utility-first CSS фреймворк
- **Vite** - быстрый сборщик модулей
- **Гибридный подход** - Vuetify + Tailwind CSS
- **Composables** - переиспользуемая логика

## 🔧 Полезные команды

### Docker команды
```bash
# Запуск контейнеров
docker-compose up -d

# Остановка контейнеров
docker-compose down

# Просмотр логов
docker-compose logs -f

# Пересборка контейнеров
docker-compose build --no-cache
```

### Symfony команды
```bash
# Выполнение команд в PHP контейнере
docker-compose exec php php bin/console

# Создание контроллера
docker-compose exec php php bin/console make:controller

# Создание сущности
docker-compose exec php php bin/console make:entity

# Создание миграции
docker-compose exec php php bin/console make:migration

# Выполнение миграций
docker-compose exec php php bin/console doctrine:migrations:migrate

# Очистка кэша
docker-compose exec php php bin/console cache:clear
```

### Composer команды
```bash
# Установка зависимостей
docker-compose exec php composer install

# Добавление пакета
docker-compose exec php composer require package-name

# Обновление зависимостей
docker-compose exec php composer update
```

### NPM команды (локально)
```bash
# Установка зависимостей
npm install

# Разработка (с hot reload)
npm run dev

# Сборка для продакшена
npm run build

# Отслеживание изменений
npm run watch
```

### NPM команды (в Docker контейнере)
```bash
# Запустить dev-сервер в контейнере
docker-compose exec node npm run dev

# Собрать для продакшна в контейнере
docker-compose exec node npm run build

# Запустить watch режим в контейнере
docker-compose exec node npm run watch

# Проверить статус Node.js контейнера
docker-compose logs node

# Перезапустить Node.js контейнер
docker-compose restart node
```

## 🎨 Гибридный подход: Vuetify + Tailwind CSS

Проект использует гибридный подход, сочетающий:

### **Vuetify компоненты:**
- Готовые Material Design компоненты
- Встроенная логика и валидация
- Консистентный дизайн

### **Tailwind CSS:**
- Utility-first подход
- Кастомизация и анимации
- Дополнительные стили

### **Примеры использования:**

```vue
<!-- Чистый Vuetify -->
<v-btn color="primary">Кнопка</v-btn>

<!-- Vuetify + Tailwind -->
<v-btn 
  color="primary" 
  class="transform hover:scale-105 transition-transform"
>
  Анимированная кнопка
</v-btn>

<!-- Кастомные компоненты -->
<div class="custom-card bg-gradient-to-r from-blue-500 to-purple-600">
  Кастомный блок
</div>
```

## 🌐 Доступные сервисы

- **Приложение**: http://localhost:8080
- **MailHog (email тестирование)**: http://localhost:8025
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 🔐 Переменные окружения

### **Файл `.env`**

Основной файл с переменными окружения, который используется как Symfony, так и Docker Compose:

```bash
###> symfony/framework-bundle ###
APP_ENV=dev
APP_SECRET=your-secret-key-here-change-it-in-production
###< symfony/framework-bundle ###

###> doctrine/doctrine-bundle ###
DATABASE_URL="postgresql://symfony_user:symfony_password@postgres:5432/symfony_db?serverVersion=16&charset=utf8"
###< doctrine/doctrine-bundle ###

###> symfony/mailer ###
MAILER_DSN=smtp://mailhog:1025
###< symfony/mailer ###

###> docker-compose variables ###
# Docker Compose Configuration
NGINX_PORT=8080
DB_NAME=symfony_db
DB_USER=symfony_user
DB_PASSWORD=symfony_password
DB_PORT=5432
###< docker-compose variables ###
```

### **Описание переменных:**

#### **Symfony переменные:**
- `APP_ENV` - окружение приложения (dev, test, prod)
- `APP_SECRET` - секретный ключ для безопасности
- `DATABASE_URL` - строка подключения к PostgreSQL
- `MAILER_DSN` - конфигурация почты (MailHog для разработки)

#### **Docker Compose переменные:**
- `NGINX_PORT` - порт для Nginx (по умолчанию 8080)
- `DB_NAME` - имя базы данных PostgreSQL
- `DB_USER` - пользователь базы данных
- `DB_PASSWORD` - пароль базы данных
- `DB_PORT` - порт PostgreSQL (по умолчанию 5432)

### **Использование в docker-compose.yml:**

```yaml
# PHP сервис использует переменные Symfony
environment:
  - APP_ENV=${APP_ENV}
  - APP_SECRET=${APP_SECRET}
  - DATABASE_URL=${DATABASE_URL}
  - MAILER_DSN=${MAILER_DSN}

# Nginx использует переменную порта
ports:
  - "${NGINX_PORT:-8080}:80"

# PostgreSQL использует переменные БД
environment:
  POSTGRES_DB: ${DB_NAME:-symfony_db}
  POSTGRES_USER: ${DB_USER:-symfony_user}
  POSTGRES_PASSWORD: ${DB_PASSWORD:-symfony_password}
ports:
  - "${DB_PORT:-5432}:5432"
```

## 📝 Разработка

### Создание новых сущностей
```bash
docker-compose exec php php bin/console make:entity User
docker-compose exec php php bin/console make:migration
docker-compose exec php php bin/console doctrine:migrations:migrate
```

### Создание API контроллера
```bash
docker-compose exec php php bin/console make:controller ApiController
```

### Тестирование
```bash
docker-compose exec php php bin/phpunit
```

## 🚀 Продакшн

Для продакшн развертывания:

1. Измените `APP_ENV=prod` в `.env`
2. Настройте реальные переменные окружения
3. Выполните `docker-compose exec php php bin/console cache:clear --env=prod`
4. Настройте SSL сертификаты для Nginx

## 📚 Дополнительные ресурсы

- [Symfony Documentation](https://symfony.com/doc/current/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Поддержка

Если у вас есть вопросы или проблемы, создайте issue в репозитории проекта. 
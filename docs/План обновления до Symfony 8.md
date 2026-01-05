---

**User**

Перечитай проект. Опиши, что нужно сделать, чтобы обновить lj Symfony 8 
Вносить изменения в проект пока НЕ надо.

---

**Cursor**


Изучаю текущее состояние проекта и требования для обновления до Symfony 8:



Изучаю конфигурационные файлы проекта:



Проверяю контроллер и зависимости:



План обновления до Symfony 8.0:

## План обновления до Symfony 8.0

### Текущее состояние проекта:
- Symfony 7.4.3
- PHP 8.4 (совместимо с Symfony 8.0)
- Docker окружение настроено
- Используются стандартные компоненты Symfony

### Критические изменения в Symfony 8.0:

#### 1. Требования PHP
- Требуется PHP 8.4+ (уже выполнено)

#### 2. Устаревшие функции, которые нужно исправить:

**a) Routing — замена аннотаций на атрибуты:**
- В `src/Controller/HomeController.php` используется:
  ```php
  use Symfony\Component\Routing\Annotation\Route;
  ```
- Нужно заменить на:
  ```php
  use Symfony\Component\Routing\Attribute\Route;
  ```

#### 3. Обновление зависимостей:

**В `composer.json` нужно изменить:**
- Все `"symfony/*": "^7.4"` → `"symfony/*": "^8.0"`
- `"symfony/asset-mapper": "7.4.*"` → `"symfony/asset-mapper": "8.0.*"`
- `"require": "7.4.*"` → `"require": "8.0.*"` в секции `extra.symfony`

**Возможные обновления зависимостей:**
- `doctrine/doctrine-bundle` — проверить совместимость с Symfony 8.0
- `doctrine/orm` — проверить совместимость
- `phpunit/phpunit` — возможно потребуется обновление до версии 11.x (Symfony 8.0 требует PHPUnit 11)

#### 4. Конфигурация:

**a) Новый формат конфигурации (опционально, но рекомендуется):**
- Symfony 8.0 поддерживает PHP-массивы для конфигурации
- Текущие YAML-файлы продолжат работать
- Можно постепенно мигрировать на PHP-конфигурацию

**b) Проверить конфигурационные файлы:**
- `config/packages/framework.yaml` — проверить на устаревшие опции
- `config/packages/security.yaml` — проверить на изменения в Security
- `config/packages/doctrine.yaml` — проверить на изменения в Doctrine

#### 5. Тестирование и проверка:

**a) Проверка на устаревшие функции:**
```bash
docker-compose exec php php bin/console debug:container --deprecations
docker-compose exec php php bin/console lint:yaml config/
```

**b) Запуск тестов:**
```bash
docker-compose exec php php bin/phpunit --display-deprecations
```

### Пошаговый план обновления:

#### Шаг 1: Подготовка
1. Создать резервную копию (git commit)
2. Убедиться, что все тесты проходят на Symfony 7.4
3. Проверить логи на предупреждения об устаревших функциях

#### Шаг 2: Исправление кода
1. Заменить `Symfony\Component\Routing\Annotation\Route` на `Symfony\Component\Routing\Attribute\Route` в `HomeController.php`
2. Проверить другие контроллеры/классы на использование устаревших аннотаций

#### Шаг 3: Обновление composer.json
1. Изменить все версии Symfony с `^7.4` на `^8.0`
2. Изменить `symfony/asset-mapper` с `7.4.*` на `8.0.*`
3. Изменить `extra.symfony.require` с `7.4.*` на `8.0.*`
4. Проверить и обновить `phpunit/phpunit` до `^11.0` (если требуется)

#### Шаг 4: Обновление зависимостей
```bash
docker-compose exec php composer update "symfony/*" --with-all-dependencies
```

#### Шаг 5: Очистка и проверка
1. Очистить кеш: `docker-compose exec php php bin/console cache:clear`
2. Проверить версию: `docker-compose exec php php bin/console about`
3. Проверить работу приложения в браузере

#### Шаг 6: Обновление документации
- Обновить `README.md` с упоминанием Symfony 8.0

### Важные замечания:

1. Symfony 8.0 не является LTS
    - Поддержка до июля 2026 года
    - Если нужна долгосрочная поддержка, оставайтесь на Symfony 7.4 LTS (до ноября 2028)

2. Breaking changes:
    - Удалены слои обратной совместимости из Symfony 7.4
    - Устаревшие функции, помеченные в 7.4, удалены в 8.0

3. Новые возможности Symfony 8.0:
    - Многошаговые формы
    - Новые атрибуты для сервисов
    - Улучшенные инструменты для работы с API
    - Новый формат конфигурации на основе PHP-массивов

4. Рекомендации:
    - Перед обновлением устраните все предупреждения об устаревших функциях в Symfony 7.4
    - Запустите тесты с флагом `--display-deprecations`
    - Проверьте совместимость сторонних пакетов

### Риски и предостережения:

1. PHPUnit может потребовать обновления до версии 11.x
2. Сторонние пакеты могут быть несовместимы с Symfony 8.0
3. Некоторые конфигурационные опции могут измениться
4. Рекомендуется сначала обновить на тестовой среде

Готов приступить к обновлению, когда будете готовы.

```php
  use Symfony\Component\Routing\Annotation\Route;
```

```php
  use Symfony\Component\Routing\Attribute\Route;
```

```shellscript
docker-compose exec php php bin/console debug:container --deprecations
docker-compose exec php php bin/console lint:yaml config/
```

```shellscript
docker-compose exec php php bin/phpunit --display-deprecations
```

```shellscript
docker-compose exec php composer update "symfony/*" --with-all-dependencies
```

---

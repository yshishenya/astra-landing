# 🐳 Docker Quick Start Guide

Быстрая справка по запуску Astra Landing Page в Docker.

---

## ⚡ Быстрый старт (5 минут)

### Вариант 1: Docker Compose (рекомендуется)

```bash
# 1. Склонировать проект (если еще не сделано)
git clone https://github.com/your-org/astra_landing.git
cd astra_landing

# 2. Создать файл окружения
cp .env.example .env.local
# Отредактировать .env.local с вашими ключами

# 3. Запустить
docker-compose up --build

# 4. Открыть http://localhost:3000
```

### Вариант 2: Автоматизированный скрипт

```bash
# Production сборка (с оптимизациями)
./scripts/docker-build.sh prod

# Development сборка
./scripts/docker-build.sh dev

# Test сборка (с security audit)
./scripts/docker-build.sh test
```

---

## 📋 Основные команды

### Управление контейнерами

```bash
# Запустить (foreground)
docker-compose up

# Запустить (background/daemon)
docker-compose up -d

# Остановить
docker-compose down

# Перезапустить
docker-compose restart

# Пересобрать и запустить
docker-compose up --build --force-recreate
```

### Production режим

```bash
# Запустить с resource limits и Nginx
docker-compose -f docker-compose.prod.yml up -d

# Проверить статус
docker-compose -f docker-compose.prod.yml ps

# Просмотр логов
docker-compose -f docker-compose.prod.yml logs -f
```

### Мониторинг и отладка

```bash
# Мониторинг контейнера
./scripts/monitor-containers.sh astra-landing-prod

# Проверить health endpoint
curl http://localhost:3000/api/health

# Статистика ресурсов в реальном времени
docker stats astra-landing-prod

# Логи в реальном времени
docker logs -f astra-landing-prod

# Зайти внутрь контейнера
docker exec -it astra-landing-prod sh
```

### Безопасность

```bash
# Сканирование уязвимостей
trivy image astra-landing:latest

# Lint Dockerfile
hadolint Dockerfile

# Audit npm зависимостей
docker-compose run --rm astra-landing pnpm audit
```

---

## 🎯 Режимы работы

### Development Mode

**Когда использовать:** Локальная разработка, тестирование

```bash
# Запустить dev режим
./scripts/docker-build.sh dev

# Или с docker-compose
docker-compose up
```

**Характеристики:**
- Hot reload (если настроено)
- Development зависимости
- Подробные логи
- Без оптимизаций

### Production Mode

**Когда использовать:** Production деплой, staging

```bash
# Запустить production режим
./scripts/docker-build.sh prod

# Или с docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

**Характеристики:**
- Минимальный образ (~150 MB)
- Type checking перед сборкой
- Оптимизированная сборка Next.js
- Resource limits (CPU/Memory)
- Health checks
- Nginx reverse proxy (опционально)

### Test Mode

**Когда использовать:** CI/CD, перед деплоем

```bash
# Запустить test режим
./scripts/docker-build.sh test
```

**Характеристики:**
- Security audit (pnpm audit)
- Автоматические тесты
- Health check validation

---

## 🔧 Конфигурация

### Environment Variables

Файл: `.env.local`

```bash
# Site Configuration
NEXT_PUBLIC_APP_URL=https://astra.ai
NEXT_PUBLIC_SITE_NAME=Astra
NEXT_PUBLIC_CONTACT_EMAIL=contact@astra.ai

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@astra.ai

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=astra.ai
```

### Resource Limits

Файл: `docker-compose.prod.yml`

```yaml
deploy:
  resources:
    limits:
      cpus: '1.0'      # Max 1 CPU core
      memory: 512M     # Max 512MB RAM
    reservations:
      cpus: '0.25'     # Min 0.25 CPU cores
      memory: 128M     # Min 128MB RAM
```

---

## 🚨 Troubleshooting

### Контейнер не запускается

```bash
# Проверить логи
docker-compose logs astra-landing

# Проверить статус
docker-compose ps

# Пересобрать с нуля
docker-compose down -v
docker-compose up --build
```

### Health check fails

```bash
# Проверить endpoint вручную
curl http://localhost:3000/api/health

# Проверить логи контейнера
docker logs astra-landing-prod

# Зайти в контейнер и проверить
docker exec -it astra-landing-prod sh
wget -O- http://localhost:3000/api/health
```

### High resource usage

```bash
# Проверить статистику
docker stats astra-landing-prod

# Использовать мониторинг скрипт
./scripts/monitor-containers.sh

# Посмотреть running processes
docker exec -it astra-landing-prod ps aux
```

### Build is slow

```bash
# Включить BuildKit (должно быть по умолчанию)
export DOCKER_BUILDKIT=1

# Очистить кэш и пересобрать
docker builder prune
docker-compose build --no-cache

# Использовать автоматизированный скрипт (с кэшем)
./scripts/docker-build.sh prod
```

### Port already in use

```bash
# Найти процесс на порту 3000
lsof -i :3000

# Остановить другие контейнеры
docker ps
docker stop <container-name>

# Изменить порт в docker-compose.yml
ports:
  - "3001:3000"  # Host:Container
```

---

## 📊 Performance Tips

### Ускорение сборки

1. **Используйте BuildKit cache:**
   ```bash
   export DOCKER_BUILDKIT=1
   docker-compose build
   ```

2. **Не изменяйте package.json без необходимости:**
   - Dependencies кэшируются
   - Изменение package.json = полная переустановка

3. **Используйте .dockerignore:**
   - Исключает ненужные файлы
   - Ускоряет COPY операции

### Оптимизация размера

1. **Multi-stage build уже настроен** ✅
2. **Alpine Linux как base image** ✅
3. **Standalone output Next.js** ✅
4. **Минимальные зависимости** ✅

### Производительность в runtime

1. **Resource limits настроены** в `docker-compose.prod.yml`
2. **Health checks** для мониторинга
3. **Nginx reverse proxy** для кэширования статики
4. **Graceful shutdown** с dumb-init

---

## 📚 Дополнительная информация

- **Полный отчет:** [DOCKER_OPTIMIZATION_REPORT.md](DOCKER_OPTIMIZATION_REPORT.md)
- **Tech Stack:** [.memory_bank/tech_stack.md](.memory_bank/tech_stack.md)
- **README:** [README.md](README.md)

---

## 🆘 Получить помощь

1. **Проверить логи:**
   ```bash
   docker-compose logs -f
   ```

2. **Запустить диагностику:**
   ```bash
   ./scripts/monitor-containers.sh
   ```

3. **Проверить health:**
   ```bash
   curl http://localhost:3000/api/health
   ```

4. **Открыть issue:**
   https://github.com/your-org/astra_landing/issues

---

**Built with ❤️ using Docker best practices**

*Last Updated: 2025-10-29*

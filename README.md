# Booking App



## Diagram

![Local Development](diagram/Diagram.png)

## Required
create `.env`
```
ENVIRONMENT="dev"
REACT_BACKEND_URL="http://localhost:8000"

VITE_ENV="dev"
VITE_BACKEND="http://localhost:8000"
VITE_SENTRY_DNS="https://...ingest.us.sentry.io/..."

SENTRY_DNS_REACT="https://...ingest.us.sentry.io/..."
SENTRY_DNS_DJANGO="https://...ingest.us.sentry.io/..."

MYSQL_ROOT_PASSWORD="booking"
MYSQL_DATABASE="booking"
MYSQL_USER="booking"
MYSQL_PASSWORD="booking"

RABBITMQ_DEFAULT_USER="guest"
RABBITMQ_DEFAULT_PASS="guest"

REDIS_HOST="redis"
```

> Note: see https://sentry.io/pricing/ for a Sentry free-trial account to gain access to the monitor dashboard

## Execution
`docker compose up --build --no-deps --force-recreate --remove-orphans`

1. In terminal (Without Django, Redis, RabbitMq and Prometheus stack):
```bash
npm install
npm run dev
```

2. Orchestration with Docker Compose (With Django, Redis, RabbitMq and Prometheus stack):
```bash
docker compose up --build --no-deps --force-recreate --remove-orphans
```

> Note: Running in orchestration will require commenting out to disable or [cloning the django backend](https://gitlab.com/LarryGeorges-Muala/hotel-booking-backend-django) code in the `compose.yaml` file to enable it

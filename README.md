# Basic Hotel Booking App

## Diagram

![Local Development](diagram/Diagram.png)

---

## CI/CD

> GitLab: [.gitlab-ci.yml](.gitlab-ci.yml)

---

## GitOps

> Argo-CD Application Spec: [argo-cd-application-spec.yaml](.argo-cd/argo-cd-application-spec.yaml)

---

## DevSecOps

> Jenkins Container: [compose.yaml](compose.yaml) / [jenkins.Dockerfile](jenkins.Dockerfile)

> Jenkins Pipeline with Vulnerability Scanner, SBOM and SAST: [Jenkinsfile](Jenkinsfile)

> Docker Local Vulnerability Scanner, SBOM and SAST Container: [compose.yaml](compose.yaml) / [vulnerabilities.Dockerfile](vulnerabilities.Dockerfile)

> DAST Scanner Container and Config: [compose.yaml](compose.yaml)

- Vulnerability Scanner: [Trivy](https://github.com/aquasecurity/trivy)

- SBOM: [Syft](https://github.com/anchore/syft) / [Grype](https://github.com/anchore/grype)

- SAST: [Semgrep](https://github.com/semgrep/semgrep)

- DAST: [Nuclei](https://github.com/projectdiscovery/nuclei)

---

## SRE Monitoring

### Metrics

> Prometheus Config: [.prometheus/config/prometheus.yml](.prometheus/config/prometheus.yml)

> Prometheus Rules: [.prometheus/rules/prometheus.rules](.prometheus/rules/prometheus.rules)

> Prometheus Container: [compose.yaml](compose.yaml)

### Resources and Networking

> OpenTelemetry Config: [.opentelemetry/config/otelcol-metrics-config.yaml](.opentelemetry/config/otelcol-metrics-config.yaml)

### Visualization

> Grafana Dashboard Host Resources: [.grafana/dashboards/react-host-metrics-dashboard.json](.grafana/dashboards/react-host-metrics-dashboard.json)

> Grafana Datasource: [.grafana/datasources/prometheus-datasource.yaml](.grafana/datasources/prometheus-datasource.yaml)

> Grafana Alert: [.grafana/alerting/sample-react-host-alert.yaml](.grafana/alerting/sample-react-host-alert.yaml) / [.grafana/alerting/sample-react-alert-resource.yaml](.grafana/alerting/sample-react-alert-resource.yaml)

> Grafana Container: [compose.yaml](compose.yaml)

### Alerting

> Alertmanager Config: [.alertmanager/config/alertmanager.yml](.alertmanager/config/alertmanager.yml)

> Alertmanager Container: [compose.yaml](compose.yaml)

---

## Frontend Setup

> Note: Node 22.22+ / NPM 10.9+ recommended

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

ALERT_MANAGER_SLACK_API_URL="https://hooks.slack.com/services/..."
ALERT_MANAGER_SLACK_API_CHANNEL="#..."
```

> Note: see https://sentry.io/pricing/ for a Sentry free-trial account to gain access to the monitor dashboard

---

## Frontend Execution
`docker compose up --build --no-deps --force-recreate --remove-orphans`

1. In terminal (Without Django Backend, Redis, RabbitMq, Prometheus and Grafana stack):
```bash
npm install
npm run dev
```

2. Orchestration with Docker Compose (With Django Backend, Redis, RabbitMq, Prometheus and Grafana stack):
```bash
docker compose up --build --no-deps --force-recreate --remove-orphans
```

> Note: Running in orchestration will require either commenting out to disable or [cloning the django backend](https://gitlab.com/LarryGeorges-Muala/hotel-booking-backend-django) code in the `compose.yaml` file to enable it

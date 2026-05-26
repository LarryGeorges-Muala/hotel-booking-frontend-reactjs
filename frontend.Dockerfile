FROM node:22

# Telemetry
WORKDIR /telemetry

RUN wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.152.0/otelcol_0.152.0_linux_arm64.deb

RUN dpkg -i otelcol_0.152.0_linux_arm64.deb

RUN rm -rf otelcol_0.152.0_linux_arm64.deb

COPY ./.opentelemetry/config/otelcol-metrics-config.yaml .opentelemetry/config/otelcol-metrics-config.yaml

COPY ./.opentelemetry/config/otelcol-default-config.yaml .opentelemetry/config/otelcol-default-config.yaml

RUN nohup bash -c "otelcol --config .opentelemetry/config/otelcol-metrics-config.yaml | otelcol --config .opentelemetry/config/otelcol-default-config.yaml" &


# Frontend
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN rm -rf ./.alertmanager \
    && rm -rf ./.ansible \
    && rm -rf ./.dast \
    && rm -rf ./.grafana \
    && rm -rf ./.jenkins-data \
    && rm -rf ./.opentelemetry \
    && rm -rf ./.prometheus \
    && rm -rf ./.vulnerabilities

RUN npm run lint

EXPOSE 3306 4001 5173 5672 6379 8888

CMD [ "npm","run","server" ]


### PROD

# # Stage 1: Build
# FROM node:22 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Serve
# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

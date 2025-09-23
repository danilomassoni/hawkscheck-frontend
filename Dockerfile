# ================================
# Stage 1: Build com Node
# ================================
FROM node:20-alpine AS build
WORKDIR /app

# Copia package.json e lock file primeiro (para cache de dependências)
COPY package*.json ./

# Instala dependências
RUN npm ci --silent

# Copia código fonte
COPY . .

# Build do React/Vite
RUN npm run build

# ================================
# Stage 2: Servir com Nginx
# ================================
FROM nginx:stable-alpine

# Copia os arquivos gerados pelo build
COPY --from=build /app/dist /usr/share/nginx/html

# Copia config customizada do nginx (SPA friendly)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

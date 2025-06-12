# ========================
# Build Stage
# ========================
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html ./
COPY src ./src
COPY public ./public
COPY .env.local ./

RUN npm run build

# ========================
# Dev Stage
# ========================
FROM node:24-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html ./
COPY src ./src
COPY public ./public
COPY .env.local ./

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# ========================
# Production Stage
# ========================
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

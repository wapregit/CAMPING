# ========================
# 🏗️ Build Stage
# ========================
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies
RUN apk update && apk add openssl

# Copy dependencies files and install
COPY package*.json ./
RUN npm install

# Copy configs and source
COPY tsconfig.json tsup.config.ts ./
COPY server.ts ./
COPY .env ./
COPY @types ./@types
COPY config ./config
COPY controllers ./controllers
COPY middleware ./middleware
COPY routes ./routes
COPY utils ./utils
COPY prisma ./prisma
COPY generated ./generated


# Build app
RUN npm run build

# ========================
# 👨‍💻 Development Stage
# ========================
FROM node:24-alpine AS dev

WORKDIR /app

RUN apk update && apk add procps

# Copy and install dev dependencies
COPY package*.json ./
RUN npm install

# Copy config and source
COPY tsconfig.json tsup.config.ts nodemon.json ./
COPY server.ts ./
COPY .env ./
COPY @types ./@types
COPY config ./config
COPY controllers ./controllers
COPY middleware ./middleware
COPY routes ./routes
COPY utils ./utils
COPY prisma ./prisma
COPY generated ./generated

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]

# ========================
# 🚀 Production Stage
# ========================
FROM node:24-alpine AS prod

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app and required folders from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/.env ./.env

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]


FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./


RUN npm install --frozen-lockfile || yarn install --frozen-lockfile


COPY . .


RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app


ENV NODE_ENV production


COPY --from=builder /app/package.json ./package.json
RUN npm install --omit=dev || yarn install --production


COPY --from=builder /app/public ./public

COPY --from=builder /app/.next ./.next


EXPOSE 3000

CMD ["npm", "start"]
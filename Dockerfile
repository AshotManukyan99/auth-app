FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY nx.json tsconfig.base.json ./
COPY apps ./apps
RUN yarn
RUN npx nx build auth-app

FROM nginx:alpine

COPY --from=builder /app/dist/apps/auth-app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build --prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/front/* /usr/share/nginx/html/
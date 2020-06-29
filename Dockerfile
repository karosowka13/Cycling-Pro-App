FROM node:latest AS build

COPY app /app
WORKDIR /app

RUN npm install
RUN npm run build

#production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
#new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
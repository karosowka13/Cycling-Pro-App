FROM node:latest AS build

COPY app /app
WORKDIR /app

ENV NODE_ENV  production
ENV REACT_APP_SERVER https://cycling-server-hrwkzvlbsa-ew.a.run.app/api
ENV REACT_APP_LOGIN https://cycling-server-hrwkzvlbsa-ew.a.run.app/api/auth/login
ENV REACT_APP_SIGNUP https://cycling-server-hrwkzvlbsa-ew.a.run.app/api/auth/signup

#no souce code avaliable 
#ENV GENERATE_SOURCEMAP=false

RUN npm install
RUN npm run build

#production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
#new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
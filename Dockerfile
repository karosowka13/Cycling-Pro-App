FROM node:latest AS build

COPY app /app
WORKDIR /app

ENV NODE_ENV  production
ENV REACT_APP_NODE_ENV production

ENV REACT_APP_SERVER https://cycling-server-hrwkzvlbsa-ew.a.run.app/api
ENV REACT_APP_LOGIN https://cycling-server-hrwkzvlbsa-ew.a.run.app/api/auth/login
ENV REACT_APP_SIGNUP https://cycling-server-hrwkzvlbsa-ew.a.run.app/api/auth/signup

#no souce code avaliable 
#ENV GENERATE_SOURCEMAP=false

RUN npm install
RUN npm run build

#production environment
FROM httpd:2.4
#COPY ./public-html/ /usr/local/apache2/htdocs/
COPY ./.htaccess /usr/local/apache2/htdocs/.
COPY --from=build /app/build /usr/local/apache2/htdocs/
RUN sed -i 's/None/All/g' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's,#LoadModule rewrite_module modules/mod_rewrite.so,LoadModule rewrite_module modules/mod_rewrite.so,g' /usr/local/apache2/conf/httpd.conf
EXPOSE 80



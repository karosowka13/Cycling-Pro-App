FROM node:latest

COPY app /app
COPY entrypoint.sh /app/entrypoint.sh
WORKDIR /app

RUN npm install
EXPOSE 3000
CMD ["/bin/bash", "-c", "/app/entrypoint.sh"]

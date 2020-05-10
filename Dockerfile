FROM node:latest

COPY app /app
COPY entrypoint.sh /app/entrypoint.sh
WORKDIR /app

RUN npm install
EXPOSE 3000
RUN chmod 777 entrypoint.sh
#CMD ["/bin/bash", "-c", "/app/entrypoint.sh"]
CMD ["npm", "start"]

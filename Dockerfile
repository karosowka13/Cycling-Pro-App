FROM node:latest

COPY app /app
WORKDIR /app

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
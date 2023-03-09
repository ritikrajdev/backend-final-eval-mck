FROM node:19-alpine

WORKDIR /app

COPY package*.json .
RUN npm i --production

COPY . .
ENTRYPOINT [ "npm", "start" ]
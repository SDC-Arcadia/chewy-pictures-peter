FROM node:12-alpine

WORKDIR /usr/src/app

ENV PORT=80

EXPOSE 80/tcp

COPY package.json ./

RUN npm install

COPY . .

CMD ["node", "./server/server.js"]
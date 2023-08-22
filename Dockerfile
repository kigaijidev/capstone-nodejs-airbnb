FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

ENV APP_PORT=3000

RUN yarn install --only=prod

COPY . .

EXPOSE 8080
CMD yarn start
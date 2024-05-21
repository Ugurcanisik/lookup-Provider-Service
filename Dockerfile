FROM node:lts-slim as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start"]

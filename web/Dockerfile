FROM node:alpine3.17

WORKDIR /cache

COPY package.json package-lock.json ./
RUN npm install
COPY . .

WORKDIR /app/web
ENV PATH /app/web/node_modules/.bin:$PATH

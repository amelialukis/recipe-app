FROM node:alpine3.17
LABEL authors="amelialukis"

WORKDIR /app/web

COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
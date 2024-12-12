FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]
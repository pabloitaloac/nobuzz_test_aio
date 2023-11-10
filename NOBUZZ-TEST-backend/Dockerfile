FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 8181

CMD ["sh", "-c", "sleep 10 && yarn start"]

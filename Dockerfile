FROM node:20.16.0

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ./src ./src

EXPOSE 5500

CMD [ "node","--watch", "--watch-path=./src", "." ]
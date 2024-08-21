FROM node:20.16.0

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ./dist ./src

EXPOSE 5500

CMD [ "node", "." ]
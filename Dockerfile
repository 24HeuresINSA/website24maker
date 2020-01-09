FROM node:10.17.0-alpine

WORKDIR /home/website24maker

COPY . .

RUN npm install

CMD npm run prod

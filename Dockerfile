FROM node:15.4.0-alpine

WORKDIR /home/website24maker

COPY . .

RUN npm install

EXPOSE 3001

CMD ["node", "app.js"]

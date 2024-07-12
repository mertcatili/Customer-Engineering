FROM node:16.20.2-alpine3.18

WORKDIR /var/www/html

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "start"]
FROM node:16.20.2-alpine3.18

WORKDIR /var/www/html

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4444
EXPOSE 9229 

CMD ["npm", "run", "start:debug"]
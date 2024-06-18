FROM node 


WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npx prisma db seed
CMD ["npm", "run", "start:dev"]
FROM node:latest

WORKDIR /sites/domino

COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
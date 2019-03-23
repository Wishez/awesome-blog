FROM node:10-alpine

LABEL maintainer="shiningfinger@list.ru"

WORKDIR ./app
COPY ./ ./

RUN npm i && npm i -g nodemon
RUN npm run build
RUN npm run server:bundle

EXPOSE 3000
ENTRYPOINT ["nodemon", "./server/express.js"]


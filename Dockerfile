FROM node:10-alpine

LABEL maintainer="shiningfinger@list.ru"

WORKDIR ./app
COPY ./ ./

RUN npm i && npm i -g nodemon && npm run server:bundle
COPY ./dist/index.html ./dist/index.html

EXPOSE 3000
ENTRYPOINT ["nodemon", "./server/express.js"]


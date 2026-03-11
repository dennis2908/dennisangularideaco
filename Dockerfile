FROM node:16

WORKDIR /usr/src/app
COPY ./package*.json .
RUN npm i
RUN npm i -g @angular/cli@16.2.0-next.1
COPY ./ .
RUN npm build
EXPOSE 4200
CMD npm start
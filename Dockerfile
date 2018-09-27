FROM node:8-alpine as builder

RUN apk update \
    && apk add --virtual build-dependencies \
        build-base \
        gcc \
        wget \
        git \
	python \
    && apk add \
        bash

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn install \
    && apk del build-dependencies \
    && rm -rf /var/cache/apk/*

COPY . /usr/src/app

RUN yarn build 

FROM nginx:1.14.0-alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


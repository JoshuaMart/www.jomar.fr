FROM node:20

WORKDIR /app
COPY package*.json yarn.lock ./

RUN yarn && \
    yarn add sharp && \
    npx browserslist@latest --update-db
FROM node:12.19.1-slim

ARG TZ
ARG PORT

# Dockerコンテナの設定
RUN mkdir -p /tweet_collector
WORKDIR /tweet_collector
EXPOSE ${PORT}

# npm install をキャッシュするために、最初に package*.json のみADDして npm install している
ADD ./package.json /tweet_collector
ADD ./package-lock.json /tweet_collector
RUN apt-get update -y && apt-get install -y git
RUN npm install
ADD ./ /tweet_collector

ENV NODE_CONFIG_DIR=/tweet_collector/config \
    TZ=${TZ}

RUN npm run build

CMD ["node", "./build/app.js"]
FROM node:12.18

ARG PORT

# Dockerコンテナの設定
RUN mkdir -p /mnt/app
WORKDIR /mnt/app
EXPOSE ${PORT}
VOLUME [ "/mnt/log" ]

ADD ./package.json /mnt/app
ADD ./package-lock.json /mnt/app
RUN npm install
ADD ./ /mnt/app

RUN npm run build

CMD ["node", "./build/app.js"]
#FROM nginx:1.11.10-alpine
FROM node:7.7-alpine

MAINTAINER soulteary <soulteary@gmail.com>

ENV WEB_VERSION 0.0.1
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

RUN echo '' > /etc/apk/repositories && \
    echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main"         >> /etc/apk/repositories && \
    echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/community"    >> /etc/apk/repositories && \
    echo "166.111.206.63    mirror.tuna.tsinghua.edu.cn"                >> /etc/hosts && \
    echo "185.31.17.249     github.com"                                 >> /etc/hosts && \
    echo "Asia/Shanghai" > /etc/timezone

RUN apk --no-cache --no-progress update && \
    apk --no-cache --no-progress upgrade

RUN apk add bash git nginx openssh \
    && sed -i -e "s/bin\/ash/bin\/bash/" /etc/passwd \
    && rm /var/cache/apk/*

COPY ./package.json /data/package.json

WORKDIR /data

COPY ./bin /data/bin
RUN /data/bin/install.sh --use-cnpm-mirror

COPY ./posts /data/posts
COPY ./scaffolds /data/scaffolds
COPY ./themes /data/themes
COPY ./_config.yml /data/_config.yml
COPY ./ctl.sh /data/ctl.sh
COPY ./build /data/website
COPY ./altas.conf /etc/nginx/nginx.conf

COPY ./Dockerfile-deploy /data/Dockerfile-deploy


EXPOSE 4000:4000
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

#CMD /bin/bash


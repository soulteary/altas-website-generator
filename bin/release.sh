#!/bin/bash

rm -rf public

./node_modules/.bin/hexo generate
./node_modules/.bin/hexo generate

rm -rf public/page/
rm -rf public/taocode_ad*
rm -rf public/tengine_ad*
rm -f public/js/app.js

cp -r ./website/* public/
cp -r ./Dockerfile-deploy public/Dockerfile
cp /etc/nginx/nginx.conf public/nginx.conf

git clone --depth 1 --single-branch --branch dev git@github.com:alibaba/atlas.git

cp -r atlas/atlas-docs/_book public/docs
rm -rf atlas

node ./bin/updateChangelogHash.js
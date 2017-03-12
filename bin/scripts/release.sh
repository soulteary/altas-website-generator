#!/bin/bash

BASE_DIR=$(cd "$(dirname "$0")"; cd ./; pwd)

mkdir -p $BASE_DIR/public

echo docker run --rm -it -v $BASE_DIR/posts:/data/posts:ro -v $BASE_DIR/public:/data/public:rw atlas/website-builder bin/release.sh

#docker run --rm -it -v $BASE_DIR/posts:/data/posts:ro -v $BASE_DIR/public:/data/public:rw atlas/website-builder bin/release.sh
docker run --rm -it -v $BASE_DIR/posts:/data/posts:ro -v $BASE_DIR/public:/data/public:rw -v /Users/$USER/.ssh:/root/.ssh:ro -v /Users/$USER/.gitconfig:/root/.gitconfig:ro atlas/website-builder bin/release.sh

#cp -r $BASE_DIR/posts/book $BASE_DIR/public

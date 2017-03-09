#!/bin/bash

BASE_DIR=$(cd "$(dirname "$0")"; cd ./; pwd)
USER=$(whoami)

echo docker run --rm -it -v $BASE_DIR/public:/data/public:rw -v /Users/$USER/.ssh:/root/.ssh:ro -v /Users/$USER/.gitconfig:/root/.gitconfig:ro atlas/website-builder bin/deploy.sh

docker run --rm -it -v $BASE_DIR/public:/data/public:rw -v /Users/$USER/.ssh:/root/.ssh:ro -v /Users/$USER/.gitconfig:/root/.gitconfig:ro atlas/website-builder bin/deploy.sh

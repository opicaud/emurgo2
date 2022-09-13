#!/bin/bash

cd ../../../
remote="466295724864.dkr.ecr.eu-west-1.amazonaws.com/trackclear"


docker build -t "$remote:latest" .
tag=$(git describe --abbrev=0)
docker tag "$remote:latest" $remote:"$tag"
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 466295724864.dkr.ecr.eu-west-1.amazonaws.com
docker push $remote:"$tag"

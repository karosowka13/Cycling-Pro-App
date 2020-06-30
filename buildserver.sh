#!/bin/bash

tag=`date +%s`

docker build -f Dockerfile.server -t eu.gcr.io/cycling-281815/server:$tag --no-cache .

docker push eu.gcr.io/cycling-281815/server:$tag
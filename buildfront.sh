#!/bin/bash

tag=`date +%s`

docker build -f Dockerfile -t eu.gcr.io/cycling-281815/front:$tag --no-cache .

docker push eu.gcr.io/cycling-281815/front:$tag
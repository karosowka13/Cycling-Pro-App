#!/bin/bash

tag=`date +%s`

docker build -f Dockerfile.server -t eu.gcr.io/cycling-281815/server:$tag --no-cache . && \

docker push eu.gcr.io/cycling-281815/server:$tag && \

gcloud run deploy cycling-server --region europe-west1 --image eu.gcr.io/cycling-281815/server:$tag --project cycling-281815 --platform managed  
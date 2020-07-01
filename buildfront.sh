#!/bin/bash

tag=`date +%s`

docker build -f Dockerfile -t eu.gcr.io/cycling-281815/front:$tag --no-cache . && \
docker push eu.gcr.io/cycling-281815/front:$tag && \
gcloud run deploy cycling --region europe-west1 --image eu.gcr.io/cycling-281815/front:$tag --project cycling-281815 --platform managed  
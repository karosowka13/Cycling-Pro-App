#!/bin/bash

docker build -t karosowa/thesis:latest .
docker build -t karosowa/server -f Dockerfile.server .

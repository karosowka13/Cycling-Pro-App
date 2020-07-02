#!/bin/bash

hour=`date +%H`
while :
do
  if [ 22 -ge "$hour" ] && [ "$hour" -ge 7 ]; then
    curl https://cycling-server-hrwkzvlbsa-ew.a.run.app
  fi
  sleep 1
done

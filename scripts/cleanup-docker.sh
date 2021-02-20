#!/bin/sh
docker builder prune -f
docker container prune -f
docker image prune -f

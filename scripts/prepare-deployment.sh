#!/bin/sh
trap "kill 0" EXIT
echo "Starting Jenkins...";
systemctl start jenkins;
echo "Starting logger...";
npm run logger &
echo "Starting Webhook Relay Agent...";
relay forward --bucket github-jenkins http://localhost:8080/github-webhook/

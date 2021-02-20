#!/bin/sh
echo "Starting Jenkins...";
systemctl start jenkins;
echo "Starting Webhook Relay Agent...";
relay forward --bucket github-jenkins http://localhost:8080/github-webhook/



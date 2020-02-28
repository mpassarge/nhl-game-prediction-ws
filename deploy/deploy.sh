#!/bin/bash

SERVICE_NAME="nhl-game-prediction-ws"
REMOTE_SERVER="ubuntu@192.168.1.159"

# ssh -i ~/.ssh/rpi/id_rsa ubuntu@192.168.1.159

# Stop service on server
ssh -i ~/.ssh/rpi/id_rsa $REMOTE_SERVER sudo systemctl stop $SERVICE_NAME

# Delete all code for ws
ssh -i ~/.ssh/rpi/id_rsa $REMOTE_SERVER sudo rm -rf sudo rm -rf "/home/ubuntu/app/ws/*"
ssh -i ~/.ssh/rpi/id_rsa ubuntu@192.168.1.159 sudo rm /usr/lib/systemd/system/nhl-game-prediction-ws.service

# Copy src/ and package*.json
scp -i ~/.ssh/rpi/id_rsa package*.json "$REMOTE_SERVER:/home/ubuntu/app/ws"
scp -i ~/.ssh/rpi/id_rsa -r src/ "$REMOTE_SERVER:/home/ubuntu/app/ws"

# Install all dependencies
ssh -t -i ~/.ssh/rpi/id_rsa $REMOTE_SERVER 'bash -i -c "cd /home/ubuntu/app/ws && npm ci --only=production"'

# Copy service file
scp -i ~/.ssh/rpi/id_rsa deploy/nhl-game-prediction-ws.service "$REMOTE_SERVER:/home/ubuntu/app/ws/"
ssh -i ~/.ssh/rpi/id_rsa ubuntu@192.168.1.159 sudo ln -s /home/ubuntu/app/ws/nhl-game-prediction-ws.service /usr/lib/systemd/system/nhl-game-prediction-ws.service

# start service on server
ssh -t -i ~/.ssh/rpi/id_rsa $REMOTE_SERVER sudo systemctl start nhl-game-prediction-ws
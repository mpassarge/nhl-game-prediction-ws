#!/usr/bin/bash

# Stop service on server
# ssh -i /path/to/ssh-key 192.168.1.157 sudo service ... stop

# Copy src/ and package*.json
# scp -i /path/to/ssh-key -r src/ 192.168.1.157:/app/ws/
# scp -i /path/to/ssh-key package*.json 192.168.1.157:/app/ws

# Copy service file
# scp -i /path/to/ssh-key nhl-game-prediction-ws.service 192.168.1.157:/path/to/service

# start service on server
# ssh -i /path/to/ssh-key 192.168.1.157 sudo service ... start
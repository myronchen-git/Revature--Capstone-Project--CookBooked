#!/bin/bash
echo "Running the app_start.sh script..."
cd /home/ubuntu/CookBooked/server
node app.js > /dev/null 2>&1 &
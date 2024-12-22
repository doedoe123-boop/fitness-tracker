#!/bin/bash

echo "Building app.."
npm run build

echo "Deploying React app to server.."
scp -i ~/.ssh/id_ed25519 -r ./build/* ubuntu@13.215.89.97:/var/www/fitness-lifestyle-app/fitness-tracker

echo "Deployment Complete!"

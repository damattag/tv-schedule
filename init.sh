#!/bin/bash

# Create the network if it doesn't exist
docker network create tv-schedule-network

# Start the services
docker compose --profile development up --build --force-recreate
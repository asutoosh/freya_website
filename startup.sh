#!/bin/bash

echo "Starting Freya Trades application..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building Next.js application..."
npm run build

# Start the application
echo "Starting production server..."
npm start

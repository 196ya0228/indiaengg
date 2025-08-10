#!/bin/bash

echo "🚀 Deploying India Engineering Works..."

# Build production
npm run build

# Docker deployment
echo "🐳 Building Docker image..."
docker build -t india-engineering-works .

echo "🌐 Starting container..."
docker run -d -p 80:80 --name india-engineering-works-app india-engineering-works

echo "✅ Deployed! Visit http://localhost"

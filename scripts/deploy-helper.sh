#!/bin/bash

# Quick deployment helper for 3-hour challenge

set -e

echo "🚀 Nosana 3-Hour Challenge Deployment Helper"
echo "============================================="

# Check if username is provided
if [ -z "$1" ]; then
  echo "Usage: ./scripts/deploy-helper.sh <dockerhub-username>"
  echo "Example: ./scripts/deploy-helper.sh johnsmith"
  exit 1
fi

USERNAME=$1
IMAGE_NAME="$USERNAME/agent-challenge:latest"

echo "📦 Building Docker image..."
docker build -t agent-challenge:latest .

echo "🏷️  Tagging image as $IMAGE_NAME..."
docker tag agent-challenge:latest $IMAGE_NAME

echo "☁️  Pushing to Docker Hub..."
docker push $IMAGE_NAME

echo "📝 Updating Nosana job definition..."
# Update the job definition with the new image
sed -i.bak "s|\"image\": \".*\"|\"image\": \"docker.io/$IMAGE_NAME\"|g" nos_job_def/nosana_mastra.json

echo "✅ Docker image deployed: $IMAGE_NAME"
echo "✅ Job definition updated: nos_job_def/nosana_mastra.json"
echo ""
echo "Next steps:"
echo "Deploy to Nosana:"
echo "Go to https://dashboard.nosana.com/deploy, copy and paste the content of the updated job definition file (nos_job_def/nosana_mastra.json) into the deployment form, and submit."


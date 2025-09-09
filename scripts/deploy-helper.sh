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
echo "1. Deploy to Nosana:"
echo "   nosana job post --file nos_job_def/nosana_mastra.json --market nvidia-3060 --timeout 30"
echo ""
echo "2. Or use the npm script:"
echo "   npm run deploy:agent"
echo ""
echo "3. Monitor your job at: https://dashboard.nosana.com/deploy"
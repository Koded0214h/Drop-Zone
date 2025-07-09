#!/bin/bash

# DropZone Backend Deployment Script
echo "🚀 Starting DropZone Backend Deployment..."

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI is not installed. Please install it first."
    exit 1
fi

# Check if we're in the backend directory
if [ ! -f "manage.py" ]; then
    echo "❌ Please run this script from the backend directory."
    exit 1
fi

# Get app name from user
read -p "Enter your Heroku app name: " APP_NAME

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial deployment"
fi

# Add Heroku remote
echo "🔗 Adding Heroku remote..."
heroku git:remote -a $APP_NAME

# Deploy to Heroku
echo "🚀 Deploying to Heroku..."
git push heroku main

# Run migrations
echo "🗄️ Running database migrations..."
heroku run python manage.py migrate --app $APP_NAME

echo "✅ Deployment completed!"
echo "🌐 Your app is available at: https://$APP_NAME.herokuapp.com"
echo "📊 Health check: https://$APP_NAME.herokuapp.com/api/health/"

# Ask if user wants to open the app
read -p "Would you like to open the app in your browser? (y/n): " OPEN_APP
if [ "$OPEN_APP" = "y" ]; then
    heroku open --app $APP_NAME
fi 
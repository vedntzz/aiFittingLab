#!/bin/bash
# Quick start script for frontend

echo "🎨 Starting Frontend..."
cd Frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating .env.local..."
    cp .env.example .env.local
    echo "✏️  Please edit .env.local with your credentials"
fi

echo "🚀 Starting development server..."
npm run dev

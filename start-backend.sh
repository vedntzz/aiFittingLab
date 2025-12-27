#!/bin/bash
# Quick start script for backend

echo "🔧 Starting Backend..."
cd backend

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "🐍 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "⚡ Activating virtual environment..."
source venv/bin/activate

# Check if packages are installed
if [ ! -f "venv/installed" ]; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
    touch venv/installed
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env..."
    cp .env.example .env
    echo "✏️  Please edit .env with your database credentials"
    echo "⚠️  Remember to run: python init_db.py (after setting up database)"
fi

echo "🚀 Starting development server..."
python main.py

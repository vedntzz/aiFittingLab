#!/bin/bash
# Fix for Node version issues with Next.js

echo "🔧 Fixing Node.js version issue..."

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node 20.9.0
nvm use 20.9.0

# Verify versions
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Clean install
echo "📦 Installing dependencies..."
rm -rf node_modules package-lock.json .next
npm install

# Start dev server
echo "🚀 Starting development server..."
npm run dev

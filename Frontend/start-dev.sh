#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Thread.AI Frontend...${NC}"

# Disable VSCode extension hooks that cause conflicts
unset ELECTRON_RUN_AS_NODE
unset VSCODE_INJECTION

# Check if running on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${YELLOW}Detected macOS - Setting up environment...${NC}"

    # Load nvm if it exists
    export NVM_DIR="$HOME/.nvm"
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        source "$NVM_DIR/nvm.sh"
        echo -e "${GREEN}✓ NVM loaded${NC}"
    fi

    # Use Node 20.9.0
    if command -v nvm &> /dev/null; then
        nvm use 20.9.0 2>/dev/null || nvm install 20.9.0
    fi
fi

# Display versions
echo -e "${GREEN}Node version:${NC} $(node -v)"
echo -e "${GREEN}NPM version:${NC} $(npm -v)"
echo ""

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${RED}❌ Error: Node.js version 20.9.0 or higher is required${NC}"
    echo -e "${YELLOW}Current version: $(node -v)${NC}"
    echo -e "${YELLOW}Please run: nvm use 20.9.0${NC}"
    exit 1
fi

# Clean install if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Start dev server with explicit node path and clean environment
echo -e "${GREEN}🎨 Starting Next.js development server...${NC}"
echo -e "${YELLOW}Visit: http://localhost:3000${NC}"
echo ""

# Use the node from nvm explicitly with clean environment
env -i \
  HOME="$HOME" \
  USER="$USER" \
  PATH="$PATH" \
  NODE_ENV=development \
  $(which node) ./node_modules/.bin/next dev

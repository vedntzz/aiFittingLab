@echo off
REM Quick start script for frontend (Windows)

echo Starting Frontend...
cd Frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo Creating .env.local...
    copy .env.example .env.local
    echo Please edit .env.local with your credentials
)

echo Starting development server...
call npm run dev

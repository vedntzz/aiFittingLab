@echo off
REM Quick start script for backend (Windows)

echo Starting Backend...
cd backend

REM Check if venv exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Check if .env exists
if not exist ".env" (
    echo Creating .env...
    copy .env.example .env
    echo Please edit .env with your database credentials
    echo Remember to run: python init_db.py
)

echo Starting development server...
python main.py

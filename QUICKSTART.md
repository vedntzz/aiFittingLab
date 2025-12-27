# Quick Start Guide

Get up and running in 5 minutes!

## 📥 Step 1: Pull the Code

```bash
# If you already have the repo
cd aiFittingLab
git fetch origin
git checkout claude/build-thread-website-xBiWB
git pull

# Or clone fresh
git clone <your-repo-url>
cd aiFittingLab
git checkout claude/build-thread-website-xBiWB
```

## 🚀 Step 2: Choose Your Method

### Option A: Use Quick Start Scripts (Recommended)

**Mac/Linux:**
```bash
# Terminal 1 - Frontend
./start-frontend.sh

# Terminal 2 - Backend (new terminal)
./start-backend.sh
```

**Windows:**
```bash
# Terminal 1 - Frontend
start-frontend.bat

# Terminal 2 - Backend (new terminal)
start-backend.bat
```

### Option B: Manual Start

#### Frontend (Terminal 1)
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

#### Backend (Terminal 2)
```bash
cd backend
python -m venv venv

# Mac/Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env
python main.py
```

## ✅ Step 3: Verify It's Running

- **Frontend:** Open http://localhost:3000
- **Backend API:** Open http://localhost:8000/docs
- **Health Check:** http://localhost:8000/health

## 🎨 What You'll See

1. **Login Page** - Beautiful split-screen auth (click "Browse Without Account" to explore)
2. **Main Wall** - Infinite scroll feed with mock fashion posts
3. **Profile Page** - User showcase with gallery
4. **AI Lab** - Interactive studio interface

## ⚠️ Common Issues

### Frontend Won't Start
```bash
# Delete node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend Won't Start - Port Already in Use
```bash
# Kill process on port 8000
# Mac/Linux:
lsof -ti:8000 | xargs kill -9

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use different port
uvicorn main:app --reload --port 8001
```

### Backend Won't Start - Database Error
The app will work without database initially (API docs will load), but you'll need PostgreSQL for full functionality:

```bash
# Install PostgreSQL
# Mac:
brew install postgresql
brew services start postgresql

# Ubuntu:
sudo apt install postgresql
sudo systemctl start postgresql

# Windows:
# Download from postgresql.org

# Create database
createdb aifashionwall

# Initialize tables
cd backend
source venv/bin/activate  # or venv\Scripts\activate
python init_db.py
```

## 🧪 Testing Without Database

The frontend works with **mock data** - no database required for initial testing!

Just start the frontend and explore:
- Wall page with infinite scroll
- Profile page with galleries
- AI Lab interface
- All UI interactions

## 🔑 Optional: Setup Google OAuth

Only needed if you want real authentication:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable Google+ API
3. Create OAuth credentials
4. Add to `.env.local` and `.env`:
   ```
   GOOGLE_CLIENT_ID=your-id-here
   GOOGLE_CLIENT_SECRET=your-secret-here
   ```

## 📱 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main application |
| Backend API | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Interactive API docs |
| Health Check | http://localhost:8000/health | Backend status |

## 🎯 Next Steps

1. ✅ **Explore the UI** - Browse wall, profile, and lab
2. 🗄️ **Setup Database** - Follow SETUP.md for PostgreSQL
3. 🔐 **Add Google OAuth** - Get credentials from Google Cloud
4. 🤖 **Integrate AI** - Connect your AI service in `backend/services/ai_service.py`
5. 📤 **Add File Upload** - Setup S3 or Cloudinary
6. 🚀 **Deploy** - Ready for Vercel + Railway/Heroku

## 📚 More Information

- **Detailed Setup:** See `SETUP.md`
- **Development Guide:** See `DEVELOPMENT.md`
- **Project Overview:** See `README.md`

## 💡 Tips

- Frontend has **hot reload** - changes appear instantly
- Backend has **auto-reload** - saves on every change
- Use mock data to test UI without database
- Check browser console for frontend errors
- Check terminal for backend errors

Happy coding! 🎉

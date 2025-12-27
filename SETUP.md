# AI Fashion Wall - Setup Guide

Complete setup instructions for both frontend and backend.

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 14+
- **Git**

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Run Development Server

```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## 🔧 Backend Setup

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Database Setup

**Create PostgreSQL Database:**

```bash
# Access PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE aifashionwall;

# Create user (optional)
CREATE USER aifashion WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE aifashionwall TO aifashion;

# Exit
\q
```

### 4. Environment Configuration

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/aifashionwall
SECRET_KEY=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:3000
```

**Generate SECRET_KEY:**
```bash
openssl rand -hex 32
```

### 5. Initialize Database

```bash
python init_db.py
```

This will create all necessary tables.

### 6. Run Development Server

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend API will be available at: `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

## 🔑 Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**

### 2. Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Configure OAuth consent screen if needed
4. Choose **Web application**
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for NextAuth)
   - `http://localhost:8000/auth/google/callback` (for backend)
6. Copy **Client ID** and **Client Secret**

### 3. Update Environment Files

Add the credentials to both frontend and backend `.env` files.

## 📁 Project Structure

```
ai-fashion-wall/
├── frontend/
│   ├── app/              # Next.js pages
│   ├── components/       # Shared components
│   ├── stores/           # Zustand state
│   ├── types/            # TypeScript types
│   └── package.json
├── backend/
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   ├── models/           # Database models
│   ├── schemas/          # Pydantic schemas
│   ├── core/             # Config & utilities
│   └── requirements.txt
└── README.md
```

## 🚀 Running the Full Stack

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🧪 Testing the Setup

1. **Backend Health Check:**
   ```bash
   curl http://localhost:8000/health
   ```

2. **API Documentation:**
   Open `http://localhost:8000/docs` in browser

3. **Frontend:**
   Open `http://localhost:3000` in browser

## 🛠️ Development Workflow

### Frontend Development
- Pages are in `app/` directory
- Components in `components/`
- State management in `stores/`
- Hot reload is enabled

### Backend Development
- Routes handle HTTP only
- Services contain business logic
- Models define database structure
- Auto-reload with `--reload` flag

## 🔍 Troubleshooting

### Frontend Issues

**Port 3000 already in use:**
```bash
# Use different port
PORT=3001 npm run dev
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**Database connection error:**
- Check PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Check database exists

**Import errors:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --upgrade
```

**Port 8000 already in use:**
```bash
# Use different port
uvicorn main:app --reload --port 8001
```

## 📝 Next Steps

1. ✅ Setup complete
2. 🔐 Configure Google OAuth (see above)
3. 🎨 Customize frontend theme in `tailwind.config.ts`
4. 🤖 Integrate AI service in `backend/services/ai_service.py`
5. 📤 Setup file upload (S3, Cloudinary, etc.)
6. 🚀 Deploy to production

## 🌐 Production Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Backend (Railway/Heroku/AWS)
- Set environment variables
- Configure PostgreSQL instance
- Update CORS settings
- Enable HTTPS

## 📄 License

MIT

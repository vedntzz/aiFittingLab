# AI Fashion Wall

An AI-driven fashion discovery and creation platform where browsing feels like exploration, not shopping.

## 🎯 Vision

A visual, Pinterest-like wall for fashion inspiration with a dedicated AI fitting lab where users upload images, generate outfits, edit, and share their creations.

## 🏗️ Architecture

**Monorepo Structure:**
- `frontend/` - Next.js + TypeScript + Tailwind CSS
- `backend/` - Python FastAPI + PostgreSQL

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 📁 Project Structure

### Frontend
```
frontend/
├── app/
│   ├── login/          # Login page
│   ├── signup/         # Signup page
│   ├── profile/        # User profile & creations
│   ├── wall/           # Main discovery feed
│   ├── lab/            # AI fitting lab
│   └── layout.tsx      # Common app shell
├── components/         # Shared components
├── hooks/              # Custom hooks
├── stores/             # Zustand state management
├── types/              # TypeScript types
└── lib/                # Utilities
```

### Backend
```
backend/
├── routes/             # HTTP endpoints
├── services/           # Business & AI logic
├── models/             # Database models
├── schemas/            # Pydantic schemas
└── core/               # Config & utilities
```

## 🎨 Core Features

1. **Authentication** - Google OAuth only
2. **Profile Page** - Creative space for all your AI-generated outfits
3. **Main Wall** - Infinite scroll discovery feed
4. **AI Fitting Lab** - Upload, generate, edit, and share outfits
5. **App Shell** - Consistent header across all routes

## 🧼 Code Philosophy

- **200 line limit** per file
- **Feature-based structure** - each feature owns its route, components, and logic
- **Clean separation** - routes handle HTTP, services handle logic
- **Exploration over conversion** - built for creativity, not commerce

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js
- Zustand
- Framer Motion

**Backend:**
- Python 3.11+
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic

## 📝 Development Rules

1. No file over 200 lines
2. One responsibility per file
3. Feature-based folders only
4. Routes never contain business logic
5. AI logic only in backend services
6. Types live next to features

## 🔐 Environment Variables

### Frontend (.env.local)
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/aifashionwall
SECRET_KEY=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 📄 License

MIT

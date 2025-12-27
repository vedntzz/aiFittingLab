# AI Fashion Wall - Thread.AI

An AI-driven fashion discovery and creation platform where browsing feels like exploration, not shopping.

## 🎯 Vision

Thread.AI is a visual, Pinterest-like wall for fashion inspiration with a dedicated AI fitting lab where users upload images, generate outfits, edit, and share their creations.

## ✨ Core Features

### 1. **Authentication**
- Google OAuth only (no passwords)
- Seamless login/signup experience
- Secure JWT-based sessions

### 2. **Profile Page**
- Personal creative space
- All AI-generated outfits
- User-uploaded images
- Private drafts
- Public posted items
- Quick access to AI Lab

### 3. **Main Wall (Discovery Feed)**
- Infinite scroll visual discovery
- Pinterest-style masonry grid
- Minimal, clean header
- Optimized for curiosity and browsing
- Filter by style categories

### 4. **AI Fitting Lab** ⭐
- Upload your photo
- Select garments from product URLs
- AI generates outfit visualization
- Edit and refine results
- Save as private draft
- Share to public wall

### 5. **Shared UI Components**
- Consistent header across all pages
- Logo and navigation
- Search functionality
- Profile avatar dropdown

## 🏗️ Architecture

### Monorepo Structure
```
ai-fashion-wall/
├── Backend/          # Python FastAPI + PostgreSQL
├── Frontend/         # Next.js + TypeScript + Tailwind
├── README.md         # This file
├── SETUP.md          # Setup instructions
└── start-*.sh/bat    # Quick start scripts
```

### Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js (Google OAuth)
- Zustand (State Management)
- Framer Motion (Animations)

**Backend:**
- Python 3.11+
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- Pydantic Schemas

## 🧼 Code Philosophy

This project follows strict clean code principles:

### Golden Rules
1. **200 Line Limit** - No file exceeds 200 lines
2. **Single Responsibility** - One purpose per file
3. **Feature-Based Structure** - Features own their code
4. **Routes Handle HTTP Only** - No business logic in routes
5. **AI Logic in Backend** - Never in frontend
6. **Types Live with Features** - Co-located types

### Backend MVC Pattern
```
Backend/
├── routes/          # HTTP layer only (Controller)
├── services/        # Business logic (Service)
├── models/          # Database ORM (Model)
└── schemas/         # Request/Response validation (DTO)
```

### Frontend Feature Pattern
```
Frontend/app/
├── [feature]/
│   ├── page.tsx              # Route entry
│   ├── components/           # Feature-specific
│   └── hooks/ (optional)     # Feature-specific
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+

### Option 1: Quick Start Scripts

**Mac/Linux:**
```bash
# Terminal 1 - Frontend
./start-frontend.sh

# Terminal 2 - Backend
./start-backend.sh
```

**Windows:**
```bash
# Terminal 1 - Frontend
start-frontend.bat

# Terminal 2 - Backend
start-backend.bat
```

### Option 2: Manual Start

**Frontend:**
```bash
cd Frontend
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

**Backend:**
```bash
cd Backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your database credentials
python init_db.py
python main.py
```

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development guidelines
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute quick start

## 🔑 Environment Setup

### Frontend `.env.local`
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend `.env`
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/aifashionwall
SECRET_KEY=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:3000
```

## 📁 Project Structure

### Backend
```
Backend/
├── core/               # Configuration & utilities
│   ├── config.py      # Environment settings
│   ├── database.py    # Database connection
│   └── security.py    # JWT & password hashing
├── models/            # SQLAlchemy ORM models
│   ├── user.py
│   ├── post.py
│   └── draft.py
├── schemas/           # Pydantic validation schemas
│   ├── user.py
│   ├── post.py
│   ├── draft.py
│   ├── auth.py
│   └── ai.py
├── routes/            # API endpoints (HTTP only)
│   ├── auth.py
│   ├── users.py
│   ├── posts.py
│   ├── drafts.py
│   └── ai.py
├── services/          # Business logic
│   ├── user_service.py
│   ├── post_service.py
│   ├── draft_service.py
│   └── ai_service.py
├── main.py            # FastAPI app entry point
├── init_db.py         # Database initialization
└── requirements.txt   # Python dependencies
```

### Frontend
```
Frontend/
├── app/               # Next.js pages
│   ├── login/        # Login page
│   ├── signup/       # Signup page
│   ├── wall/         # Main feed
│   ├── profile/      # User profile
│   ├── lab/          # AI fitting lab
│   └── layout.tsx    # Root layout
├── components/        # Shared components
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── ProfileAvatar.tsx
│   └── FashionCard.tsx
├── stores/            # Zustand state
│   ├── useAuthStore.ts
│   └── useLabStore.ts
├── types/             # TypeScript types
│   └── index.ts
└── package.json
```

## 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main application |
| Backend API | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Interactive Swagger UI |
| ReDoc | http://localhost:8000/redoc | Alternative API docs |

## 🎨 Features Breakdown

### Already Implemented ✅
- Google OAuth authentication flow
- User management (CRUD)
- Posts with pagination, like, save
- Drafts system (private creations)
- AI Lab interface (UI complete)
- Infinite scroll feed
- Profile with gallery
- State management (Zustand)
- Clean MVC architecture

### Ready for Integration 🔌
- AI generation service (stub ready)
- File upload system
- Image storage (S3/Cloudinary)
- Real authentication middleware
- Production deployment

## 🛠️ Development

### Running Tests
```bash
# Frontend (when added)
cd Frontend
npm test

# Backend (when added)
cd Backend
pytest
```

### Code Quality
- TypeScript strict mode
- ESLint for frontend
- Type hints for Python
- 200-line file limit enforced

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributing

1. Follow the clean code principles
2. Keep files under 200 lines
3. Add proper documentation
4. Test your changes
5. Create feature branches

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd Frontend
vercel
```

### Backend (Railway/Heroku)
- Configure environment variables
- Setup PostgreSQL database
- Update CORS settings
- Enable HTTPS

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check documentation files
- Review code comments

---

**Built with ❤️ by the Thread.AI team**

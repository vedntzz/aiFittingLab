# Development Guide

## 🧼 Code Philosophy

This project follows strict clean code principles:

### Golden Rules

1. **200 Line Limit** - No file exceeds 200 lines
2. **Single Responsibility** - One purpose per file
3. **Feature-Based Structure** - Features own their code
4. **No Business Logic in Routes** - Routes handle HTTP only
5. **AI Logic in Backend** - Never in frontend
6. **Types Live with Features** - Co-located types

## 📁 Frontend Architecture

### File Structure Pattern

```
app/
├── [feature]/
│   ├── page.tsx              # Route entry (max 150 lines)
│   ├── components/           # Feature-specific components
│   │   ├── FeatureCard.tsx
│   │   └── FeatureList.tsx
│   ├── hooks/                # Feature-specific hooks
│   │   └── useFeature.ts
│   └── types.ts              # Feature-specific types
```

### Component Guidelines

**Good Component:**
```tsx
// components/UserCard.tsx
'use client';

import { User } from '@/types';

interface UserCardProps {
  user: User;
  onFollow?: () => void;
}

export default function UserCard({ user, onFollow }: UserCardProps) {
  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      {onFollow && (
        <button onClick={onFollow} className="btn-primary">
          Follow
        </button>
      )}
    </div>
  );
}
```

**Bad Component:**
```tsx
// ❌ Too many responsibilities
export default function UserDashboard() {
  // ❌ API calls in component
  const fetchUsers = async () => { ... }

  // ❌ Business logic in component
  const calculateScore = () => { ... }

  // ❌ 300 lines of mixed concerns
  return (...)
}
```

### State Management

**Zustand Store Pattern:**
```typescript
// stores/useFeatureStore.ts
import { create } from 'zustand';

interface FeatureStore {
  // State
  items: Item[];
  isLoading: boolean;

  // Actions
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  reset: () => void;
}

export const useFeatureStore = create<FeatureStore>((set) => ({
  items: [],
  isLoading: false,
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  reset: () => set({ items: [], isLoading: false }),
}));
```

## 🔧 Backend Architecture

### MVC Pattern

```
backend/
├── routes/          # HTTP layer only
├── services/        # Business logic
├── models/          # Database ORM
└── schemas/         # Request/Response validation
```

### Route Pattern (HTTP Only)

```python
# routes/users.py
from fastapi import APIRouter, Depends
from services.user_service import UserService

router = APIRouter()

@router.get("/{user_id}")
async def get_user(user_id: str, db: Session = Depends(get_db)):
    """Route handles HTTP only"""
    user = UserService.get_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404)
    return user
```

### Service Pattern (Business Logic)

```python
# services/user_service.py
class UserService:
    @staticmethod
    def get_by_id(db: Session, user_id: str):
        """Service contains business logic"""
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def update_with_validation(db: Session, user_id: str, data: UserUpdate):
        """Complex business logic lives here"""
        user = UserService.get_by_id(db, user_id)

        # Validation
        if data.username and UserService.username_exists(db, data.username):
            raise ValueError("Username already taken")

        # Update
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(user, field, value)

        db.commit()
        return user
```

## 🎨 Styling Guidelines

### Tailwind CSS

Use utility classes, create components for repeated patterns:

```tsx
// ✅ Good - Utility classes
<button className="px-6 py-3 bg-ink text-paper rounded-full hover:scale-105">
  Click Me
</button>

// ✅ Better - Extracted to component
<button className="btn-primary">
  Click Me
</button>
```

### Custom Styles

Only when Tailwind is limiting:

```css
/* globals.css */
.btn-primary {
  @apply px-6 py-3 bg-ink text-paper rounded-full
         transition-all hover:scale-105 hover:shadow-lg;
}
```

## 🔄 Data Flow

### Frontend → Backend

```typescript
// 1. User Action
const handleSubmit = async () => {
  const { setIsLoading } = useLabStore();
  setIsLoading(true);

  // 2. API Call
  const response = await fetch('/api/ai/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  // 3. Update State
  const result = await response.json();
  setGeneratedImage(result.image_url);
  setIsLoading(false);
};
```

### Backend Processing

```python
# 1. Route receives request
@router.post("/generate")
async def generate(request: AIGenerationRequest):
    # 2. Service processes
    result = await AIService.generate_outfit(request)
    return result

# 3. Service contains logic
class AIService:
    @staticmethod
    async def generate_outfit(request):
        # Validate
        # Call AI API
        # Store result
        # Return response
        pass
```

## 🧪 Testing Strategy

### Frontend Tests (Future)

```typescript
// __tests__/components/FashionCard.test.tsx
describe('FashionCard', () => {
  it('displays post information', () => {
    render(<FashionCard post={mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });
});
```

### Backend Tests (Future)

```python
# tests/test_user_service.py
def test_create_user():
    user = UserService.create(db, UserCreate(
        email="test@example.com",
        name="Test User"
    ))
    assert user.email == "test@example.com"
```

## 🚀 Feature Development Workflow

### Adding a New Feature

1. **Plan the Feature**
   - Define requirements
   - Identify affected components
   - Plan database changes

2. **Backend First**
   ```bash
   # Create model
   backend/models/new_feature.py

   # Create schema
   backend/schemas/new_feature.py

   # Create service
   backend/services/new_feature_service.py

   # Create routes
   backend/routes/new_feature.py

   # Update main.py
   ```

3. **Frontend Second**
   ```bash
   # Create types
   frontend/types/new_feature.ts

   # Create store (if needed)
   frontend/stores/useNewFeatureStore.ts

   # Create components
   frontend/components/NewFeatureCard.tsx

   # Create page
   frontend/app/new-feature/page.tsx
   ```

4. **Integration**
   - Connect frontend to backend API
   - Test the flow
   - Handle errors

## 📝 Code Review Checklist

Before committing:

- [ ] No file exceeds 200 lines
- [ ] Components have single responsibility
- [ ] Business logic in services, not routes
- [ ] Types are properly defined
- [ ] Error handling is implemented
- [ ] No console.logs in production code
- [ ] Meaningful variable names
- [ ] Comments only where necessary

## 🔐 Security Best Practices

1. **Never commit secrets**
   - Use `.env` files
   - Add to `.gitignore`

2. **Validate all inputs**
   - Frontend validation (UX)
   - Backend validation (security)

3. **Authentication on sensitive routes**
   - Use JWT tokens
   - Verify ownership

4. **SQL Injection Prevention**
   - Use ORM (SQLAlchemy)
   - Never raw SQL with user input

5. **XSS Prevention**
   - React automatically escapes
   - Sanitize if using dangerouslySetInnerHTML

## 🐛 Debugging Tips

### Frontend Debugging

```typescript
// Use React DevTools
// Check Zustand state
const state = useLabStore.getState();
console.log('Current state:', state);

// Network tab for API calls
// Check response status and data
```

### Backend Debugging

```python
# Use print statements (remove before commit)
print(f"User data: {user}")

# Use debugger
import pdb; pdb.set_trace()

# Check logs
# uvicorn logs requests automatically
```

## 📊 Performance Guidelines

### Frontend Optimization

1. **Image Optimization**
   ```tsx
   import Image from 'next/image';
   <Image src={url} width={300} height={400} alt="..." />
   ```

2. **Code Splitting**
   ```tsx
   const HeavyComponent = dynamic(() => import('./HeavyComponent'));
   ```

3. **Memoization**
   ```tsx
   const expensiveValue = useMemo(() => compute(data), [data]);
   ```

### Backend Optimization

1. **Database Queries**
   ```python
   # ✅ Good - Efficient query
   users = db.query(User).options(
       joinedload(User.posts)
   ).all()

   # ❌ Bad - N+1 query
   users = db.query(User).all()
   for user in users:
       posts = user.posts  # Separate query each time
   ```

2. **Async Operations**
   ```python
   # Use async for I/O operations
   async def fetch_external_data():
       async with httpx.AsyncClient() as client:
           response = await client.get(url)
           return response.json()
   ```

## 🎯 Common Patterns

### Infinite Scroll

```typescript
useEffect(() => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      loadMore();
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### File Upload

```typescript
const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};
```

### Error Handling

```python
try:
    result = await external_api_call()
except ExternalAPIError as e:
    logger.error(f"External API failed: {e}")
    raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail="AI service temporarily unavailable"
    )
```

## 🚦 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Commit often with clear messages
git commit -m "Add: User profile editing"

# Push to remote
git push origin feature/new-feature

# Create pull request
# Code review
# Merge to main
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)
- [Zustand Docs](https://github.com/pmndrs/zustand)

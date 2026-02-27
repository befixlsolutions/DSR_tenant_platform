# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Step 1: Install Dependencies

```bash
cd tenant-platform
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- React Query
- Zustand
- Recharts
- Lucide Icons

### Step 2: Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the dashboard with:
- Top navigation bar
- Sidebar navigation
- Today's tasks widget
- Project completion chart
- Rank performance list
- Tracker detail chart
- Chat widget

### Step 4: Explore the Code

**Main Files to Check**:
- `src/app/dashboard/page.tsx` - Dashboard page
- `src/components/layout/TopNav.tsx` - Top navigation
- `src/components/layout/Sidebar.tsx` - Sidebar navigation
- `src/components/dashboard/*` - Dashboard widgets
- `src/components/ui/*` - Base UI components

### Step 5: Start Building

Choose a phase from the implementation guide and start building!

## 📝 Common Tasks

### Create a New Page

1. Create folder in `src/app/`:
```bash
mkdir src/app/my-page
```

2. Create `page.tsx`:
```typescript
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function MyPage() {
  return (
    <DashboardLayout>
      <h1>My Page</h1>
    </DashboardLayout>
  );
}
```

3. Navigate to `/my-page`

### Create a New Component

1. Create file in `src/components/`:
```typescript
// src/components/MyComponent.tsx
'use client';

import { Card } from './ui/Card';

export const MyComponent = () => {
  return (
    <Card>
      <h2>My Component</h2>
    </Card>
  );
};
```

2. Import and use:
```typescript
import { MyComponent } from '@/components/MyComponent';

<MyComponent />
```

### Add a New Route to Sidebar

Edit `src/components/layout/Sidebar.tsx`:

```typescript
const navigation = [
  // ... existing routes
  { name: 'My Page', href: '/my-page', icon: Star },
];
```

### Fetch Data with React Query

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';

export const MyComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['my-data'],
    queryFn: async () => {
      const res = await fetch('/api/my-endpoint');
      return res.json();
    },
  });

  if (isLoading) return <Skeleton />;
  if (error) return <div>Error loading data</div>;

  return <div>{JSON.stringify(data)}</div>;
};
```

### Add Global State with Zustand

```typescript
// src/stores/myStore.ts
import { create } from 'zustand';

interface MyStore {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Usage in component
import { useMyStore } from '@/stores/myStore';

const count = useMyStore((state) => state.count);
const increment = useMyStore((state) => state.increment);
```

### Add Animation with Framer Motion

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

## 🎨 Using the Design System

### Colors

```typescript
// Tailwind classes
<div className="bg-primary-700 text-white">Primary</div>
<div className="bg-accent-blue text-white">Accent Blue</div>
<div className="text-neutral-600">Neutral Text</div>
```

### Components

```typescript
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

<Button variant="primary" size="md">Click Me</Button>
<Card hover padding="lg">Card Content</Card>
<Badge variant="success">Active</Badge>
<Input label="Email" type="email" />
```

### Spacing

```typescript
// Use Tailwind spacing scale
<div className="p-4">Padding 1rem</div>
<div className="m-6">Margin 1.5rem</div>
<div className="space-y-4">Vertical spacing</div>
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript Errors

```bash
# Check types
npm run type-check
```

### Styling Not Working

```bash
# Rebuild Tailwind
npm run dev
# Hard refresh browser (Ctrl+Shift+R)
```

## 📚 Next Steps

1. **Read the Implementation Guide**: `IMPLEMENTATION_GUIDE.md`
2. **Check the README**: `README.md`
3. **Start with Phase 3**: Employee Dashboard
4. **Join the team**: Ask questions, share progress

## 🎯 Tips for Success

1. **Follow the Design System**: Use existing components and styles
2. **Keep Components Small**: One responsibility per component
3. **Use TypeScript**: Type everything for better DX
4. **Test as You Go**: Check responsiveness and accessibility
5. **Commit Often**: Small, focused commits
6. **Ask for Help**: Don't get stuck, reach out!

---

**You're all set! Start building amazing features! 🚀**

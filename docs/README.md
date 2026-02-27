# DSR Tenant Platform - Next.js UI

A modern, high-performance performance management platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Inspired by Tasklyn design with smooth animations
- **Performance Optimized**: Lazy loading, code splitting, and optimized bundle size
- **Component-Based Architecture**: Reusable, maintainable components
- **Global Design System**: CSS variables for easy theming
- **Responsive Design**: Mobile-first approach
- **Advanced Analytics**: Rich data visualization for all roles
- **Role-Based Access**: Employee, Manager, HR, and Admin views

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## 🏗️ Project Structure

```
tenant-platform/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── dashboard/          # Dashboard page
│   │   ├── dsr/                # Daily Status Report
│   │   ├── reports/            # All reports (WSR, MSR, QSR, YSR)
│   │   ├── performance/        # Performance analytics
│   │   ├── tasks/              # Task management
│   │   ├── team/               # Team management (Manager)
│   │   ├── integrations/       # Integration management
│   │   └── settings/           # Settings & configuration
│   │
│   ├── components/
│   │   ├── ui/                 # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Skeleton.tsx
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── TopNav.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   ├── dashboard/          # Dashboard widgets
│   │   ├── dsr/                # DSR components
│   │   ├── reports/            # Report components
│   │   ├── performance/        # Performance components
│   │   └── charts/             # Chart components
│   │
│   ├── lib/                    # Utility functions
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript types
│   ├── config/                 # Configuration files
│   └── styles/                 # Global styles
│
├── public/                     # Static assets
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Purple/Navy (#7c3aed) - Main brand color
- **Secondary**: Gray/Blue - Supporting colors
- **Accent**: Blue, Orange, Purple, Pink, Green, Red
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font**: Inter (sans-serif)
- **Headings**: Semibold, responsive sizes
- **Body**: Regular, 16px base

### Spacing
- **Page**: 2rem
- **Section**: 1.5rem
- **Card**: 1.25rem

### Border Radius
- **Card**: 1.5rem (24px)
- **Button**: 0.75rem (12px)
- **Input**: 0.5rem (8px)

## 📋 Implementation Phases

### ✅ PHASE 1: Foundation (COMPLETED)
- [x] Project setup with Next.js 14
- [x] Tailwind CSS configuration
- [x] Global design system with CSS variables
- [x] Base UI components (Button, Card, Input, Badge, Skeleton)
- [x] Layout structure (TopNav, Sidebar, DashboardLayout)
- [x] TypeScript types and interfaces
- [x] Configuration files

### ✅ PHASE 2: Core Dashboard (COMPLETED)
- [x] Dashboard layout
- [x] Today Tasks widget
- [x] Project Completion chart
- [x] Rank Performance list
- [x] Tracker Detail chart
- [x] Chat widget
- [x] Navigation system

### 🔄 PHASE 3: Employee Dashboard (IN PROGRESS)
- [ ] Task list with filters
- [ ] Task creation form
- [ ] Task detail view
- [ ] Task status updates
- [ ] Priority management
- [ ] Time logging

### 📅 PHASE 4: DSR Module (UPCOMING)
- [ ] DSR creation form
- [ ] Auto-populated data from integrations
- [ ] Edit workflow
- [ ] Submit workflow
- [ ] DSR history view
- [ ] AI-generated suggestions
- [ ] Task linking

### 📅 PHASE 5: Reports Module
- [ ] Weekly Status Report (WSR)
- [ ] Monthly Status Report (MSR)
- [ ] Quarterly Status Report (QSR)
- [ ] Annual Status Report (YSR)
- [ ] Report templates
- [ ] Export functionality (PDF, Excel)
- [ ] Version history
- [ ] Approval workflow

### 📅 PHASE 6: Performance & Analytics
- [ ] Performance dashboard
- [ ] Score breakdown visualization
- [ ] Trend charts (daily, weekly, monthly)
- [ ] Comparison views
- [ ] Anomaly indicators
- [ ] Burnout detection UI
- [ ] Skill gap analysis
- [ ] Fairness metrics

### 📅 PHASE 7: Manager Dashboard
- [ ] Team overview
- [ ] Team member cards
- [ ] Performance ranking
- [ ] Approval workflows
- [ ] Override management
- [ ] Team analytics
- [ ] Bias detection alerts
- [ ] Coaching recommendations

### 📅 PHASE 8: Integrations
- [ ] Integration marketplace
- [ ] Jira connection flow
- [ ] GitHub connection flow
- [ ] Keka connection flow
- [ ] Integration status dashboard
- [ ] Sync logs
- [ ] Webhook management
- [ ] OAuth flow handling

### 📅 PHASE 9: Admin & Settings
- [ ] Tenant settings
- [ ] User management (CRUD)
- [ ] Role & permissions management
- [ ] Scoring policy configuration
- [ ] Compliance settings
- [ ] Billing & subscription
- [ ] Audit logs viewer
- [ ] System health dashboard

### 📅 PHASE 10: Advanced Features
- [ ] Appeals system
- [ ] Rating & increment proposals
- [ ] Notification system
- [ ] Real-time updates (WebSocket)
- [ ] Advanced search
- [ ] Bulk operations
- [ ] Data export
- [ ] Email templates

### 📅 PHASE 11: Polish & Optimization
- [ ] Performance optimization
- [ ] Animation refinements
- [ ] Accessibility improvements (WCAG)
- [ ] Mobile responsiveness
- [ ] Error boundaries
- [ ] Loading states
- [ ] Empty states
- [ ] SEO optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. **Install dependencies**
```bash
cd tenant-platform
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Features by Role

### Employee
- Personal dashboard with today's tasks
- DSR creation and submission
- Performance tracking
- Report viewing
- Task management
- Integration status

### Manager
- Team dashboard
- Team member performance
- Approval workflows
- Override capabilities
- Team analytics
- Bias detection alerts

### HR
- Organization-wide analytics
- Rating management
- Increment proposals
- Fairness metrics
- Compliance reports
- Employee lifecycle

### Admin
- System configuration
- User management
- Integration setup
- Audit logs
- Billing management
- Security settings

## 🎨 Customization

### Changing Colors

Edit `src/styles/globals.css`:

```css
:root {
  --color-primary-700: #your-color;
  --color-accent-blue: #your-color;
  /* ... */
}
```

### Adding New Components

1. Create component in `src/components/`
2. Export from index file
3. Use in pages

### Adding New Pages

1. Create folder in `src/app/`
2. Add `page.tsx`
3. Wrap with `DashboardLayout`

## 📊 Performance Optimizations

- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Dynamic imports for heavy components
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: `npm run build` shows bundle sizes
- **Caching**: React Query for data caching
- **Memoization**: React.memo for expensive components

## 🔒 Security

- **Authentication**: JWT-based auth (to be implemented)
- **Authorization**: Role-based access control
- **CSRF Protection**: Built into Next.js
- **XSS Protection**: React's built-in escaping
- **API Security**: HTTPS only, rate limiting

## 🧪 Testing (To be implemented)

```bash
npm run test          # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 📝 API Integration

### Example API Call

```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['tasks'],
  queryFn: async () => {
    const res = await fetch(`${API_BASE_URL}/tasks`);
    return res.json();
  },
});
```

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

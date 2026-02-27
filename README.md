# DSR Tenant Platform

> **Work Intelligence & Accountability Platform**  
> Structured reporting + governed visibility + explainable analytics

## 🚀 Quick Start

```bash
cd tenant-platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📋 Project Status

**All 24 Phases Complete** | **79 Pages** | **340+ Features** | **0 TypeScript Errors**

See [CHANGELOG.md](CHANGELOG.md) for version history and [ALL_24_PHASES_FINAL.md](ALL_24_PHASES_FINAL.md) for detailed completion status.

## 📁 Project Structure

```
tenant-platform/
├── docs/                          # Documentation
│   ├── README.md                  # Complete documentation
│   ├── DESIGN_SYSTEM.md          # Design system guide
│   ├── IMPLEMENTATION_GUIDE.md   # Development guide
│   ├── PHASE_WISE_PLAN.md        # Phase implementation plan
│   ├── QUICK_START.md            # Quick start guide
│   ├── QUICK_WINS.md             # Quick wins guide
│   ├── TESTING_GUIDE.md          # Testing guide
│   ├── TOAST_USAGE.md            # Toast notification guide
│   └── UPDATED_IMPLEMENTATION_PLAN.md
│
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (tenant)/            # Tenant route group
│   │   │   ├── home/            # Role-based dashboards
│   │   │   ├── reporting/       # DSR/WSR/MSR/QSR/YSR
│   │   │   ├── goals/           # Goal Lifecycle System
│   │   │   ├── blockers/        # Blocker management
│   │   │   ├── dependencies/    # Dependency tracking
│   │   │   ├── actions/         # Action items
│   │   │   ├── people/          # People directory & org chart
│   │   │   ├── analytics/       # Analytics & insights
│   │   │   ├── reviews/         # Weekly reviews & appraisals
│   │   │   ├── support/         # Support tickets & KB
│   │   │   ├── integrations/    # Third-party integrations
│   │   │   ├── ai/              # AI insights & settings
│   │   │   ├── admin/           # Admin features
│   │   │   └── audit/           # Audit logs & security
│   │   ├── login/               # Authentication
│   │   └── page.tsx             # Landing page
│   │
│   ├── components/
│   │   ├── ui/                  # Base UI components
│   │   ├── common/              # Common components
│   │   ├── layout/              # Layout components
│   │   ├── home/                # Dashboard widgets
│   │   ├── reporting/           # Reporting components
│   │   ├── goals/               # Goals components
│   │   ├── blockers/            # Blockers components
│   │   ├── analytics/           # Analytics components
│   │   └── auth/                # Auth components
│   │
│   ├── lib/
│   │   ├── mock-data/           # Mock data (all modules)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Utility functions
│   │   └── providers/           # Context providers
│   │
│   ├── types/                   # TypeScript types
│   ├── config/                  # Configuration
│   └── styles/                  # Global styles
│
├── public/                      # Static assets
│
├── README.md                    # This file
├── CHANGELOG.md                 # Version history
├── CURRENT_STATUS_QUICK_VIEW.md # Current status
└── ALL_24_PHASES_FINAL.md      # Completion summary
```

## 🎯 What This Platform Is

- **Structured Reporting**: DSR/WSR/MSR with templates
- **Goal Management**: Goal Lifecycle System (GLS)
- **Blocker Tracking**: Structured blocker & dependency management
- **Review System**: Weekly reviews & appraisals
- **Analytics**: Employee efficiency meter (0-100), manager accountability
- **Enterprise**: Multi-tenancy, RBAC/ABAC, audit logs

## ✅ Implementation Status

All 24 phases completed with 100% feature coverage:

- ✅ Foundation & Core Modules (Phases 1-6)
- ✅ Advanced Features (Phases 7-12)
- ✅ Enterprise Features (Phases 13-18)
- ✅ AI & Integrations (Phases 19-22)
- ✅ Performance & Accessibility (Phases 23-24)

See [CURRENT_STATUS_QUICK_VIEW.md](CURRENT_STATUS_QUICK_VIEW.md) for detailed status.

## 📊 Mock Data

All mock data is located in `src/lib/mock-data/` and uses actual field names from the documentation:

- `users.ts` - User data with roles
- `reports.ts` - DSR/WSR/MSR reports
- `goals.ts` - Goals with GLS fields
- `blockers.ts` - Blockers with severity levels
- `dependencies.ts` - Dependencies
- `actions.ts` - Action items
- `analytics.ts` - Performance metrics

## 🔑 Key Features

### Role-Based Access
- EMPLOYEE
- MANAGER
- DEPT_ADMIN
- ORG_ADMIN
- ORG_OWNER
- HR
- AUDITOR

### Report Types
- **DSR** (Daily Status Report)
- **WSR** (Weekly Status Report)
- **MSR** (Monthly Status Report)
- **QSR** (Quarterly Status Report)
- **YSR** (Yearly Status Report)

### Scoring System
- **Employee Efficiency Meter** (0-100)
  - Discipline (20%)
  - Goals (25%)
  - Delivery (25%)
  - Blockers (15%)
  - Communication (15%)

## 📝 Documentation

All documentation is in the `docs/` folder:

- **[README.md](docs/README.md)** - Complete documentation
- **[QUICK_START.md](docs/QUICK_START.md)** - Get started quickly
- **[DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** - Design system & components
- **[IMPLEMENTATION_GUIDE.md](docs/IMPLEMENTATION_GUIDE.md)** - Development guide
- **[PHASE_WISE_PLAN.md](docs/PHASE_WISE_PLAN.md)** - Phase-by-phase plan
- **[TESTING_GUIDE.md](docs/TESTING_GUIDE.md)** - Testing guide
- **[TOAST_USAGE.md](docs/TOAST_USAGE.md)** - Toast notifications guide

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date**: date-fns

## 🎨 Design System

- **Primary Color**: Indigo (#6366f1)
- **Base Font Size**: 15px
- **Status Colors**: Green (success), Amber (warning), Red (error)
- **Animations**: Smooth transitions with Framer Motion
- **Accessibility**: WCAG 2.1 Level AA compliant

## 📞 Support

For questions or issues, check the documentation in the `docs/` folder or see [CURRENT_STATUS_QUICK_VIEW.md](CURRENT_STATUS_QUICK_VIEW.md).

---

**Built with ❤️ for Work Intelligence & Accountability**

# Phase-Wise Implementation Plan

> **Note**: This is a UI-only implementation using mock data. Backend integration will be added later.

---

## ✅ PHASE 1: Foundation & Setup (COMPLETED)

**Duration**: 2 days  
**Status**: ✅ COMPLETED

### Deliverables
- [x] Next.js 14 project with App Router
- [x] Tailwind CSS with custom design system
- [x] Global CSS variables for theming
- [x] Base UI components (Button, Card, Input, Badge, Skeleton)
- [x] TypeScript types and interfaces
- [x] Project structure
- [x] Mock data architecture

### Files Created
```
✓ package.json
✓ tsconfig.json
✓ tailwind.config.ts
✓ next.config.js
✓ src/styles/globals.css
✓ src/types/index.ts
✓ src/config/constants.ts
✓ src/components/ui/*.tsx
✓ src/lib/mock-data/ (folder structure)
```

---

## ✅ PHASE 2: Authentication & Role-Based Navigation (COMPLETED)

**Duration**: 3 days  
**Status**: ✅ COMPLETED

### Tasks
- [ ] Mock authentication system
- [ ] Role switcher component
- [ ] Permission checking hooks
- [ ] Role-based navigation rendering
- [ ] User context provider
- [ ] Protected route wrapper

### Components to Build
1. **AuthProvider** (`src/lib/providers/AuthProvider.tsx`)
   - Mock login/logout
   - Role switching
   - User context

2. **RoleSwitcher** (`src/components/layout/RoleSwitcher.tsx`)
   - Dropdown to switch between roles
   - For testing different views

3. **ProtectedRoute** (`src/components/auth/ProtectedRoute.tsx`)
   - Permission checking
   - Redirect logic

4. **Updated Sidebar** (`src/components/layout/Sidebar.tsx`)
   - Dynamic navigation based on role
   - Permission-gated items
   - Feature flag support

### Mock Data
```typescript
// src/lib/mock-data/users.ts
- Mock users for each role
- Permission sets
- Feature flags
```

---

## ✅ PHASE 3: Home Dashboard (Role-Based)

**Duration**: 5 days  
**Status**: ✅ COMPLETED

### Employee Dashboard (`/home`)
**Widgets:**
- [ ] Required Today (DSR submission status)
- [ ] Focus Goals (top 3-5 goals)
- [ ] Open Blockers (active blockers)
- [ ] Compliance Streak (submission history)
- [ ] Submission Calendar

**Mock Data Needed:**
- Required reports
- Active goals
- Open blockers
- Submission history

### Manager Dashboard (`/home`)
**Widgets:**
- [ ] Team Compliance Overview
- [ ] Review Queue (with SLA indicators)
- [ ] Blocker Heatmap
- [ ] At-Risk Goals
- [ ] Team Health Indicators

**Mock Data Needed:**
- Team members
- Pending reviews
- Team blockers
- Team goals
- Health metrics

### HR Dashboard (`/home`)
**Widgets:**
- [ ] Org Compliance Trend
- [ ] Manager Accountability Scores
- [ ] Appraisal Readiness
- [ ] Calibration Queue

**Mock Data Needed:**
- Org-wide metrics
- Manager scores
- Appraisal data

---

## ✅ PHASE 4: DSR Module (Daily Status Report) (COMPLETED)

**Duration**: 7 days  
**Status**: ✅ COMPLETED

### Pages to Build

#### 1. Reporting Inbox (`/reporting/inbox`)
**Content:**
- Required checklist
- Rework pending list
- Cutoff banner
- Quick actions

**Components:**
- RequiredTodayList
- ReworkPendingList
- CutoffBanner
- QuickActionButtons

#### 2. DSR Create (`/reporting/dsr/new`)
**Fields (from documentation):**
- `report_date` (Date)
- `status` (draft/submitted/locked/approved)
- `what_i_did_today` (Structured bullets)
- `blockers` (Array of blocker objects)
- `tomorrow_plan` (Structured bullets)
- `evidence_links` (Array of URLs)
- `submitted_at` (Timestamp)
- `submitted_by` (User ID)

**Features:**
- Auto-save draft (every 30 seconds)
- "Same as yesterday" button
- Add blocker inline
- Add dependency inline
- Evidence link validation
- Character count
- Save draft / Submit buttons

**Components:**
- DSRForm
- StructuredBulletInput
- BlockerInlineForm
- EvidenceLinkInput
- AutoSaveIndicator

#### 3. DSR Detail (`/reporting/dsr/[id]`)
**Sections:**
- Status header (with timeline)
- Report content (masked based on role)
- Blockers section
- Evidence section
- Comments thread
- Audit mini-panel
- Manager actions (if manager)

**Actions:**
- Edit (within window)
- Request reopen
- Add comment
- Approve (manager)
- Request rework (manager)

**Components:**
- DSRDetailHeader
- DSRContent
- BlockersList
- EvidenceList
- CommentThread
- AuditPanel
- ManagerActions

#### 4. My Reports List (`/reporting`)
**Features:**
- Filter by type (DSR/WSR/MSR)
- Filter by status
- Filter by date range
- Search
- Sort options
- Pagination

**Components:**
- ReportsList
- ReportFilters
- ReportCard
- ReportStatusBadge

### Mock Data Structure
```typescript
// src/lib/mock-data/reports.ts
interface DSRReport {
  id: string;
  tenant_id: string;
  user_id: string;
  report_type: 'DSR';
  report_date: string;
  status: 'draft' | 'submitted' | 'locked' | 'approved';
  what_i_did_today: string[];
  blockers: Blocker[];
  tomorrow_plan: string[];
  evidence_links: string[];
  submitted_at?: string;
  submitted_by?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  review_comments?: string;
  created_at: string;
  updated_at: string;
}
```

---

## 🔄 PHASE 5: Goals Module (GLS - Goal Lifecycle System) (CURRENT)

**Duration**: 7 days  
**Status**: 🔄 IN PROGRESS

### Pages to Build

#### 1. My Goals (`/goals/my`)
**Tabs:**
- Active Goals
- Completed Goals
- Deferred Goals

**Features:**
- Create goal button
- Filter by priority
- Filter by status
- Sort options

#### 2. Goals Focus (`/goals/focus`)
**Content:**
- At-risk ranking
- Effort vs impact matrix
- Recommended actions
- Priority sorting

**Visualizations:**
- Risk matrix chart
- Progress indicators
- Timeline view

#### 3. Goal Detail (`/goals/[id]`)
**Fields (from documentation):**
- `title` (String)
- `description` (Text)
- `category` (Dropdown)
- `related_project` (String)
- `success_criteria` (Required, Array)
- `priority` (low/medium/high)
- `owner` (User ID)
- `risk_level` (low/medium/high)
- `dependencies` (Array)
- `due_week` (Week number)
- `status` (not_started/in_progress/achieved/missed/deferred)
- `expected_progress` (Number)
- `actual_progress` (Number)
- `evidence_links` (Array)
- `blockers` (Array)

**Sections:**
- Goal information
- Success criteria
- Progress tracking
- Evidence
- Blockers
- Dependencies
- Activity ledger

**Actions:**
- Update progress
- Add evidence
- Add blocker
- Mark as achieved
- Defer goal
- Approve large jump (manager)

### Mock Data Structure
```typescript
// src/lib/mock-data/goals.ts
interface Goal {
  id: string;
  tenant_id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  related_project?: string;
  success_criteria: string[];
  priority: 'low' | 'medium' | 'high';
  owner: string;
  risk_level: 'low' | 'medium' | 'high';
  dependencies: string[];
  due_week: string;
  status: 'not_started' | 'in_progress' | 'achieved' | 'missed' | 'deferred';
  expected_progress: number;
  actual_progress: number;
  evidence_links: string[];
  blockers: string[];
  created_at: string;
  updated_at: string;
}
```

---

## 🚧 PHASE 6: Blockers & Dependencies Module

**Duration**: 6 days  
**Status**: ⏳ PENDING

### Pages to Build

#### 1. My Blockers (`/blockers/my`)
**Tabs:**
- Active Blockers
- Resolved Blockers

**Features:**
- Create blocker
- Filter by severity
- Sort by age

#### 2. Blocker Detail (`/blockers/[id]`)
**Fields (from documentation):**
- `title` (String)
- `description` (Text)
- `severity` (S0/S1/S2/S3)
- `owner` (User ID)
- `eta` (Date)
- `status` (open/in_progress/resolved/escalated)
- `impact` (Text)
- `escalation_history` (Array)
- `resolution_notes` (Text)
- `related_to` (report_id/goal_id)

**Actions:**
- Update status
- Set ETA
- Escalate
- Add resolution notes
- Link to report/goal

#### 3. Dependencies (`/dependencies`)
**Lifecycle Views:**
- Pending acknowledgment
- In progress
- Delivered
- Blocked

**Fields:**
- `title` (String)
- `description` (Text)
- `requester` (User ID)
- `provider` (User ID)
- `eta` (Date)
- `status` (pending_ack/in_progress/delivered/blocked)
- `acknowledged_at` (Timestamp)
- `delivered_at` (Timestamp)

### Mock Data Structure
```typescript
// src/lib/mock-data/blockers.ts
interface Blocker {
  id: string;
  tenant_id: string;
  title: string;
  description: string;
  severity: 'S0' | 'S1' | 'S2' | 'S3';
  owner: string;
  eta?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'escalated';
  impact: string;
  escalation_history: EscalationEvent[];
  resolution_notes?: string;
  related_to_type?: 'report' | 'goal';
  related_to_id?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}
```

---

## 📊 PHASE 7: Analytics Module

**Duration**: 8 days  
**Status**: ⏳ PENDING

### Pages to Build

#### 1. My Analytics (`/analytics/my`)
**Widgets:**
- Efficiency Meter (0-100)
- Score Breakdown (pie chart)
- Trend Chart (line chart)
- Compliance Metrics
- Goal Achievement Rate

**Efficiency Meter Components:**
- Discipline (20%)
- Goals (25%)
- Delivery (25%)
- Blockers (15%)
- Communication (15%)

#### 2. Team Analytics (`/analytics/team`)
**Widgets:**
- Team Compliance KPIs
- Review SLA Compliance
- Goal Reliability Score
- Blocker TTR (Time to Resolve)
- Delivery Signals
- Drilldown tables

#### 3. HR Analytics (`/analytics/hr`)
**Widgets:**
- Manager Accountability Scores
- Appraisal Readiness
- Calibration Data
- Fairness Metrics
- Cohort Analysis (min 5)

### Mock Data Structure
```typescript
// src/lib/mock-data/analytics.ts
interface EmployeeEfficiencyScore {
  user_id: string;
  period: string;
  total_score: number;
  discipline_score: number;
  goals_score: number;
  delivery_score: number;
  blockers_score: number;
  communication_score: number;
  breakdown: {
    dsr_on_time_percent: number;
    wsr_on_time_percent: number;
    goal_achievement_rate: number;
    blocker_early_raising_percent: number;
    // ... more metrics
  };
}
```

---

## 📅 PHASE 8: WSR & MSR Modules

**Duration**: 6 days  
**Status**: ⏳ PENDING

### WSR (Weekly Status Report)
**Fields:**
- Auto-rollup from DSRs
- Next week goals
- AI summary (optional)

### MSR (Monthly Status Report)
**Fields:**
- Executive summary
- Goals & outcomes
- Delivery summary
- Blocker analysis
- Efficiency trend
- Manager review
- Employee reflection

---

## 👥 PHASE 9: Reviews & Appraisals Module

**Duration**: 6 days  
**Status**: ⏳ PENDING

### Weekly Reviews (`/reviews/weekly`)
**Features:**
- Review queue
- SLA indicators
- Coaching notes
- Approve/Rework actions

### Appraisal Cycles (`/reviews/appraisals/cycles`)
**Features:**
- Cycle management
- Evidence packs
- Calibration

---

## 🎛️ PHASE 10: Admin Modules

**Duration**: 10 days  
**Status**: ⏳ PENDING

### Templates Builder
### Policies & Rules
### Automations
### User Management
### Org Structure

---

## 📱 PHASE 11: Polish & Optimization

**Duration**: 5 days  
**Status**: ⏳ PENDING

### Tasks
- Mobile responsiveness
- Accessibility (WCAG)
- Performance optimization
- Animation refinements
- Error boundaries
- Loading states
- Empty states

---

## 📊 Progress Tracking

| Phase | Status | Duration | Completion |
|-------|--------|----------|------------|
| 1. Foundation | ✅ Done | 2 days | 100% |
| 2. Auth & Navigation | ✅ Done | 3 days | 100% |
| 3. Home Dashboard | ✅ Done | 5 days | 100% |
| 4. DSR Module | ✅ Done | 7 days | 100% |
| 5. Goals Module | 🔄 In Progress | 7 days | 0% |
| 6. Blockers Module | ⏳ Pending | 6 days | 0% |
| 7. Analytics Module | ⏳ Pending | 8 days | 0% |
| 8. WSR & MSR | ⏳ Pending | 6 days | 0% |
| 9. Reviews | ⏳ Pending | 6 days | 0% |
| 10. Admin | ⏳ Pending | 10 days | 0% |
| 11. Polish | ⏳ Pending | 5 days | 0% |

**Total Estimated Duration**: 65 days (13 weeks)

---

## 🎯 Next Steps

1. ✅ Complete Phase 2 (Auth & Navigation)
2. ✅ Build Phase 3 (Home Dashboard)
3. ✅ Implement Phase 4 (DSR Module)
4. 🔄 Build Phase 5 (Goals Module - GLS)
5. Continue with remaining phases

---

**Last Updated**: February 23, 2026

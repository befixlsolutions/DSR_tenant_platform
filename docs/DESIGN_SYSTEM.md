# DSR Platform Design System

## Brand Identity

### Primary Brand Color: Indigo
- **Purpose**: Buttons, links, active navigation, primary actions
- **Palette**: 
  - `primary-500`: #6366f1 (Main brand)
  - `primary-600`: #4f46e5 (Hover states)
  - `primary-700`: #4338ca (Active states)

### Neutrals: Slate
- **Purpose**: Backgrounds, borders, text hierarchy
- **Palette**:
  - `neutral-50`: #f8fafc (Page background)
  - `neutral-100`: #f1f5f9 (Card background alt)
  - `neutral-200`: #e2e8f0 (Borders)
  - `neutral-500`: #64748b (Muted text)
  - `neutral-700`: #334155 (Body text)
  - `neutral-900`: #0f172a (Headings)

### Semantic Colors (Status Only)
- **Success** (Green): Submitted, on-time, completed
  - `green-500`: #22c55e
- **Warning** (Amber): Pending, rework, at-risk
  - `amber-500`: #f59e0b
- **Danger** (Red): Blocked, S0-S1 severity, overdue
  - `red-500`: #ef4444

## Typography Hierarchy

### Scale
```
Page Title:      24px / semibold / neutral-900
Section Title:   18px / semibold / neutral-900
Card Title:      16px / semibold / neutral-900
Label:           14px / medium / neutral-700
Body:            15px / regular / neutral-700
Secondary:       12px / medium / neutral-600
Muted:           12px / regular / neutral-500
```

### Usage
- **h1**: Page titles (Dashboard, Team Dashboard)
- **h2**: Section titles (Required Today, Focus Goals)
- **h3**: Card titles, widget headers
- **p**: Body text, descriptions
- **.text-muted**: Secondary information
- **.text-secondary**: Labels, timestamps

## Card System

### Base Card
```css
background: white
border: 1px solid neutral-200
border-radius: 12px
padding: 16px
shadow: subtle (0 1px 2px rgba(0,0,0,0.05))
```

### Hover State
```css
shadow: 0 4px 6px rgba(0,0,0,0.05)
border-color: neutral-300
```

### Card Variants
1. **KPI Card**: Stats with trends
2. **Widget Card**: Dashboard widgets
3. **List Card**: Tables, lists
4. **Form Card**: Input sections

## Component Patterns

### Buttons
```tsx
// Primary - Main actions
<button className="btn btn-primary">Submit DSR</button>

// Secondary - Alternative actions
<button className="btn btn-secondary">Save Draft</button>

// Ghost - Tertiary actions
<button className="btn btn-ghost">Cancel</button>
```

### Badges
```tsx
// Status badges only
<span className="badge badge-success">Submitted</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-danger">Blocked</span>
```

### KPI Cards
```tsx
<div className="kpi-card">
  <div className="kpi-label">Submitted Today</div>
  <div className="kpi-value">6</div>
  <div className="kpi-trend kpi-trend-up">+3% vs last week</div>
  {/* Sparkline chart */}
</div>
```

## Layout Patterns

### Page Structure
```tsx
<div className="space-y-6">
  {/* Page Header */}
  <div>
    <h1>Dashboard</h1>
    <p className="text-muted">Welcome back! Here's your overview</p>
  </div>

  {/* Today Focus Strip (if applicable) */}
  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
    {/* Urgent items */}
  </div>

  {/* Main Content Grid */}
  <div className="grid grid-cols-3 gap-4">
    {/* Content */}
  </div>
</div>
```

### Dashboard Grid
- **2-column**: Main content (2/3) + Sticky sidebar (1/3)
- **3-column**: KPI cards
- **4-column**: Stat cards

## Navigation

### Sidebar
- **Active item**: 
  - Background: primary-50
  - Text: primary-700
  - Left accent bar: primary-700
- **Hover**: Background: neutral-50
- **Sections**: Collapsible with chevron
- **Badges**: Only for critical counts (Inbox, Review queue)

### Top Bar
- **Height**: 56px (3.5rem)
- **Search**: Command palette style (⌘K)
- **Create button**: Primary action
- **Profile**: Right-aligned

## Spacing System

```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
```

### Usage
- **Page padding**: 24px (lg)
- **Card padding**: 16px (md)
- **Section gap**: 24px (lg)
- **Card gap**: 16px (md)

## Shadows

```css
/* Card default */
shadow-sm: 0 1px 2px rgba(0,0,0,0.05)

/* Card hover */
shadow-md: 0 4px 6px rgba(0,0,0,0.05)

/* Dropdown */
shadow-lg: 0 10px 15px rgba(0,0,0,0.08)
```

## Border Radius

```
sm:  8px   (buttons, inputs)
md:  12px  (cards, badges)
lg:  16px  (modals, large cards)
xl:  20px  (page sections)
full: 9999px (pills, avatars)
```

## Animations

### Transitions
```css
/* Default */
transition: all 200ms ease

/* Hover effects */
hover:scale-105
hover:shadow-md

/* Loading states */
animate-pulse
animate-spin
```

### Microinteractions
1. **Button click**: Scale down (0.98)
2. **Card hover**: Lift with shadow
3. **Dropdown**: Fade + slide
4. **Toast**: Slide from right
5. **Modal**: Fade + scale

## Accessibility

### Focus States
```css
focus:outline-none
focus:ring-2
focus:ring-primary-500
focus:ring-offset-2
```

### Keyboard Navigation
- Tab order logical
- Enter to submit
- Escape to close
- Arrow keys for lists

### Color Contrast
- Text on white: minimum 4.5:1
- Interactive elements: minimum 3:1
- Status colors: WCAG AA compliant

## Empty States

```tsx
<div className="text-center py-12">
  <Icon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
  <h3 className="text-base font-medium text-neutral-900 mb-2">
    No reports yet
  </h3>
  <p className="text-sm text-neutral-500 mb-4">
    Get started by creating your first DSR
  </p>
  <button className="btn btn-primary">Create DSR</button>
</div>
```

## Loading States

### Skeleton Loaders
```tsx
<div className="space-y-4">
  <div className="skeleton h-8 w-48"></div>
  <div className="skeleton h-24 w-full"></div>
  <div className="skeleton h-24 w-full"></div>
</div>
```

### Spinner
```tsx
<div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
</div>
```

## Chart Guidelines

### Colors
- Primary data: Indigo
- Secondary data: Neutral-400
- Success: Green
- Warning: Amber
- Danger: Red

### Tooltips
Must include:
- Metric definition
- Data period (last 7 days)
- Scope (team/department)
- Actual value

### Controls
- Date range picker (top-right)
- Scope selector (if applicable)
- Export button (optional)

## Best Practices

### Do's
✅ Use Indigo for all primary actions
✅ Use semantic colors only for status
✅ Maintain consistent spacing
✅ Add hover states to interactive elements
✅ Include loading states
✅ Show empty states with CTAs
✅ Use skeleton loaders
✅ Add keyboard shortcuts

### Don'ts
❌ Mix multiple accent colors
❌ Use colors randomly
❌ Forget focus states
❌ Skip loading indicators
❌ Use pure white backgrounds everywhere
❌ Ignore empty states
❌ Make everything clickable look the same

## Implementation Checklist

- [ ] Update all buttons to use Indigo
- [ ] Replace random colors with semantic ones
- [ ] Add KPI sparklines and trends
- [ ] Implement skeleton loaders
- [ ] Add "Today Focus" strip
- [ ] Create sticky action column
- [ ] Add command palette (⌘K)
- [ ] Implement chart tooltips
- [ ] Add keyboard navigation
- [ ] Test color contrast

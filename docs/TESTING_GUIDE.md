# Testing Guide - Role-Based Navigation

## 🚀 Quick Start

1. **Start the development server**:
```bash
npm run dev
```

2. **Open your browser**:
```
http://localhost:3000
```

3. **You'll see**:
   - Top navigation bar with search and notifications
   - Role switcher in the top-right (shows current role)
   - Left sidebar with navigation (filtered by role)

## 🎭 Testing Different Roles

### How to Switch Roles

1. Click on the **user avatar** in the top-right corner
2. A dropdown will appear showing all 7 roles
3. Click on any role to switch
4. The navigation will update automatically

### What to Test for Each Role

#### 🔵 EMPLOYEE Role
**Expected Navigation**:
- Home → Dashboard
- Reporting → Inbox, My Reports
- Goals → My Goals, Focus (GLS)
- Blockers → My Blockers
- Dependencies → All Dependencies
- Actions → My Actions
- Analytics → My Analytics
- Support → Tickets, Knowledge Base

**What You Should NOT See**:
- Team Reports
- Department Reports
- Admin section
- HR Analytics

#### 🟣 MANAGER Role
**Expected Navigation** (Everything EMPLOYEE has, plus):
- Reporting → Team Reports, Approvals
- Goals → Team Goals
- Blockers → Team Blockers
- Actions → Team Actions
- People → Directory, Org Chart
- Analytics → Team Analytics
- Reviews & Appraisals → Weekly Reviews, Appraisal Cycles

**What You Should NOT See**:
- Department Reports
- Admin section
- HR Analytics

#### 🟠 DEPT_ADMIN Role
**Expected Navigation** (Everything MANAGER has, plus):
- Reporting → Department Reports
- Goals → Department Goals
- Blockers → Department Blockers
- Analytics → Department Analytics
- Admin → Overview, Org Structure

**What You Should NOT See**:
- Full Admin section (Users, Roles, Templates, etc.)
- Billing

#### 🔴 ORG_ADMIN Role
**Expected Navigation** (Everything DEPT_ADMIN has, plus):
- Reporting → Org Reports, Exports, Templates
- Goals → Org Goals, Config
- Analytics → Org Analytics
- Admin → Full section:
  - Users
  - Roles & Permissions
  - Org Structure
  - Templates
  - Policies & Rules
  - Automations
  - Notifications
  - AI Settings
  - Audit & Security

**What You Should NOT See**:
- Billing (only ORG_OWNER can see this)

#### 🟣 ORG_OWNER Role
**Expected Navigation** (Everything ORG_ADMIN has, plus):
- Admin → Billing

**This role has access to EVERYTHING**

#### 🟢 HR Role
**Expected Navigation** (Limited to HR functions):
- Home → Dashboard
- People → Directory
- Analytics → HR Analytics
- Reviews & Appraisals → Weekly Reviews, Appraisal Cycles, Calibration

**What You Should NOT See**:
- Reporting section
- Goals section
- Blockers section
- Admin section

#### ⚫ AUDITOR Role
**Expected Navigation** (Read-only access):
- Home → Dashboard
- Reporting → Org Reports (read-only)
- Analytics → Org Analytics (read-only)
- Audit → Logs, Exports, Security

**What You Should NOT See**:
- Create/Edit buttons
- Admin section
- Team/Department views

## 🧪 Test Scenarios

### Scenario 1: Employee Daily Workflow
1. Switch to **EMPLOYEE** role
2. Navigate to **Reporting → Inbox**
3. Check if you can see "Required Today" items
4. Navigate to **Goals → My Goals**
5. Navigate to **Blockers → My Blockers**
6. Navigate to **Analytics → My Analytics**

**Expected**: All pages should be accessible

### Scenario 2: Manager Team Management
1. Switch to **MANAGER** role
2. Navigate to **Reporting → Team Reports**
3. Navigate to **Goals → Team Goals**
4. Navigate to **Reviews & Appraisals → Weekly Reviews**
5. Navigate to **People → Directory**

**Expected**: All team-level features visible

### Scenario 3: Admin Configuration
1. Switch to **ORG_ADMIN** role
2. Navigate to **Admin → Users**
3. Navigate to **Admin → Templates**
4. Navigate to **Admin → Policies & Rules**
5. Try to access **Admin → Billing**

**Expected**: All admin features visible EXCEPT Billing

### Scenario 4: HR Analytics
1. Switch to **HR** role
2. Navigate to **Analytics → HR Analytics**
3. Navigate to **Reviews & Appraisals**
4. Try to access **Reporting → My Reports**

**Expected**: HR features visible, Reporting NOT visible

### Scenario 5: Auditor Read-Only
1. Switch to **AUDITOR** role
2. Navigate to **Audit → Logs**
3. Try to access **Admin** section

**Expected**: Audit features visible, Admin NOT visible

## 🎨 Visual Indicators

### Role Colors
- 🔵 **EMPLOYEE**: Blue
- 🟣 **MANAGER**: Purple
- 🟠 **DEPT_ADMIN**: Orange
- 🔴 **ORG_ADMIN**: Red
- 🟣 **ORG_OWNER**: Pink
- 🟢 **HR**: Green
- ⚫ **AUDITOR**: Gray

### Navigation States
- **Active**: Purple background with left border
- **Hover**: Light gray background
- **Inactive**: White background

### Permission Badges
- **Badge with number**: Indicates pending items (e.g., "3" on Inbox)
- **Section headers**: Grouped by functionality

## 🐛 Common Issues & Solutions

### Issue: Navigation doesn't update after role switch
**Solution**: Refresh the page or check browser console for errors

### Issue: Can't see expected menu items
**Solution**: 
1. Check if you're using the correct role
2. Verify the role switcher shows the expected role
3. Check browser console for permission errors

### Issue: Access Denied screen appears
**Solution**: This is expected! It means the permission system is working. The screen will show which permissions are required.

## 📊 Permission Testing Matrix

| Feature | EMPLOYEE | MANAGER | DEPT_ADMIN | ORG_ADMIN | ORG_OWNER | HR | AUDITOR |
|---------|----------|---------|------------|-----------|-----------|----|---------| 
| My Reports | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Team Reports | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Dept Reports | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Org Reports | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| My Goals | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Team Goals | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| My Analytics | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Team Analytics | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| HR Analytics | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Admin Users | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Admin Billing | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Reviews | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Audit Logs | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |

## 🎯 Success Criteria

Phase 2 is working correctly if:

- ✅ You can switch between all 7 roles
- ✅ Navigation updates automatically
- ✅ Each role sees only their permitted items
- ✅ Access denied screen appears for unauthorized pages
- ✅ Role colors display correctly
- ✅ No console errors
- ✅ Sidebar sections are properly grouped
- ✅ Icons display for all menu items

## 📝 Reporting Issues

If you find any issues:

1. Note the current role
2. Note the page you're trying to access
3. Check browser console for errors
4. Take a screenshot if possible
5. Document the expected vs actual behavior

---

**Happy Testing! 🎉**

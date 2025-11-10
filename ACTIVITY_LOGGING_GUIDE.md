# Activity Logging System - Complete Guide

## Overview

A comprehensive activity logging system has been implemented to track all user actions, system events, and errors in your Masroo3k Business Intelligence Platform.

---

## ✅ Features Implemented

### 1. **Database Schema**
- **ActivityLog Model** with the following fields:
  - `Id` - Unique identifier
  - `Action` - Type of action (Login, Logout, Create, Update, Delete, Error, etc.)
  - `EntityType` - What was affected (User, Analysis, Template, System)
  - `EntityId` - ID of the affected entity (optional)
  - `Description` - Human-readable description
  - `Details` - Additional JSON details (optional)
  - `IpAddress` - Client IP address
  - `UserAgent` - Browser/client information
  - `CreatedAt` - Timestamp
  - `Severity` - Info, Warning, Error, Critical
  - `UserId` - User who performed the action (optional for system events)

### 2. **Backend APIs**

#### **GET /api/activity-logs**
Retrieve activity logs with filtering and pagination

**Query Parameters:**
- `action` - Filter by action type
- `entityType` - Filter by entity type
- `severity` - Filter by severity level
- `startDate` - Filter from date
- `endDate` - Filter to date
- `searchTerm` - Search in description, IP, user name/email
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 50)

**Response:**
```json
{
  "logs": [...],
  "total": 150,
  "page": 1,
  "pageSize": 50,
  "totalPages": 3
}
```

#### **GET /api/activity-logs/stats**
Get statistics about activity logs

**Response:**
```json
{
  "todayCount": 25,
  "last7DaysCount": 180,
  "last30DaysCount": 850,
  "totalCount": 1500,
  "errorCount": 12,
  "warningCount": 35,
  "actionStats": [
    { "action": "Login", "count": 450 },
    { "action": "Create", "count": 320 }
  ],
  "recentErrors": [...]
}
```

#### **GET /api/activity-logs/actions**
Get list of all unique actions in the logs

#### **GET /api/activity-logs/entity-types**
Get list of all unique entity types

#### **DELETE /api/activity-logs/clear**
Clear old logs (default: older than 90 days)

**Query Parameters:**
- `daysToKeep` - Number of days to keep (default: 90)

### 3. **Automatic Logging**

The system automatically logs:

#### **Authentication Events:**
- ✅ Successful login
- ✅ Failed login attempts (with IP tracking)
- ✅ User signup
- ✅ Logout (when implemented)

#### **User Management:**
- ✅ User creation
- ✅ User updates
- ✅ User deletion

#### **Analysis Operations:**
- ✅ Analysis creation
- ✅ Analysis updates
- ✅ Analysis deletion

#### **System Errors:**
- ✅ Application errors
- ✅ AI service failures
- ✅ Database errors

### 4. **Admin Dashboard**

**Location:** Admin Panel → Activity Logs

**Features:**
- 📊 **Statistics Cards**: Today, Last 7 Days, Warnings, Errors
- 🔍 **Search**: Search by description, IP, user name/email
- 🎯 **Filters**: By action, severity level
- 📄 **Pagination**: Browse through logs (50 per page)
- 🔄 **Refresh**: Manual refresh button
- 🗑️ **Clear Old Logs**: Delete logs older than 90 days
- 🎨 **Color-coded Severity**:
  - Blue: Info
  - Yellow: Warning
  - Red: Error/Critical

---

## 📋 Logged Actions

### Action Types

| Action | Description | Severity | Entity Type |
|--------|-------------|----------|-------------|
| **Login** | Successful user login | Info | User |
| **LoginFailed** | Failed login attempt | Warning | User |
| **Logout** | User logged out | Info | User |
| **Signup** | New user registration | Info | User |
| **Create** | Created new entity | Info | User/Analysis/Template |
| **Update** | Updated existing entity | Info | User/Analysis/Template |
| **Delete** | Deleted entity | Warning | User/Analysis/Template |
| **View** | Viewed entity details | Info | Analysis/Report |
| **Error** | System error occurred | Error | System |

---

## 💻 Technical Implementation

### Backend Components

1. **Models**
   - `ActivityLog.cs` - Database model

2. **DTOs**
   - `ActivityLogDTOs.cs` - Response and filter models

3. **Services**
   - `IActivityLogService.cs` - Service interface
   - `ActivityLogService.cs` - Service implementation

4. **Controllers**
   - `ActivityLogsController.cs` - API endpoints
   - `AuthController.cs` - Updated with logging

5. **Database**
   - Migration: `20251027113534_AddActivityLogs`
   - Indexes on: Action, CreatedAt, Severity, UserId

### Frontend Components

1. **Pages**
   - `AdminLogs.tsx` - Complete activity log viewer

2. **Features**
   - Real-time data fetching
   - Search with debouncing (500ms)
   - Filter by action and severity
   - Pagination
   - Stats display
   - Responsive table design

---

## 🎯 Usage Examples

### View Activity Logs

1. **Login as Admin:**
   - Email: `admin@mashroo3k.com`
   - Password: `admin123`

2. **Navigate to:**
   - Admin Panel → Activity Logs tab

3. **View Logs:**
   - See all activities in real-time
   - Search for specific events
   - Filter by action type or severity
   - View user details, timestamps, IP addresses

### Search Logs

**Search for specific user:**
```
Search: "admin@mashroo3k.com"
```

**Search by IP:**
```
Search: "192.168.1"
```

**Search by description:**
```
Search: "login"
```

### Filter Logs

**View only errors:**
1. Select "Error" from Severity dropdown
2. See all error events

**View login activities:**
1. Select "Login" from Action dropdown
2. See all login events

### Clear Old Logs

1. Click "Clear Old Logs" button
2. Confirm deletion
3. Logs older than 90 days will be removed

---

## 📊 Statistics

The stats cards show:

1. **Today** - Activities in the last 24 hours
2. **Last 7 Days** - Activities in the last week
3. **Warnings** - Total warning-level events
4. **Errors** - Total error-level events

---

## 🔧 How It Works

### Login Flow Example

```
1. User enters credentials
        ↓
2. AuthController validates
        ↓
3. If successful:
   - User logged in
   - ActivityLogService.LogLoginAsync() called
   - Log entry created with:
     * Action: "Login"
     * EntityType: "User"
     * Description: "User logged in successfully"
     * UserId: user.Id
     * IpAddress: Client IP
     * UserAgent: Browser info
     * Severity: "Info"
        ↓
4. Log saved to database
        ↓
5. Visible in Admin Panel immediately
```

### Failed Login Flow

```
1. User enters wrong credentials
        ↓
2. AuthController detects invalid login
        ↓
3. ActivityLogService.LogAsync() called
   - Action: "LoginFailed"
   - Description: "Failed login attempt for email: {email}"
   - Severity: "Warning"
   - No UserId (failed attempt)
        ↓
4. Admin can see suspicious activities
```

---

## 🎨 UI Features

### Log Table Columns

1. **Time** - Relative time (e.g., "5m ago", "2h ago")
2. **User** - User name and email (or "System")
3. **Action** - Blue badge with action type
4. **Description** - What happened + entity info
5. **IP Address** - Client IP in monospace font
6. **Severity** - Color-coded badge with icon

### Color Coding

**Severity Badges:**
- 🔵 **Info** - Blue background, blue text
- 🟡 **Warning** - Yellow background, yellow text
- 🔴 **Error** - Red background, red text
- 🔴 **Critical** - Red background, red text

**Icons:**
- ℹ️ Info - Blue info circle
- ⚠️ Warning - Yellow triangle
- ❌ Error - Red alert circle

---

## 🔐 Security Considerations

### IP Tracking
- Every action is logged with client IP address
- Helps identify suspicious activities
- Track login attempts from different locations

### Failed Login Monitoring
- All failed login attempts are logged
- Severity: Warning
- Can identify brute force attempts
- Shows attempted email addresses

### Data Retention
- Logs can be cleared after 90 days
- Keeps database size manageable
- Maintains performance

---

## 📈 Performance

### Database Indexes

Optimized for fast queries:
```sql
INDEX on Action      -- Fast filtering by action
INDEX on CreatedAt   -- Fast date range queries
INDEX on Severity    -- Fast severity filtering
INDEX on UserId      -- Fast user-specific queries
```

### Pagination

- Default: 50 logs per page
- Prevents loading thousands of records
- Fast page navigation
- Shows total count

### Search Optimization

- Debounced search (500ms delay)
- Prevents excessive API calls
- Searches across:
  - Description
  - IP Address
  - User Name
  - User Email

---

## 🚀 Future Enhancements (Optional)

### 1. Real-time Updates
- WebSocket integration
- Live log streaming
- Auto-refresh

### 2. Export Functionality
- Export logs to CSV
- Export logs to PDF
- Email reports

### 3. Advanced Analytics
- Login patterns
- User activity heatmaps
- Error trend analysis
- Geographical IP mapping

### 4. Alerts
- Email alerts for errors
- Slack notifications
- SMS alerts for critical events

### 5. Audit Trail
- Complete change history
- Before/after values
- Compliance reporting

---

## 🧪 Testing the System

### Test Login Logging

1. **Logout** from the application
2. **Login** again with admin credentials
3. **Go to Activity Logs**
4. **Verify:**
   - New "Login" entry appears
   - Shows your IP address
   - Shows current browser info
   - Severity: Info

### Test Failed Login

1. **Logout**
2. **Try to login** with wrong password
3. **Login** with correct credentials
4. **Go to Activity Logs**
5. **Verify:**
   - "LoginFailed" entry (Warning)
   - "Login" entry (Info)

### Test User Management

1. **Go to Admin → Users**
2. **Add a new user**
3. **Edit the user**
4. **Delete the user**
5. **Check Activity Logs**
6. **Verify** all three actions are logged

### Test Filtering

1. **Select "Login" from Actions dropdown**
2. **Verify** only login events show
3. **Select "Warning" from Severity dropdown**
4. **Verify** only warnings show

### Test Search

1. **Type admin** in search box
2. **Wait 500ms** (debounce)
3. **Verify** shows only admin-related logs

---

## 📝 Database Schema

```sql
CREATE TABLE ActivityLogs (
    Id INT PRIMARY KEY IDENTITY,
    Action NVARCHAR(450) NOT NULL,
    EntityType NVARCHAR(MAX) NOT NULL,
    EntityId INT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Details NVARCHAR(MAX) NULL,
    IpAddress NVARCHAR(MAX) NOT NULL,
    UserAgent NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL,
    Severity NVARCHAR(450) NOT NULL,
    UserId INT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE SET NULL
);

CREATE INDEX IX_ActivityLogs_Action ON ActivityLogs(Action);
CREATE INDEX IX_ActivityLogs_CreatedAt ON ActivityLogs(CreatedAt);
CREATE INDEX IX_ActivityLogs_Severity ON ActivityLogs(Severity);
CREATE INDEX IX_ActivityLogs_UserId ON ActivityLogs(UserId);
```

---

## ✅ Summary

**You now have:**
- ✅ Complete activity logging system
- ✅ Automatic logging for all key actions
- ✅ Beautiful admin interface
- ✅ Search and filtering
- ✅ Statistics dashboard
- ✅ Security monitoring (failed logins)
- ✅ IP address tracking
- ✅ Severity levels
- ✅ Pagination for performance
- ✅ Log cleanup functionality

**All user actions and system events are now being tracked and can be viewed in the Admin Panel!** 🎉

---

## 📞 Accessing Activity Logs

1. **Login** as admin
2. **Go to:** Admin Panel
3. **Click:** Activity Logs tab
4. **View:** All application activities in real-time!

Enjoy your comprehensive activity monitoring system! 🚀

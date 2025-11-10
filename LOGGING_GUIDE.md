# Application Logging Guide

## Overview
The Masroo3k platform now has comprehensive logging enabled for both backend (.NET API) and frontend (React). This guide explains how to monitor, understand, and use the logging system.

## Backend Logging (.NET API)

### Configuration Files

**appsettings.Development.json** - Development logging settings:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Information",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information",
      "Masroo3k.Api": "Debug"
    },
    "Console": {
      "IncludeScopes": true,
      "TimestampFormat": "HH:mm:ss "
    }
  }
}
```

### Log Levels Explained

1. **Debug** - Detailed diagnostic information for developers
2. **Information** - General informational messages about application flow
3. **Warning** - Potentially harmful situations
4. **Error** - Error events that still allow the application to continue
5. **Critical** - Very severe error events that might cause the application to abort

### What's Logged

#### Application Startup
```
16:19:34 info: Program[0]
      ========================================
16:19:34 info: Program[0]
      Masroo3k Business Intelligence Platform
16:19:34 info: Program[0]
      ========================================
16:19:34 info: Program[0]
      Starting application...
```

#### Database Operations
- Database seeding
- Migrations status
- All SQL queries executed
- Command execution times

Example:
```
16:19:36 info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (2ms) [Parameters=[@__userId_0='?' (DbType = Int32)], CommandType='Text', CommandTimeout='30']
      SELECT [n].[Id], [n].[Title], [n].[Message] FROM [Notifications] AS [n]
```

#### HTTP Requests
- All incoming requests (method, path, protocol)
- Request duration
- Response status codes
- CORS policy execution

Example:
```
16:19:36 info: Microsoft.AspNetCore.Hosting.Diagnostics[1]
      Request starting HTTP/2 GET https://localhost:7140/api/notifications/user/1 - application/json -
16:19:36 info: Microsoft.AspNetCore.Hosting.Diagnostics[2]
      Request finished HTTP/2 GET https://localhost:7140/api/notifications/user/1 - 200 - application/json;+charset=utf-8 63.2866ms
```

#### Controller Actions
- Route matching
- Controller and action execution
- Action parameters
- Action execution time

Example:
```
16:19:36 info: Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker[102]
      Route matched with {action = "GetUserNotifications", controller = "Notifications"}
```

#### Custom Application Logs
Controllers now log their operations:

```csharp
_logger.LogInformation("Fetching activity logs - Page: {Page}, PageSize: {PageSize}", page, pageSize);
_logger.LogInformation("Found {Total} activity logs matching criteria", total);
```

### Viewing Backend Logs

#### In Terminal
Run the backend with:
```bash
cd Masroo3k.Api
dotnet run --launch-profile https
```

All logs will appear in the console with timestamps and colored output.

#### Log File (Future Enhancement)
To save logs to a file, add to Program.cs:
```csharp
builder.Logging.AddFile("Logs/app-{Date}.log");
```

## Frontend Logging (React)

### Logger Utility

Located at: `utils/logger.ts`

**Features:**
- Colored console output
- Timestamp for each log
- Log level filtering
- Auto-disabled in production (except warnings and errors)

### Usage Examples

```typescript
import logger from '../utils/logger';

// Debug information (development only)
logger.debug('Checking for stored user session...');

// General information
logger.info('Login attempt for:', email);

// Success messages
logger.success('Login successful:', email, '- Role:', role);

// Warnings
logger.warn('Session expired, redirecting to login');

// Errors
logger.error('API call failed:', error);

// Grouped logs
logger.group('Analysis Creation');
logger.info('Step 1: Validating input');
logger.info('Step 2: Calling API');
logger.groupEnd();

// Table output
logger.table(analysisData);
```

### Log Levels

1. **DEBUG** (Gray) - Development debugging info
2. **INFO** (Blue) - General information
3. **SUCCESS** (Green) - Successful operations
4. **WARN** (Orange) - Warnings
5. **ERROR** (Red) - Errors

### What's Logged

#### Authentication
```
[16:19:36] INFO Checking for stored user session...
[16:19:36] SUCCESS User session restored: admin@example.com
[16:19:40] INFO Login attempt for: user@example.com
[16:19:41] SUCCESS Login successful: user@example.com - Role: user
[16:19:41] INFO Navigating to dashboard
```

#### API Calls
```
[16:19:42] DEBUG API GET /api/dashboard/stats
[16:19:42] SUCCESS API GET /api/dashboard/stats succeeded
[16:19:42] DEBUG API GET /api/dashboard/recent-analyses
[16:19:42] SUCCESS API GET /api/dashboard/recent-analyses succeeded
```

#### Errors
```
[16:19:45] ERROR API GET /api/analyses failed: Network error
[16:19:45] ERROR Login failed for: wrong@email.com Error: Invalid credentials
```

### Viewing Frontend Logs

1. Open browser DevTools (F12)
2. Go to Console tab
3. See colored, timestamped logs
4. Filter by log level using console filters

## Activity Logs (Admin Panel)

### Accessing Activity Logs

1. Login as admin
2. Navigate to Admin → Activity Logs
3. View real-time system activity

### Features

- **Auto-refresh**: Updates every 5 seconds (configurable)
- **Search**: Full-text search across descriptions, IPs, users
- **Filters**: By action type, severity level
- **Statistics**: Today's count, 7-day count, errors, warnings
- **Pagination**: 50 logs per page

### What's Tracked

1. **User Actions**
   - Login/Logout
   - Profile updates
   - Password changes

2. **Analysis Operations**
   - Create
   - Update
   - Delete

3. **Admin Actions**
   - User management
   - Template management
   - System configuration

4. **System Events**
   - Errors
   - Warnings
   - Critical issues

### Activity Log Endpoints

```
GET /api/activitylogs
GET /api/activitylogs/stats
GET /api/activitylogs/actions
GET /api/activitylogs/entity-types
DELETE /api/activitylogs/clear?daysToKeep=90
```

## Monitoring Best Practices

### Development

1. **Keep Console Open**: Always have terminal and browser console visible
2. **Watch for Errors**: Red logs indicate issues
3. **Monitor Performance**: Check API response times
4. **Database Queries**: Review query efficiency in logs

### Production (Future)

1. **Log to Files**: Enable file logging for persistence
2. **Log Rotation**: Automatically archive old logs
3. **Error Alerts**: Set up notifications for critical errors
4. **Log Analysis**: Use tools like Seq or ELK stack
5. **Performance Monitoring**: Track slow queries and requests

## Troubleshooting with Logs

### Issue: Page Not Loading

**Check Backend Logs:**
```
Look for: Request starting HTTP/2 GET ...
Check: Response status code (should be 200)
Watch for: SQL errors or exceptions
```

**Check Frontend Logs:**
```
Look for: API GET /api/... messages
Check: Error logs with red color
Verify: Network tab for failed requests
```

### Issue: Login Failing

**Backend Logs:**
```
Look for: "Login attempt" or "LoginFailed" activity logs
Check: SQL queries for user lookup
Watch for: BCrypt verification failures
```

**Frontend Logs:**
```
[TIME] INFO Login attempt for: email@example.com
[TIME] ERROR Login failed for: email@example.com
```

### Issue: Slow Performance

**Backend Logs:**
```
Check: DbCommand execution times
Look for: Queries taking > 100ms
Watch for: N+1 query problems
```

**Frontend Logs:**
```
Check: API call durations
Look for: Multiple redundant calls
Monitor: Component render logs
```

## Configuration Options

### Backend Log Levels

Change in `appsettings.Development.json`:

- **More Verbose**: Set to "Debug" or "Trace"
- **Less Verbose**: Set to "Warning" or "Error"
- **SQL Queries**: Control with `Microsoft.EntityFrameworkCore.Database.Command`

### Frontend Logger

Modify `utils/logger.ts`:

```typescript
// Enable all levels even in production
this.enabledLevels = new Set([
    LogLevel.DEBUG, 
    LogLevel.INFO, 
    LogLevel.WARN, 
    LogLevel.ERROR, 
    LogLevel.SUCCESS
]);

// Change timestamp format
const timestamp = new Date().toISOString(); // Full ISO format
```

## Log Examples by Feature

### User Login Flow

**Backend:**
```
16:20:15 info: Request starting HTTP/2 POST https://localhost:7140/api/auth/login
16:20:15 info: Executing endpoint 'AuthController.Login'
16:20:15 info: Executed DbCommand (2ms) SELECT * FROM Users WHERE Email = @email
16:20:15 info: ActivityLog: User logged in successfully
16:20:15 info: Request finished - 200 - application/json - 45ms
```

**Frontend:**
```
[16:20:15] INFO Login attempt for: user@example.com
[16:20:15] DEBUG API POST /api/auth/login
[16:20:15] SUCCESS API POST /api/auth/login succeeded
[16:20:15] SUCCESS Login successful: user@example.com - Role: user
[16:20:15] INFO Navigating to dashboard
```

### Analysis Creation

**Backend:**
```
16:21:30 info: Request starting HTTP/2 POST https://localhost:7140/api/analyses
16:21:30 info: Creating analysis for user 2
16:21:35 info: AI analysis completed - Score: 85
16:21:35 info: Executed DbCommand (3ms) INSERT INTO Analyses ...
16:21:35 info: Notification created for user 2
16:21:35 info: Notification created for admin users
16:21:35 info: ActivityLog: Created new Analysis
16:21:35 info: Request finished - 201 - application/json - 5234ms
```

**Frontend:**
```
[16:21:30] INFO Submitting analysis...
[16:21:30] DEBUG API POST /api/analyses
[16:21:35] SUCCESS API POST /api/analyses succeeded
[16:21:35] SUCCESS Analysis created successfully
[16:21:35] INFO Redirecting to report page
```

### Admin Viewing Logs

**Backend:**
```
16:22:10 info: ActivityLogsController - Fetching activity logs
16:22:10 info: Page: 1, PageSize: 50, Action: All, Severity: All
16:22:10 info: Executed DbCommand (15ms) SELECT * FROM ActivityLogs ...
16:22:10 info: Found 127 activity logs matching criteria
16:22:10 info: Returning 50 logs for page 1
```

**Frontend:**
```
[16:22:10] DEBUG API GET /api/activitylogs?page=1&pageSize=50
[16:22:10] SUCCESS API GET /api/activitylogs succeeded
[16:22:10] INFO Loaded 50 activity logs
```

## Summary

### Backend Logs Show:
✅ Application startup and configuration
✅ All HTTP requests and responses
✅ Database queries with execution times
✅ Controller actions and routing
✅ Custom application events
✅ Error stack traces

### Frontend Logs Show:
✅ User authentication flow
✅ API call lifecycle
✅ Navigation events
✅ Data loading states
✅ Error messages
✅ Success confirmations

### Activity Logs Track:
✅ User actions (login, logout, updates)
✅ Data modifications (create, update, delete)
✅ Admin operations
✅ System events
✅ Security events

The logging system is now fully functional and ready for monitoring and debugging!

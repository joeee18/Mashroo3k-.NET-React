# Verification Guide for Masroo3k Setup

This guide will help you verify that all components of the Masroo3k platform are properly configured.

## Prerequisites Check

Before running the verification steps, ensure you have:

- [ ] MySQL Server running
- [ ] .NET 8 SDK installed
- [ ] Node.js and npm installed
- [ ] Google Gemini API key

## Verification Steps

### 1. Database Verification

Connect to your MySQL server and run these queries:

```sql
-- Check if the database exists
SHOW DATABASES LIKE 'Masroo3k';

-- Check if all tables exist
USE Masroo3k;
SHOW TABLES;

-- Verify default data was inserted
SELECT COUNT(*) FROM Users;
SELECT COUNT(*) FROM Templates;
```

Expected results:
- Database "Masroo3k" should exist
- 5 tables should be present (Users, Templates, Analyses, ActivityLogs, Notifications)
- Users table should have 2 records
- Templates table should have 5 records

### 2. Backend Verification

Navigate to the `Masroo3k.Api` directory and run:

```bash
# Check .NET version
dotnet --version

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the application
dotnet run
```

Expected results:
- .NET version should be 8.x
- Restore should complete without errors
- Build should complete successfully
- Application should start and display startup messages
- API should be accessible at http://localhost:5218

### 3. Frontend Verification

In the root project directory, run:

```bash
# Check Node.js and npm versions
node --version
npm --version

# Install dependencies
npm install

# Check for build errors
npm run build
```

Expected results:
- Node.js version should be 16+
- npm version should be displayed
- Dependencies should install without errors
- Build should complete successfully

### 4. Integration Verification

With both backend and frontend running:

1. Open a browser and navigate to http://localhost:5173
2. Try logging in with the default admin credentials:
   - Email: admin@mashroo3k.com
   - Password: admin123
3. Navigate to the dashboard
4. Try creating a new analysis

Expected results:
- Login should be successful
- Dashboard should load without errors
- Analysis creation form should be accessible
- No console errors in browser developer tools

## Common Verification Commands

### Database Commands
```bash
# Connect to MySQL
mysql -u root -p

# In MySQL shell
USE Masroo3k;
SHOW TABLES;
SELECT * FROM Users LIMIT 5;
SELECT * FROM Templates LIMIT 5;
```

### Backend Commands
```bash
# Navigate to backend directory
cd Masroo3k.Api

# Check project info
dotnet --info

# Run with verbose output
dotnet run --verbosity detailed
```

### Frontend Commands
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Run development server
npm run dev

# Preview production build
npm run build
npm run preview
```

## Troubleshooting Verification Failures

### Database Issues
If database verification fails:
1. Check that MySQL is running
2. Verify the connection string in `Masroo3k.Api/appsettings.json`
3. Run the `create_mysql_database.sql` script manually
4. Check MySQL user permissions

### Backend Issues
If backend verification fails:
1. Verify .NET 8 SDK installation
2. Check for missing dependencies in `Masroo3k.Api.csproj`
3. Ensure all environment variables are set
4. Check firewall settings for ports 5218 and 7140

### Frontend Issues
If frontend verification fails:
1. Verify Node.js installation
2. Check for missing dependencies in `package.json`
3. Ensure the `.env` file has correct values
4. Check browser console for errors

### Integration Issues
If integration verification fails:
1. Verify both backend and frontend are running
2. Check that API URLs match in frontend and backend configurations
3. Ensure CORS settings in `Program.cs` allow frontend origin
4. Check browser network tab for API call failures

## Success Criteria

You have successfully verified the setup when:

- [ ] Database is created with all tables
- [ ] Backend starts without errors
- [ ] Frontend builds without errors
- [ ] Login works with default credentials
- [ ] Dashboard loads correctly
- [ ] Analysis creation form is accessible
- [ ] No errors in browser console
- [ ] No errors in backend logs

## Next Steps After Successful Verification

1. Replace default passwords with secure ones
2. Add your actual Google Gemini API key to `.env`
3. Customize templates and branding as needed
4. Test all application features
5. Prepare for production deployment if needed
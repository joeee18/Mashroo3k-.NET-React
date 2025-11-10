# Masroo3k Database Integration Guide

## ✅ What Has Been Implemented

### Backend (.NET 8 Web API with SQL Server)

#### 1. Database Setup (Code First Approach)
- **Connection String**: `Server=DESKTOP-A82CMLL\MSSQLSERVER1;Database=Masroo3kDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true`
- **Database**: `Masroo3kDb` created on your SQL Server instance
- **Tables Created**:
  - `Users` - User accounts with authentication
  - `Analyses` - Business analysis reports
  - `Templates` - Analysis templates

#### 2. Models (Code First)
- `User` - Name, Email, PasswordHash, Role (admin/user), CreatedAt
- `Analysis` - Title, Content, Score, RiskLevel, SuccessPercent, Investment, ExpectedROI, CreatedAt, OwnerId, TemplateId
- `Template` - Name, Description, Category, Duration, IsPopular, CreatedAt

#### 3. API Controllers
- **AuthController** (`/api/auth`)
  - `POST /api/auth/signup` - Register new users
  - `POST /api/auth/login` - User login with password verification
  
- **AnalysesController** (`/api/analyses`)
  - `GET /api/analyses` - List all analyses
  - `GET /api/analyses/{id}` - Get analysis by ID
  - `POST /api/analyses` - Create new analysis
  - `DELETE /api/analyses/{id}` - Delete analysis
  
- **UsersController** (`/api/users`)
  - `GET /api/users` - List all users (admin)
  - `GET /api/users/{id}` - Get user by ID
  - `PUT /api/users/{id}` - Update user
  - `DELETE /api/users/{id}` - Delete user

#### 4. Security Features
- BCrypt password hashing
- CORS configured for frontend (ports 3000 and 5173)
- SQL injection protection via EF Core parameterized queries

### Frontend (React + TypeScript)

#### 1. API Client Services
- `apiClient.ts` - Base HTTP client with error handling
- `authService.ts` - Login and signup functions
- `analysisService.ts` - Analysis CRUD operations
- `userService.ts` - User management operations

#### 2. Connected Pages
All pages now use live database data:

**Authentication**
- ✅ **Login Page** - Validates credentials against database
- ✅ **Signup Page** - Creates new users in database

**User Pages**
- ✅ **Dashboard** - Shows real KPIs and statistics
- ✅ **My Analyses** - Fetches user's analyses from database
- ✅ **New Analysis** - Saves analysis form data to database
- ✅ **Report Page** - Loads analysis data from database by ID

**Admin Pages**
- ✅ **Admin Dashboard** - Shows real system statistics
- ✅ **Admin Users** - Lists users from database with delete functionality

## 🚀 How to Run

### 1. Start the Backend API

**IMPORTANT**: Stop the currently running API first (press Ctrl+C in the terminal), then:

```powershell
cd Masroo3k.Api
dotnet run --launch-profile https
```

The API will start on:
- HTTPS: `https://localhost:7140`
- HTTP: `http://localhost:5218`
- Swagger UI: `https://localhost:7140/swagger`

**🌱 Database Seeding**: On first run, the database will be automatically seeded with:
- **Admin user**: `admin@mashroo3k.com` / `admin123`
- **Regular user**: `john@example.com` / `user123`
- **10 AI Templates**: AI Business Idea Validator, AI-Powered SWOT & PESTEL Builder, Building the Marketing Plan, Financial Performance Assessment, Assessing Growth Readiness, Gap Analysis, AI Business Health Check, Digital Maturity Assessment, AI Pitch Deck Generator, AI-Based Market Opportunity Analyzer

Watch the console for seeding messages!

### 2. Start the Frontend

```powershell
cd .. # Back to project root
npm run dev
```

The frontend will start on:
- Local: `http://localhost:3000`

## 🧪 Testing the Integration

### Quick Test with Seeded Accounts

The application now comes with pre-seeded test accounts! No need to create an account manually.

**Login with Admin**:
- Go to `http://localhost:3000/login`
- Email: `admin@mashroo3k.com`
- Password: `admin123`
- You'll be redirected to Admin Dashboard

**Login with Regular User**:
- Go to `http://localhost:3000/login`
- Email: `john@example.com`
- Password: `user123`
- You'll be redirected to User Dashboard

📚 See [SEEDED_CREDENTIALS.md](./SEEDED_CREDENTIALS.md) for quick reference
📚 See [DATABASE_SEEDING.md](./DATABASE_SEEDING.md) for detailed seeding documentation

### Test Signup & Login

1. **Create a new account**:
   - Go to `http://localhost:3000/signup`
   - Fill in the form (name, email, password)
   - Click "Create Account"
   - You'll be redirected to login

2. **Login**:
   - Use the email and password you just created
   - Or use demo credentials (if you add them manually to DB)
   - Click "Sign In"
   - You'll be redirected to Dashboard

3. **Verify in Database**:
   - Open SQL Server Management Studio (SSMS)
   - Connect to `DESKTOP-A82CMLL\MSSQLSERVER1`
   - Run: `SELECT * FROM dbo.Users`
   - You should see your new user!

### Test Analysis Creation

1. **Create an Analysis**:
   - Navigate to Templates or Dashboard
   - Click "New Analysis"
   - Fill in the multi-step form
   - Click "Generate Analysis"
   - Wait for processing animation
   - You'll be redirected to the report page

2. **View Your Analyses**:
   - Go to "My Analyses" page
   - Your created analysis will be listed
   - Click "View" to see the report

3. **Verify in Database**:
   ```sql
   SELECT * FROM dbo.Analyses
   ```

### Test Admin Features

1. **Create an Admin User** (via SSMS):
   ```sql
   UPDATE dbo.Users 
   SET Role = 'admin' 
   WHERE Email = 'your-email@example.com'
   ```

2. **Login as Admin**:
   - Login with admin credentials
   - You'll be redirected to Admin Dashboard

3. **View Users**:
   - Go to Admin → Users
   - See all users from database
   - Try deleting a user (it will be removed from DB)

4. **View Statistics**:
   - Admin Dashboard shows:
     - Total Users (from DB)
     - Active Users (from DB)
     - Total Analyses (from DB)
     - System health

## 📊 How to View the Database

### Option 1: SQL Server Management Studio (SSMS)

1. Open SSMS
2. Server name: `DESKTOP-A82CMLL\MSSQLSERVER1`
3. Authentication: Windows Authentication
4. Connect
5. Expand: Databases → Masroo3kDb → Tables
6. Right-click table → "Select Top 1000 Rows"

### Option 2: Azure Data Studio

1. Open Azure Data Studio
2. New Connection
3. Server: `DESKTOP-A82CMLL\MSSQLSERVER1`
4. Authentication: Windows Authentication
5. Connect
6. Browse tables and data

### Useful SQL Queries

```sql
-- View all users
SELECT Id, Name, Email, Role, CreatedAt FROM dbo.Users;

-- View all analyses
SELECT Id, Title, Score, RiskLevel, Investment, ExpectedROI, CreatedAt 
FROM dbo.Analyses;

-- View analyses with owner info
SELECT 
    a.Id, 
    a.Title, 
    a.Score, 
    u.Name AS OwnerName, 
    u.Email AS OwnerEmail,
    a.CreatedAt
FROM dbo.Analyses a
INNER JOIN dbo.Users u ON a.OwnerId = u.Id
ORDER BY a.CreatedAt DESC;

-- Count analyses per user
SELECT 
    u.Name, 
    u.Email, 
    COUNT(a.Id) AS AnalysisCount
FROM dbo.Users u
LEFT JOIN dbo.Analyses a ON u.Id = a.OwnerId
GROUP BY u.Name, u.Email;
```

## 🔧 Configuration

### Frontend Environment Variables
File: `.env`
```
VITE_API_URL=https://localhost:7140
```

### Backend Connection String
File: `Masroo3k.Api/appsettings.json`
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DESKTOP-A82CMLL\\MSSQLSERVER1;Database=Masroo3kDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
  }
}
```

## 🛠️ Database Migrations

To update the database schema:

```powershell
cd Masroo3k.Api

# Create a new migration
dotnet ef migrations add MigrationName

# Apply migrations to database
dotnet ef database update

# Remove last migration (if not applied)
dotnet ef migrations remove
```

## 🔐 Security Notes

- Passwords are hashed using BCrypt
- CORS is configured to only allow specific origins
- SQL injection protection via EF Core
- For production, add JWT authentication tokens
- Use HTTPS in production
- Store connection strings in environment variables

## 📝 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/analyses` | List all analyses | Optional |
| GET | `/api/analyses/{id}` | Get analysis by ID | Optional |
| POST | `/api/analyses` | Create analysis | Optional |
| DELETE | `/api/analyses/{id}` | Delete analysis | Optional |
| GET | `/api/users` | List all users | Admin |
| GET | `/api/users/{id}` | Get user by ID | Admin |
| PUT | `/api/users/{id}` | Update user | Admin |
| DELETE | `/api/users/{id}` | Delete user | Admin |

## ✨ What Works Now

1. ✅ User registration with password hashing
2. ✅ User login with credential validation
3. ✅ Creating business analyses (stored in DB)
4. ✅ Viewing all user analyses from database
5. ✅ Viewing individual analysis reports
6. ✅ Admin can view all users
7. ✅ Admin can delete users
8. ✅ Admin dashboard shows real statistics
9. ✅ All data persists in SQL Server
10. ✅ All UI buttons and forms connected to database

## 🎯 Next Steps (Optional Enhancements)

- Add JWT token authentication
- Implement user roles and permissions
- Add pagination for large datasets
- Add search and filter functionality
- Implement file upload for analysis documents
- Add email verification for new users
- Create data backup/restore functionality
- Add audit logging for admin actions
- Implement real-time notifications

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure SQL Server service is running
- Check SQL Server Configuration Manager → Enable TCP/IP
- Verify instance name is correct: `DESKTOP-A82CMLL\MSSQLSERVER1`

### CORS Errors
- Make sure backend is running
- Check that frontend port matches CORS policy
- Verify `.env` file has correct API URL

### API Not Found Errors
- Ensure backend is running on correct port
- Check `launchSettings.json` for actual ports
- Verify API URL in frontend `.env` file

### Frontend Build Errors
- Run `npm install` to ensure all dependencies
- Clear node_modules and reinstall if needed
- Check TypeScript errors in console

---

**Congratulations!** 🎉 Your application is now fully integrated with SQL Server database using .NET Code First approach. All data is persisted, and you can view/manage it through SSMS or Azure Data Studio.

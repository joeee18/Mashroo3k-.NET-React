# Database Seeding Guide

## Overview

The Masroo3k application includes automatic database seeding functionality that populates the database with predefined users and templates when the application starts for the first time.

## Predefined Users

The seeder automatically creates two users with hashed passwords:

### 1. Admin User
- **Email**: `admin@mashroo3k.com`
- **Password**: `admin123`
- **Name**: System Administrator
- **Role**: admin

### 2. Regular User
- **Email**: `john@example.com`
- **Password**: `user123`
- **Name**: John Doe
- **Role**: user

## Predefined Templates

The seeder also creates 5 business analysis templates:

1. **AI Business Idea Validator** - Business Validation (25 min, Popular)
2. **AI-Powered SWOT & PESTEL Builder** - SWOT & PESTEL (30 min, Popular)
3. **Building the Marketing Plan** - Marketing (20 min)
4. **Financial Performance Assessment** - Financial (20 min)
5. **Assessing Growth Readiness** - Growth (25 min)
6. **Gap Analysis** - Gap Analysis (20 min)
7. **AI Business Health Check** - Health Check (15 min)
8. **Digital Maturity Assessment** - Digital (25 min)
9. **AI Pitch Deck Generator** - Pitch Deck (30 min, Popular)
10. **AI-Based Market Opportunity Analyzer** - Market Opportunity (25 min)

## How Seeding Works

### Automatic Seeding on Startup

The database is automatically seeded when the application starts:

1. **Check**: The seeder first checks if users already exist in the database
2. **Skip**: If users exist, seeding is skipped with a console message
3. **Seed**: If the database is empty, it creates the predefined users and templates
4. **Hash**: All passwords are hashed using BCrypt before storage

### Files Involved

- **`Data/DbSeeder.cs`** - Contains the seeding logic
- **`Program.cs`** - Calls the seeder on application startup
- **`Controllers/SeedController.cs`** - API endpoints for manual seeding

## Manual Seeding via API

You can also manually control seeding through API endpoints:

### 1. Check Seeding Status

```bash
GET https://localhost:7140/api/seed/status
```

**Response:**
```json
{
  "users": 2,
  "templates": 5,
  "analyses": 0,
  "isSeeded": true
}
```

### 2. Manually Run Seeder

```bash
POST https://localhost:7140/api/seed/run
```

This will seed users and templates if they don't exist.

**Response:**
```json
{
  "message": "Database seeded successfully"
}
```

### 3. Reset and Re-seed Database

⚠️ **WARNING: This deletes ALL data!**

```bash
POST https://localhost:7140/api/seed/reset
```

This endpoint will:
- Delete all analyses
- Delete all users
- Delete all templates
- Re-seed with default data

**Response:**
```json
{
  "message": "Database reset and seeded successfully"
}
```

## Testing the Seeded Users

After the application starts and seeds the database, you can test login with the predefined credentials:

### Test Admin Login

1. Go to the login page: `http://localhost:3000/login`
2. Email: `admin@mashroo3k.com`
3. Password: `admin123`
4. You'll be redirected to the Admin Dashboard

### Test Regular User Login

1. Go to the login page: `http://localhost:3000/login`
2. Email: `john@example.com`
3. Password: `user123`
4. You'll be redirected to the User Dashboard

## Verifying Seeded Data in Database

### Using SQL Server Management Studio (SSMS)

```sql
-- View all seeded users
SELECT Id, Name, Email, Role, CreatedAt 
FROM Users;

-- Verify passwords are hashed
SELECT Email, PasswordHash 
FROM Users;

-- View all seeded templates
SELECT Id, Name, Category, Duration, IsPopular 
FROM Templates;
```

### Using the API

```bash
# Get all users (admin only)
GET https://localhost:7140/api/users

# Get seeding status
GET https://localhost:7140/api/seed/status
```

## Customizing Seeded Data

To add or modify seeded data, edit the `Data/DbSeeder.cs` file:

### Add More Users

```csharp
var users = new List<User>
{
    // Existing users...
    new User
    {
        Name = "Jane Smith",
        Email = "jane@example.com",
        PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
        Role = "user",
        CreatedAt = DateTime.UtcNow
    }
};
```

### Add More Templates

```csharp
var templates = new List<Template>
{
    // Existing templates...
    new Template
    {
        Name = "Healthcare Clinic",
        Description = "Medical and healthcare business analysis",
        Category = "Healthcare",
        Duration = 55,
        IsPopular = true,
        CreatedAt = DateTime.UtcNow
    }
};
```

## Console Output

When seeding occurs, you'll see console output like this:

```
Seeding database with default users...
Successfully seeded 2 users:
  - admin@mashroo3k.com (admin)
  - john@example.com (user)
Seeding database with default templates...
Successfully seeded 5 templates.
```

If the database is already seeded:

```
Database already seeded. Skipping seed operation.
```

## Restarting the Application

To see the seeding in action:

1. **Stop the current API** (if running)
2. **Delete the database** (optional, if you want to see fresh seeding):
   ```sql
   DROP DATABASE Masroo3kDb;
   ```
3. **Start the API**:
   ```powershell
   cd Masroo3k.Api
   dotnet run --launch-profile https
   ```
4. **Watch the console** for seeding messages
5. **Check Swagger UI** at `https://localhost:7140/swagger`

## Using Swagger UI to Test Seeding

1. Navigate to: `https://localhost:7140/swagger`
2. Find the **Seed** section
3. Try the endpoints:
   - **GET /api/seed/status** - Check current database state
   - **POST /api/seed/run** - Manually trigger seeding
   - **POST /api/seed/reset** - Reset and re-seed (careful!)

## Security Considerations

### Production Deployment

⚠️ **Important for Production:**

1. **Disable SeedController** in production:
   ```csharp
   // In Program.cs or SeedController.cs
   #if DEBUG
       app.MapControllers(); // Only include seed endpoints in debug mode
   #endif
   ```

2. **Use Environment Variables** for production credentials:
   ```csharp
   PasswordHash = BCrypt.Net.BCrypt.HashPassword(
       Environment.GetEnvironmentVariable("ADMIN_PASSWORD") ?? "admin123"
   )
   ```

3. **Remove Default Passwords** - Change default passwords immediately after first deployment

4. **Seed Only Once** - Ensure seeding only happens on initial deployment, not every restart

### Password Security

- All passwords are hashed using **BCrypt** with automatic salt generation
- Original passwords are never stored in the database
- BCrypt automatically handles salt generation and verification
- The hash format: `$2a$11$...` indicates BCrypt version and cost factor

## Troubleshooting

### Seeding Doesn't Run

**Problem**: No console output about seeding

**Solutions**:
- Check if users already exist: `SELECT COUNT(*) FROM Users;`
- Manually delete users if you want to re-seed: `DELETE FROM Users;`
- Or use the reset endpoint: `POST /api/seed/reset`

### Can't Login with Seeded Credentials

**Problem**: Login fails with correct credentials

**Solutions**:
- Verify user exists: `SELECT * FROM Users WHERE Email = 'admin@mashroo3k.com';`
- Check password hash is not null
- Ensure BCrypt.Net-Next package is installed
- Check console for seeding errors

### Database Already Seeded Message

**Problem**: Console shows "Database already seeded. Skipping seed operation."

**Solutions**:
- This is normal behavior if users exist
- To re-seed: Use `POST /api/seed/reset` or manually delete users
- Or drop and recreate the database: `dotnet ef database update`

## Example: Complete Fresh Start

To start completely fresh with seeded data:

```powershell
# Stop the API (Ctrl+C in the terminal)

# Drop the database (in SSMS or command line)
sqlcmd -S DESKTOP-A82CMLL\MSSQLSERVER1 -Q "DROP DATABASE Masroo3kDb"

# Navigate to API directory
cd Masroo3k.Api

# Recreate database with migrations
dotnet ef database update

# Run the application
dotnet run --launch-profile https

# Watch console output for:
# "Seeding database with default users..."
# "Successfully seeded 2 users: ..."
```

Now you can login with:
- `admin@mashroo3k.com` / `admin123`
- `john@example.com` / `user123`

---

**Congratulations!** Your database is now automatically seeded with test accounts and templates, making development and testing much easier! 🎉

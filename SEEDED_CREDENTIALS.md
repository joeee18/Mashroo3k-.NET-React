# Quick Reference: Seeded Credentials

## Login Credentials

### Admin Account
```
Email:    admin@mashroo3k.com
Password: admin123
Role:     admin
```

### Regular User Account
```
Email:    john@example.com
Password: user123
Role:     user
```

## Testing Instructions

1. **Start the Backend API** (if not running):
   ```powershell
   cd Masroo3k.Api
   dotnet run --launch-profile https
   ```
   ✅ Watch for seeding messages in console

2. **Start the Frontend** (if not running):
   ```powershell
   npm run dev
   ```
   ✅ Opens on http://localhost:3000

3. **Test Admin Login**:
   - Go to: http://localhost:3000/login
   - Email: `admin@mashroo3k.com`
   - Password: `admin123`
   - ✅ Redirected to Admin Dashboard

4. **Test User Login**:
   - Go to: http://localhost:3000/login
   - Email: `john@example.com`
   - Password: `user123`
   - ✅ Redirected to User Dashboard

## Seeding API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/seed/status` | GET | Check seeding status |
| `/api/seed/run` | POST | Manually run seeder |
| `/api/seed/reset` | POST | ⚠️ Reset & re-seed (deletes all data) |

## Verify in Database

```sql
-- Check seeded users
SELECT Id, Name, Email, Role FROM Users;

-- Check seeded templates
SELECT Id, Name, Category, IsPopular FROM Templates;

-- Verify password hashing
SELECT Email, LEFT(PasswordHash, 20) + '...' AS HashedPassword FROM Users;
```

## Expected Results

### Users Table
| Id | Name | Email | Role |
|----|------|-------|------|
| 1 | System Administrator | admin@mashroo3k.com | admin |
| 2 | John Doe | john@example.com | user |

### Templates Table
| Id | Name | Category |
|----|------|----------|
| 1 | AI Business Idea Validator | Business Validation |
| 2 | AI-Powered SWOT & PESTEL Builder | SWOT & PESTEL |
| 3 | Building the Marketing Plan | Marketing |
| 4 | Financial Performance Assessment | Financial |
| 5 | Assessing Growth Readiness | Growth |
| 6 | Gap Analysis | Gap Analysis |
| 7 | AI Business Health Check | Health Check |
| 8 | Digital Maturity Assessment | Digital |
| 9 | AI Pitch Deck Generator | Pitch Deck |
| 10 | AI-Based Market Opportunity Analyzer | Market Opportunity |

## Troubleshooting

**Not seeding?**
- Users may already exist
- Run: `POST /api/seed/reset` to reset

**Can't login?**
- Verify backend is running on https://localhost:7140
- Check console for errors
- Verify database has seeded users

**Need fresh start?**
```powershell
# Stop API, then in SSMS:
DROP DATABASE Masroo3kDb;

# Then restart API - it will recreate and seed
dotnet run --launch-profile https
```

## Files Modified/Created

✅ `Data/DbSeeder.cs` - Seeding logic
✅ `Controllers/SeedController.cs` - Seeding API
✅ `Program.cs` - Auto-seed on startup
✅ `DATABASE_SEEDING.md` - Full documentation

---

**Ready to test!** 🚀 Use the credentials above to login and explore the application.

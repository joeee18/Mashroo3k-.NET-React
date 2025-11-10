# Masroo3k Project Startup Guide

This guide provides the exact commands and steps needed to start the entire Masroo3k project with your MySQL database.

## Database Setup

### Option 1: Automated Setup (Recommended)
The database has already been set up automatically when you ran the backend. The application creates and seeds the database on first run.

### Option 2: Manual Setup using phpMyAdmin
If you need to manually set up the database:

1. Open phpMyAdmin in your browser
2. Execute the statements in [DATABASE_SETUP.sql](file://d:\Masroo3k\DATABASE_SETUP.sql) one by one:
   - First execute the database creation statement
   - Then select the "Masroo3k" database
   - Execute each CREATE TABLE statement
   - Execute each ALTER TABLE statement for foreign keys
   - Execute each CREATE INDEX statement
   - Execute the INSERT statements for default data

## Starting the Backend

Open a terminal/command prompt and run:

```bash
cd Masroo3k.Api
dotnet run
```

The backend will start on:
- HTTP: http://localhost:5218
- HTTPS: https://localhost:7140

## Starting the Frontend

Open a new terminal/command prompt and run:

```bash
npm run dev
```

The frontend will start on: http://localhost:3000

## Default Credentials

### Admin User
- Email: admin@mashroo3k.com
- Password: admin123

### Regular User
- Email: john@example.com
- Password: user123

## Testing the Setup

After both backend and frontend are running:

1. Open your browser and navigate to http://localhost:3000
2. Log in with one of the default accounts
3. Try creating a new business analysis
4. Check that the dashboard loads correctly

## Troubleshooting

### If the backend fails to start:
1. Make sure MySQL is running
2. Verify the connection string in `Masroo3k.Api/appsettings.json`
3. Check that the "Masroo3k" database exists

### If the frontend fails to start:
1. Make sure Node.js is installed
2. Run `npm install` to ensure all dependencies are installed
3. Check that the `.env` file has the correct API key

### If you get database connection errors:
1. Verify MySQL is running
2. Check that you can connect to MySQL with root user and empty password
3. Ensure the "Masroo3k" database exists with all tables

## API Documentation

When the backend is running, you can access the API documentation at:
https://localhost:7140/swagger
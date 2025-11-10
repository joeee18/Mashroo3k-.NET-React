# Mashroo3k Business Intelligence Platform

This is a full-stack business intelligence platform that leverages AI (Google Gemini) to generate business analyses. The platform features a React-based frontend with a dashboard, analysis creation, reports, user profile, login/signup, and admin panel, along with an ASP.NET Core 8 Web API backend that handles authentication, analysis generation, activity logging, notifications, and user management.

## Features

- AI-powered business analysis generation
- User authentication and role-based access (admin/user)
- Real-time activity logging
- Notification system
- Admin dashboard for managing users, templates, logs, and settings
- Dynamic report generation and export

## Database Configuration

This project has been configured to work with MySQL instead of SQL Server. The following changes have been made:

- Updated database provider to MySql.EntityFrameworkCore
- Modified connection string for MySQL
- Updated DbContext configuration

## Setup Instructions

1. **Database Setup**: Execute `create_mysql_database.sql` to create the database structure
2. **Backend Setup**: Install .NET 8 SDK and run `dotnet restore` and `dotnet run` in the `Masroo3k.Api` directory
3. **Frontend Setup**: Run `npm install` and `npm run dev` in the root directory
4. **Configuration**: Add your Google Gemini API key to the `.env` file

## Default Credentials

- Admin User: admin@mashroo3k.com / admin123
- Regular User: john@example.com / user123

## Additional Documentation

Refer to the following files for detailed setup instructions:
- `DATABASE_SETUP_INSTRUCTIONS.md`
- `COMPLETE_SETUP_GUIDE.md`
- `SETUP_SUMMARY.md`
- `VERIFY_SETUP.md`

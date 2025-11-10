# Complete Setup Guide for Masroo3k with MySQL

This guide will help you set up the Masroo3k project to work with your MySQL database using phpMyAdmin.

## Prerequisites

Before starting, ensure you have:
- MySQL Server installed and running
- phpMyAdmin accessible through your web browser
- Node.js installed (version 16 or higher)
- .NET 8 SDK (required for backend, but we'll provide manual database setup)

## Database Setup Using phpMyAdmin

### Step 1: Create the Database

1. Open phpMyAdmin in your web browser
2. Click on the "New" button in the left sidebar
3. Enter "Masroo3k" as the database name
4. Click "Create"

### Step 2: Create Tables

1. Select the "Masroo3k" database from the left panel
2. Go to the "SQL" tab
3. Copy and paste the CREATE TABLE statements from [PHPMYADMIN_DATABASE_SETUP.sql](file://d:\Masroo3k\PHPMYADMIN_DATABASE_SETUP.sql) one by one
4. Execute each statement

### Step 3: Add Indexes and Foreign Keys

1. Continue executing the CREATE INDEX and ALTER TABLE statements from [PHPMYADMIN_DATABASE_SETUP.sql](file://d:\Masroo3k\PHPMYADMIN_DATABASE_SETUP.sql)
2. These will add the necessary indexes and foreign key constraints

### Step 4: Insert Default Data

1. Execute the INSERT statements from [PHPMYADMIN_DATABASE_SETUP.sql](file://d:\Masroo3k\PHPMYADMIN_DATABASE_SETUP.sql)
2. This will populate the database with default users and templates

### Step 5: Configure AUTO_INCREMENT

1. For each table, go to the "Operations" tab
2. Set the AUTO_INCREMENT value:
   - Users table: 3
   - Templates table: 6

## Verify Database Setup

1. Run the queries in [TEST_DATABASE_CONNECTION.sql](file://d:\Masroo3k\TEST_DATABASE_CONNECTION.sql) to verify the setup
2. You should see 2 users and 5 templates in the results

## Frontend Setup

### Install Dependencies

1. Open a terminal in the root directory of the project
2. Run:
   ```
   npm install
   ```

### Configure Environment Variables

1. Open the [.env](file://d:\Masroo3k\.env) file
2. Replace `your_gemini_api_key_here` with your actual Google Gemini API key
3. Save the file

## Backend Configuration

The backend is already configured to work with MySQL:

1. Connection string in [Masroo3k.Api/appsettings.json](file://d:\Masroo3k\Masroo3k.Api\appsettings.json) is set to:
   ```
   Server=localhost;Database=Masroo3k;Uid=root;Pwd=;
   ```

2. Database provider in [Masroo3k.Api/Masroo3k.Api.csproj](file://d:\Masroo3k\Masroo3k.Api\Masroo3k.Api.csproj) is set to:
   ```
   <PackageReference Include="MySql.EntityFrameworkCore" Version="8.0.2" />
   ```

3. Database context in [Masroo3k.Api/Program.cs](file://d:\Masroo3k\Masroo3k.Api\Program.cs) is configured to use MySQL:
   ```csharp
   builder.Services.AddDbContext<AppDbContext>(options =>
       options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));
   ```

## Running the Application

### Frontend

1. In the root directory, run:
   ```
   npm run dev
   ```
2. The frontend will be available at http://localhost:5173

### Backend

Since .NET 8 SDK is required to run the backend, and it's not currently installed, you have two options:

Option 1: Install .NET 8 SDK
1. Download and install .NET 8 SDK from https://dotnet.microsoft.com/en-us/download/dotnet/8.0
2. Navigate to the `Masroo3k.Api` directory
3. Run:
   ```
   dotnet run
   ```
4. The backend will be available at:
   - HTTP: http://localhost:5218
   - HTTPS: https://localhost:7140

Option 2: Use a different backend approach
If you cannot install .NET 8 SDK, you'll need to implement a different backend solution that can connect to your MySQL database.

## Default Credentials

### Admin User
- Email: admin@mashroo3k.com
- Password: admin123

### Regular User
- Email: john@example.com
- Password: user123

## Troubleshooting

### Database Connection Issues

1. Verify MySQL is running
2. Check that the database "Masroo3k" exists
3. Verify the connection string in [appsettings.json](file://d:\Masroo3k\Masroo3k.Api\appsettings.json)
4. Ensure phpMyAdmin can connect to the database

### Frontend Issues

1. Verify Node.js is installed
2. Check that all npm packages are installed
3. Ensure the .env file has the correct API key

### Backend Issues

1. Install .NET 8 SDK if not already installed
2. Verify all NuGet packages are restored
3. Check the database connection

## Next Steps

1. Replace default passwords with secure ones
2. Add your own business analysis templates
3. Customize the frontend UI
4. Implement additional features as needed
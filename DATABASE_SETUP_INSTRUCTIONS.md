# Database Setup Instructions for Masroo3k

## Prerequisites
1. MySQL Server installed and running
2. phpMyAdmin or MySQL Workbench (optional but recommended)
3. .NET 8 SDK (for running the backend)
4. Node.js and npm (for running the frontend)

## Database Setup

### Step 1: Create and Populate the Database

1. Open phpMyAdmin or your preferred MySQL client
2. Execute the SQL script `create_mysql_database.sql` which will:
   - Create the `Masroo3k` database
   - Create all required tables with proper relationships
   - Insert default users and templates

Alternatively, you can run the script from the command line:
```bash
mysql -u root -p < create_mysql_database.sql
```

### Step 2: Verify Database Structure

After running the script, your database should contain the following tables:
- Users
- Templates
- Analyses
- ActivityLogs
- Notifications

### Default User Credentials

The database comes with two pre-configured users:

1. Admin User:
   - Email: admin@mashroo3k.com
   - Password: admin123

2. Regular User:
   - Email: john@example.com
   - Password: user123

## Backend Setup (.NET 8 API)

### Prerequisites Installation

1. Download and install the .NET 8 SDK from [Microsoft's official website](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

### Running the Backend

1. Open a terminal in the `Masroo3k.Api` directory
2. Restore the project dependencies:
   ```bash
   dotnet restore
   ```
3. Run the application:
   ```bash
   dotnet run
   ```
   
The backend will start on:
- HTTP: http://localhost:5218
- HTTPS: https://localhost:7140

## Frontend Setup (React with Vite)

### Running the Frontend

1. Open a terminal in the root project directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   
The frontend will be available at: http://localhost:5173

## Environment Variables

Make sure to set up the required environment variables:

1. Create a `.env` file in the root directory
2. Add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Verify that MySQL is running
   - Check that the connection string in `Masroo3k.Api/appsettings.json` matches your MySQL configuration
   - Ensure the database `Masroo3k` exists

2. **Port Conflicts**:
   - The backend uses ports 5218 (HTTP) and 7140 (HTTPS)
   - The frontend uses port 5173
   - Adjust ports in configuration files if needed

3. **Missing Dependencies**:
   - Ensure all required SDKs are installed
   - Run `dotnet restore` in the backend directory
   - Run `npm install` in the root directory

### Verifying the Setup

1. Start the backend server
2. Start the frontend development server
3. Navigate to http://localhost:5173
4. Log in with one of the default accounts
5. Create a new business analysis to test the AI integration
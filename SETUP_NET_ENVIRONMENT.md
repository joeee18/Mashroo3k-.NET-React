# .NET Environment Setup for Masroo3k

## Installing .NET 8 SDK

To run the backend API, you need to install the .NET 8 SDK:

1. Visit the official download page: https://dotnet.microsoft.com/en-us/download/dotnet/8.0
2. Download the .NET 8 SDK for your operating system
3. Run the installer and follow the instructions

## Verifying Installation

After installation, verify that .NET is properly installed by opening a new terminal/command prompt and running:

```bash
dotnet --version
```

You should see a version number displayed.

## Setting up the Backend

Once .NET is installed, follow these steps to set up the backend:

1. Navigate to the backend directory:
   ```bash
   cd Masroo3k.Api
   ```

2. Restore project dependencies:
   ```bash
   dotnet restore
   ```

3. Apply database migrations (optional, as we've already created the database structure):
   ```bash
   dotnet ef database update
   ```

4. Run the application:
   ```bash
   dotnet run
   ```

The backend should now be running on:
- HTTP: http://localhost:5218
- HTTPS: https://localhost:7140

## Common Commands

### Development
```bash
# Run with hot reload
dotnet watch run

# Build the project
dotnet build

# Run tests (if any)
dotnet test
```

### Entity Framework
```bash
# Add a new migration
dotnet ef migrations add MigrationName

# Update the database
dotnet ef database update

# Remove the last migration
dotnet ef migrations remove
```

## Troubleshooting

### If dotnet command is not recognized:
1. Make sure you opened a new terminal after installation
2. Check that the .NET installation directory is in your PATH environment variable
3. Restart your computer if necessary

### If there are package restore errors:
1. Check your internet connection
2. Clear the NuGet cache:
   ```bash
   dotnet nuget locals all --clear
   ```
3. Try restoring packages again:
   ```bash
   dotnet restore
   ```

### If there are database connection issues:
1. Verify that MySQL is running
2. Check the connection string in `appsettings.json`
3. Ensure the database `Masroo3k` exists with the correct schema
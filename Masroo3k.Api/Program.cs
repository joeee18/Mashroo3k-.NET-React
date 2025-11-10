using Microsoft.EntityFrameworkCore;
using System.Linq;

using Masroo3k.Api.Data;
using Masroo3k.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register AI Analysis Service
builder.Services.AddHttpClient<IAIAnalysisService, GeminiAIService>();
builder.Services.AddScoped<IAIAnalysisService, GeminiAIService>();

// Register Activity Log Service
builder.Services.AddScoped<IActivityLogService, ActivityLogService>();

// Register Notification Service
builder.Services.AddScoped<INotificationService, NotificationService>();

// Register IP Address Service
builder.Services.AddScoped<IIPAddressService, IPAddressService>();

// Configure CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// Get logger for startup messages
var logger = app.Services.GetRequiredService<ILogger<Program>>();
logger.LogInformation("========================================");
logger.LogInformation("_localizer["auto.Program.21ecf3c2"]");
logger.LogInformation("========================================");
logger.LogInformation("Starting application...");

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        logger.LogInformation("Starting database seeding...");
        var context = services.GetRequiredService<AppDbContext>();
        
        // Check if migrations need to be applied
        var pendingMigrations = await context.Database.GetPendingMigrationsAsync();
        if (pendingMigrations.Any())
        {
            logger.LogInformation("Applying pending migrations...");
            try
            {
                await context.Database.MigrateAsync();
            }
            catch (Exception migrateEx) when (migrateEx.Message.Contains("_localizer["auto.Program.a28553b3"]"))
            {
                logger.LogInformation("Database tables already exist, skipping migration.");
            }
        }
        else
        {
            logger.LogInformation("No pending migrations to apply.");
        }
        
        // Only seed if the database is empty
        if (!context.Users.Any())
        {
            await DbSeeder.SeedAsync(context);
            await DbSeeder.SeedTemplatesAsync(context);
            logger.LogInformation("Database seeding completed successfully.");
        }
        else
        {
            logger.LogInformation("Database already contains data, skipping seeding.");
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    logger.LogInformation("_localizer["auto.Program.fc647332"]");
    app.UseSwagger();
    app.UseSwaggerUI();
}

logger.LogInformation("Configuring middleware pipeline...");

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

logger.LogInformation("Application configuration complete.");
logger.LogInformation("Listening on:");
logger.LogInformation("  - HTTPS: https://localhost:7143");
logger.LogInformation("  - HTTP: http://localhost:5221");
logger.LogInformation("========================================\n");

app.Run();
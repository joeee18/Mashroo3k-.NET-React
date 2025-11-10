using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Models;
using BCrypt.Net;

namespace Masroo3k.Api.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            // Ensure database is created
            await context.Database.MigrateAsync();

            // Check if users already exist
            if (await context.Users.AnyAsync())
            {
                Console.WriteLine("Database already seeded. Skipping seed operation.");
                return;
            }

            Console.WriteLine("Seeding database with default users...");

            var users = new List<User>
            {
                new User
                {
                    Name = "_localizer["auto.AuthContext.a7e18338"]",
                    Email = "admin@mashroo3k.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("_localizer["auto.DbSeeder.0192023a"]"),
                    Role = "admin",
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Name = "_localizer["auto.AuthContext.4c2a904b"]",
                    Email = "john@example.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("_localizer["auto.DbSeeder.6ad14ba9"]"),
                    Role = "user",
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Name = "_localizer["auto.DeveloperController.3473bee3"]",
                    Email = "Developer@dev.dev",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("_localizer["auto.DeveloperController.54a90513"]"),
                    Role = "developer",
                    CreatedAt = DateTime.UtcNow
                }
            };

            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();

            Console.WriteLine($"Successfully seeded {users.Count} users:");
            foreach (var user in users)
            {
                Console.WriteLine($"  - {user.Email} ({user.Role})");
            }
        }

        public static async Task SeedTemplatesAsync(AppDbContext context)
        {
            // Check if templates already exist
            if (await context.Templates.AnyAsync())
            {
                return;
            }

            Console.WriteLine("Seeding database with default templates...");

            var templates = new List<Template>
            {
                // New AI Analysis Templates
                new Template
                {
                    Name = "_localizer["templateBuilder.aiBusinessValidator"]",
                    Description = "_localizer["auto.DbSeeder.341baaf8"]",
                    Category = "_localizer["templateBuilder.businessValidation"]",
                    Duration = 25,
                    IsPopular = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["auto.DbSeeder.e4dc7e8c"]",
                    Description = "_localizer["auto.DbSeeder.a05629f0"]",
                    Category = "_localizer["templateBuilder.swotAndPestel"]",
                    Duration = 30,
                    IsPopular = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.buildingMarketingPlan"]",
                    Description = "_localizer["auto.DbSeeder.e50be642"]",
                    Category = "_localizer["templateBuilder.marketing"]",
                    Duration = 20,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.financialPerformanceAssessment"]",
                    Description = "_localizer["auto.DbSeeder.ebbe09d1"]",
                    Category = "_localizer["templateBuilder.financial"]",
                    Duration = 20,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.assessingGrowthReadiness"]",
                    Description = "_localizer["auto.DbSeeder.9e2bd18d"]",
                    Category = "_localizer["templateBuilder.growth"]",
                    Duration = 25,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.gapAnalysis"]",
                    Description = "_localizer["auto.DbSeeder.dd606b87"]",
                    Category = "_localizer["templateBuilder.gapAnalysis"]",
                    Duration = 20,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.aiBusinessHealthCheck"]",
                    Description = "_localizer["auto.DbSeeder.0e409094"]",
                    Category = "_localizer["templateBuilder.healthCheck"]",
                    Duration = 15,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.digitalMaturityAssessment"]",
                    Description = "_localizer["auto.DbSeeder.99c57dee"]",
                    Category = "_localizer["templateBuilder.digital"]",
                    Duration = 25,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.aiPitchDeckGenerator"]",
                    Description = "_localizer["auto.DbSeeder.ab3ebb31"]",
                    Category = "_localizer["templateBuilder.pitchDeck"]",
                    Duration = 30,
                    IsPopular = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["auto.DbSeeder.b2dfe667"]",
                    Description = "_localizer["auto.DbSeeder.9910f2a8"]",
                    Category = "_localizer["auto.add_templates.176d74bf"]",
                    Duration = 25,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                }
            };

            await context.Templates.AddRangeAsync(templates);
            await context.SaveChangesAsync();

            Console.WriteLine($"Successfully seeded {templates.Count} templates.");
        }
    }
}
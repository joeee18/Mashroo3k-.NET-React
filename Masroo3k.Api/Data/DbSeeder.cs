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
                    Description = "Validate your business idea with AI-powered analysis covering core concept, financial hypotheses, feasibility, market validation, and critical assumptions.",
                    Category = "_localizer["templateBuilder.businessValidation"]",
                    Duration = 25,
                    IsPopular = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "AI-Powered SWOT & PESTEL Builder",
                    Description = "Comprehensive SWOT and PESTEL analysis to evaluate your business strengths, weaknesses, opportunities, threats, and external factors.",
                    Category = "_localizer["templateBuilder.swotAndPestel"]",
                    Duration = 30,
                    IsPopular = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.buildingMarketingPlan"]",
                    Description = "Create a comprehensive marketing plan with target audience definition, budget allocation, channels, USP, and KPIs.",
                    Category = "_localizer["templateBuilder.marketing"]",
                    Duration = 20,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.financialPerformanceAssessment"]",
                    Description = "Evaluate your financial health with detailed analysis of revenue, costs, profits, and advanced financial metrics.",
                    Category = "_localizer["templateBuilder.financial"]",
                    Duration = 20,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.assessingGrowthReadiness"]",
                    Description = "Determine your business readiness for growth with operational efficiency, leadership, scalability, and financial runway analysis.",
                    Category = "_localizer["templateBuilder.growth"]",
                    Duration = 25,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.gapAnalysis"]",
                    Description = "Identify gaps between your current state and future goals with financial baselines, operational capabilities, and market position analysis.",
                    Category = "_localizer["templateBuilder.gapAnalysis"]",
                    Duration = 20,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.aiBusinessHealthCheck"]",
                    Description = "Comprehensive health check of your business covering identity, financial indicators, operational efficiency, market relationships, and business vitals.",
                    Category = "_localizer["templateBuilder.healthCheck"]",
                    Duration = 15,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.digitalMaturityAssessment"]",
                    Description = "Assess your digital maturity across identity, investment, tools, engagement, and dimensions of digital capability.",
                    Category = "_localizer["templateBuilder.digital"]",
                    Duration = 25,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "_localizer["templateBuilder.aiPitchDeckGenerator"]",
                    Description = "Create a compelling pitch deck with core idea, financial model, product details, competitive landscape, and team information.",
                    Category = "_localizer["templateBuilder.pitchDeck"]",
                    Duration = 30,
                    IsPopular = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "AI-Based Market Opportunity Analyzer",
                    Description = "Analyze market opportunities with company identity, financial capacity, core competencies, strategic posture, and market evaluation.",
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
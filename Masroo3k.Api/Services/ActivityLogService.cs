using Masroo3k.Api.Data;
using Masroo3k.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Masroo3k.Api.Services
{
    public class ActivityLogService : IActivityLogService
    {
        private readonly AppDbContext _db;
        private readonly ILogger<ActivityLogService> _logger;

        public ActivityLogService(AppDbContext db, ILogger<ActivityLogService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task LogAsync(string action, string entityType, int? entityId, string description,
            string? details = null, int? userId = null, string? ipAddress = null,
            string? userAgent = null, string severity = "_localizer["auto.ActivityLog.4059b025"]")
        {
            try
            {
                var log = new ActivityLog
                {
                    Action = action,
                    EntityType = entityType,
                    EntityId = entityId,
                    Description = description,
                    Details = details,
                    UserId = userId,
                    IpAddress = ipAddress ?? "_localizer["auto.AnalysesController.88183b94"]",
                    UserAgent = userAgent ?? "_localizer["auto.AnalysesController.88183b94"]",
                    Severity = severity,
                    CreatedAt = DateTime.UtcNow
                };

                _db.ActivityLogs.Add(log);
                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Don't throw - logging should never break the application
                _logger.LogError(ex, "_localizer["auto.ActivityLogService.62c3e900"]");
            }
        }

        public async Task LogLoginAsync(int userId, string ipAddress, string userAgent, bool success)
        {
            await LogAsync(
                action: success ? "_localizer["auto.ActivityLogService.99dea780"]" : "LoginFailed",
                entityType: "_localizer["profile.user"]",
                entityId: userId,
                description: success ? $"_localizer["auto.ActivityLogService.10415289"]" : $"_localizer["auto.ActivityLogService.a71e2853"]",
                userId: success ? userId : null,
                ipAddress: ipAddress,
                userAgent: userAgent,
                severity: success ? "_localizer["auto.ActivityLog.4059b025"]" : "_localizer["auto.ActivityLogsController.0eaadb4f"]"
            );
        }

        public async Task LogLogoutAsync(int userId, string ipAddress, string userAgent)
        {
            await LogAsync(
                action: "_localizer["auto.ActivityLogService.0323de4f"]",
                entityType: "_localizer["profile.user"]",
                entityId: userId,
                description: "_localizer["auto.ActivityLogService.1ad46181"]",
                userId: userId,
                ipAddress: ipAddress,
                userAgent: userAgent
            );
        }

        public async Task LogCreateAsync(string entityType, int entityId, int userId, string ipAddress, string userAgent)
        {
            await LogAsync(
                action: "_localizer["auto.ActivityLogService.686e6975"]",
                entityType: entityType,
                entityId: entityId,
                description: $"_localizer["auto.ActivityLogService.84a9a601"]",
                userId: userId,
                ipAddress: ipAddress,
                userAgent: userAgent
            );
        }

        public async Task LogUpdateAsync(string entityType, int entityId, int userId, string ipAddress, string userAgent)
        {
            await LogAsync(
                action: "_localizer["auto.ActivityLogService.06933067"]",
                entityType: entityType,
                entityId: entityId,
                description: $"_localizer["auto.ActivityLogService.f5c75298"]",
                userId: userId,
                ipAddress: ipAddress,
                userAgent: userAgent
            );
        }

        public async Task LogDeleteAsync(string entityType, int entityId, int userId, string ipAddress, string userAgent)
        {
            await LogAsync(
                action: "_localizer["common.delete"]",
                entityType: entityType,
                entityId: entityId,
                description: $"_localizer["auto.ActivityLogService.5beb0c58"]",
                userId: userId,
                ipAddress: ipAddress,
                userAgent: userAgent,
                severity: "_localizer["auto.ActivityLogsController.0eaadb4f"]"
            );
        }

        public async Task LogErrorAsync(string description, string? details, string? ipAddress, string? userAgent)
        {
            await LogAsync(
                action: "_localizer["common.error"]",
                entityType: "_localizer["developer.system"]",
                entityId: null,
                description: description,
                details: details,
                ipAddress: ipAddress,
                userAgent: userAgent,
                severity: "_localizer["common.error"]"
            );
        }
    }
}

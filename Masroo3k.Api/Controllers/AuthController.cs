using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;
using Masroo3k.Api.Models;
using Masroo3k.Api.DTOs;
using Masroo3k.Api.Services;
using BCrypt.Net;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IActivityLogService _activityLog;
        private readonly INotificationService _notificationService;
        private readonly IIPAddressService _ipAddressService;

        public AuthController(AppDbContext db, IActivityLogService activityLog, INotificationService notificationService, IIPAddressService ipAddressService)
        {
            _db = db;
            _activityLog = activityLog;
            _notificationService = notificationService;
            _ipAddressService = ipAddressService;
        }

        [HttpPost("signup")]
        public async Task<ActionResult<UserResponse>> Signup([FromBody] SignupRequest request)
        {
            // Check if email already exists
            if (await _db.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest(new { message = "Email already registered" });
            }

            // Hash password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Create user
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = passwordHash,
                Role = "user"
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            // Log signup activity
            await _activityLog.LogAsync(
                "_localizer["auto.AuthController.80919be0"]", "_localizer["profile.user"]", user.Id,
                $"New user registered: {user.Email}",
                userId: user.Id,
                ipAddress: _ipAddressService.GetClientIpAddress(HttpContext),
                userAgent: Request.Headers["_localizer["auto.AnalysesController.fb831f96"]"].ToString()
            );

            var response = new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            };

            return CreatedAtAction(nameof(Signup), response);
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                // Log failed login attempt
                await _activityLog.LogAsync(
                    "LoginFailed", "_localizer["profile.user"]", null,
                    $"Failed login attempt for email: {request.Email}",
                    ipAddress: _ipAddressService.GetClientIpAddress(HttpContext),
                    userAgent: Request.Headers["_localizer["auto.AnalysesController.fb831f96"]"].ToString(),
                    severity: "_localizer["auto.ActivityLogsController.0eaadb4f"]"
                );
                return Unauthorized(new { message = "_localizer["auto.AuthController.2abaf354"]" });
            }

            // Log successful login
            await _activityLog.LogLoginAsync(
                user.Id,
                _ipAddressService.GetClientIpAddress(HttpContext),
                Request.Headers["_localizer["auto.AnalysesController.fb831f96"]"].ToString() ?? "_localizer["auto.AnalysesController.88183b94"]",
                true
            );

            // Notify admins when a user logs in
            if (user.Role != "admin")
            {
                await _notificationService.NotifyAdminUserLoginAsync(user.Id, user.Name, user.Email);
            }

            var response = new LoginResponse
            {
                User = new UserResponse
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                },
                Token = null // For now, we'll add JWT later if needed
            };

            return Ok(response);
        }
    }
}

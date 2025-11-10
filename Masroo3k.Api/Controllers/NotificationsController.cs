using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;
using Masroo3k.Api.Models;
using Masroo3k.Api.DTOs;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public NotificationsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("user/{userId:int}")]
        public async Task<ActionResult<IEnumerable<NotificationResponse>>> GetUserNotifications(int userId)
        {
            var notifications = await _db.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NotificationResponse
                {
                    Id = n.Id,
                    Title = n.Title,
                    Message = n.Message,
                    Type = n.Type,
                    IsRead = n.IsRead,
                    CreatedAt = n.CreatedAt,
                    ActionUrl = n.ActionUrl
                })
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpGet("user/{userId:int}/unread-count")]
        public async Task<ActionResult<int>> GetUnreadCount(int userId)
        {
            var count = await _db.Notifications
                .CountAsync(n => n.UserId == userId && !n.IsRead);

            return Ok(count);
        }

        [HttpPost]
        public async Task<ActionResult<NotificationResponse>> CreateNotification([FromBody] CreateNotificationRequest request)
        {
            var notification = new Notification
            {
                UserId = request.UserId,
                Title = request.Title,
                Message = request.Message,
                Type = request.Type,
                ActionUrl = request.ActionUrl
            };

            _db.Notifications.Add(notification);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserNotifications), new { userId = notification.UserId }, new NotificationResponse
            {
                Id = notification.Id,
                Title = notification.Title,
                Message = notification.Message,
                Type = notification.Type,
                IsRead = notification.IsRead,
                CreatedAt = notification.CreatedAt,
                ActionUrl = notification.ActionUrl
            });
        }

        [HttpPut("{id:int}/mark-read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var notification = await _db.Notifications.FindAsync(id);
            if (notification == null) return NotFound();

            notification.IsRead = true;
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("user/{userId:int}/mark-all-read")]
        public async Task<IActionResult> MarkAllAsRead(int userId)
        {
            var notifications = await _db.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .ToListAsync();

            foreach (var notification in notifications)
            {
                notification.IsRead = true;
            }

            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var notification = await _db.Notifications.FindAsync(id);
            if (notification == null) return NotFound();

            _db.Notifications.Remove(notification);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}

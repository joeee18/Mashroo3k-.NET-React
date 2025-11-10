using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DashboardController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetStats()
        {
            var totalAnalyses = await _db.Analyses.CountAsync();
            var activeUsers = await _db.Users.CountAsync();
            
            // Calculate success rate (percentage of analyses with score >= 70)
            var successfulAnalyses = await _db.Analyses.CountAsync(a => a.Score >= 70);
            var successRate = totalAnalyses > 0 ? (double)successfulAnalyses / totalAnalyses * 100 : 0;
            
            // Calculate average ROI
            var avgROI = await _db.Analyses.AverageAsync(a => (double?)a.ExpectedROI) ?? 0;

            return Ok(new
            {
                totalAnalyses,
                activeUsers,
                successRate = Math.Round(successRate, 1),
                avgROI = Math.Round(avgROI, 1)
            });
        }

        [HttpGet("recent-analyses")]
        public async Task<ActionResult<object>> GetRecentAnalyses([FromQuery] int count = 3)
        {
            var recentAnalyses = await _db.Analyses
                .Include(a => a.Owner)
                .Include(a => a.Template)
                .OrderByDescending(a => a.CreatedAt)
                .Take(count)
                .Select(a => new
                {
                    id = a.Id,
                    name = a.Title,
                    type = a.Template != null ? a.Template.Name : "_localizer["templateBuilder.generalCategory"]",
                    date = a.CreatedAt.ToString("_localizer["auto.DashboardController.845f71f3"]"),
                    score = a.Score,
                    status = "_localizer["auto.DashboardController.ae94f80b"]" // All saved analyses are complete
                })
                .ToListAsync();

            return Ok(recentAnalyses);
        }
    }
}

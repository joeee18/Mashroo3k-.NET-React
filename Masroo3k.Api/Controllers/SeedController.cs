using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeedController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<SeedController> _logger;

        public SeedController(AppDbContext context, ILogger<SeedController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Manually trigger database seeding (Development only)
        /// </summary>
        [HttpPost("run")]
        public async Task<IActionResult> RunSeeder()
        {
            try
            {
                await DbSeeder.SeedAsync(_context);
                await DbSeeder.SeedTemplatesAsync(_context);
                return Ok(new { message = "_localizer["auto.SeedController.4172826c"]" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "_localizer["auto.SeedController.c19cc146"]");
                return StatusCode(500, new { message = "_localizer["auto.SeedController.f5895757"]", error = ex.Message });
            }
        }

        /// <summary>
        /// Reset and re-seed the database (Development only - DANGER!)
        /// </summary>
        [HttpPost("reset")]
        public async Task<IActionResult> ResetAndSeed()
        {
            try
            {
                // Delete all data
                _context.Analyses.RemoveRange(_context.Analyses);
                _context.Users.RemoveRange(_context.Users);
                _context.Templates.RemoveRange(_context.Templates);
                await _context.SaveChangesAsync();

                // Re-seed
                await DbSeeder.SeedAsync(_context);
                await DbSeeder.SeedTemplatesAsync(_context);

                return Ok(new { message = "_localizer["auto.SeedController.46625ee6"]" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "_localizer["auto.SeedController.98e2ea1a"]");
                return StatusCode(500, new { message = "_localizer["auto.SeedController.739820b9"]", error = ex.Message });
            }
        }

        /// <summary>
        /// Get seeding status
        /// </summary>
        [HttpGet("status")]
        public async Task<IActionResult> GetStatus()
        {
            var userCount = await _context.Users.CountAsync();
            var templateCount = await _context.Templates.CountAsync();
            var analysisCount = await _context.Analyses.CountAsync();

            return Ok(new
            {
                users = userCount,
                templates = templateCount,
                analyses = analysisCount,
                isSeeded = userCount > 0
            });
        }
    }
}

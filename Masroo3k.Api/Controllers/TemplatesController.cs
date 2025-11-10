using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;
using Masroo3k.Api.Models;
using Masroo3k.Api.DTOs;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemplatesController : ControllerBase
    {
        private readonly AppDbContext _db;

        public TemplatesController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplateDto>>> GetAll()
        {
            var templates = await _db.Templates
                .Include(t => t.Fields)
                .Select(t => new TemplateDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Description = t.Description,
                    Category = t.Category,
                    Duration = t.Duration,
                    IsPopular = t.IsPopular,
                    CreatedAt = t.CreatedAt,
                    FieldsCount = t.Fields.Count
                })
                .ToListAsync();

            return Ok(templates);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TemplateDto>> GetById(int id)
        {
            var template = await _db.Templates
                .Include(t => t.Fields)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (template == null) return NotFound();

            var templateDto = new TemplateDto
            {
                Id = template.Id,
                Name = template.Name,
                Description = template.Description,
                Category = template.Category,
                Duration = template.Duration,
                IsPopular = template.IsPopular,
                CreatedAt = template.CreatedAt,
                Fields = template.Fields.Select(f => new TemplateFieldDto
                {
                    Id = f.Id,
                    TemplateId = f.TemplateId,
                    StageNumber = f.StageNumber,
                    FieldOrder = f.FieldOrder,
                    Label = f.Label,
                    InputType = f.InputType,
                    FieldOptions = f.FieldOptions,
                    Rationale = f.Rationale,
                    IsRequired = f.IsRequired,
                    MinLength = f.MinLength,
                    MaxLength = f.MaxLength,
                    MustBePositive = f.MustBePositive,
                    MustBeValidUrl = f.MustBeValidUrl,
                    MustBeBetween0And100 = f.MustBeBetween0And100,
                    CreatedAt = f.CreatedAt
                }).ToList()
            };

            return Ok(templateDto);
        }

        [HttpPost]
        public async Task<ActionResult<TemplateDto>> Create([FromBody] CreateTemplateRequest request)
        {
            // Check if template with same name already exists
            if (await _db.Templates.AnyAsync(t => t.Name == request.Name))
            {
                return BadRequest(new { message = "Template with this name already exists" });
            }

            var template = new Template
            {
                Name = request.Name,
                Description = request.Description,
                Category = request.Category,
                Duration = request.Duration,
                IsPopular = request.IsPopular
            };

            _db.Templates.Add(template);
            await _db.SaveChangesAsync();

            var response = new TemplateDto
            {
                Id = template.Id,
                Name = template.Name,
                Description = template.Description,
                Category = template.Category,
                Duration = template.Duration,
                IsPopular = template.IsPopular,
                CreatedAt = template.CreatedAt
            };

            return CreatedAtAction(nameof(GetById), new { id = template.Id }, response);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTemplateRequest request)
        {
            var template = await _db.Templates.FindAsync(id);
            if (template == null) return NotFound();

            // Check if another template with same name already exists
            if (await _db.Templates.AnyAsync(t => t.Name == request.Name && t.Id != id))
            {
                return BadRequest(new { message = "Template with this name already exists" });
            }

            template.Name = request.Name;
            template.Description = request.Description;
            template.Category = request.Category;
            template.Duration = request.Duration;
            template.IsPopular = request.IsPopular;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var template = await _db.Templates.FindAsync(id);
            if (template == null) return NotFound();

            _db.Templates.Remove(template);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}
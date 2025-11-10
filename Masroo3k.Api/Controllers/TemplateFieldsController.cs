using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;
using Masroo3k.Api.Models;
using Masroo3k.Api.DTOs;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemplateFieldsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public TemplateFieldsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplateFieldDto>>> GetAll()
        {
            var fields = await _db.TemplateFields
                .Select(f => new TemplateFieldDto
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
                })
                .ToListAsync();

            return Ok(fields);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TemplateFieldDto>> GetById(int id)
        {
            var field = await _db.TemplateFields.FindAsync(id);
            if (field == null) return NotFound();

            var fieldDto = new TemplateFieldDto
            {
                Id = field.Id,
                TemplateId = field.TemplateId,
                StageNumber = field.StageNumber,
                FieldOrder = field.FieldOrder,
                Label = field.Label,
                InputType = field.InputType,
                FieldOptions = field.FieldOptions,
                Rationale = field.Rationale,
                IsRequired = field.IsRequired,
                MinLength = field.MinLength,
                MaxLength = field.MaxLength,
                MustBePositive = field.MustBePositive,
                MustBeValidUrl = field.MustBeValidUrl,
                MustBeBetween0And100 = field.MustBeBetween0And100,
                CreatedAt = field.CreatedAt
            };

            return Ok(fieldDto);
        }

        [HttpGet("template/{templateId:int}")]
        public async Task<ActionResult<IEnumerable<TemplateFieldDto>>> GetByTemplateId(int templateId)
        {
            var fields = await _db.TemplateFields
                .Where(f => f.TemplateId == templateId)
                .OrderBy(f => f.StageNumber)
                .ThenBy(f => f.FieldOrder)
                .Select(f => new TemplateFieldDto
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
                })
                .ToListAsync();

            return Ok(fields);
        }

        [HttpPost]
        public async Task<ActionResult<TemplateFieldDto>> Create([FromBody] CreateTemplateFieldRequest request)
        {
            var template = await _db.Templates.FindAsync(request.TemplateId);
            if (template == null) return BadRequest(new { message = "Template not found" });

            var field = new TemplateField
            {
                TemplateId = request.TemplateId,
                StageNumber = request.StageNumber,
                FieldOrder = request.FieldOrder,
                Label = request.Label,
                InputType = request.InputType,
                FieldOptions = request.FieldOptions,
                Rationale = request.Rationale,
                IsRequired = request.IsRequired,
                MinLength = request.MinLength,
                MaxLength = request.MaxLength,
                MustBePositive = request.MustBePositive,
                MustBeValidUrl = request.MustBeValidUrl,
                MustBeBetween0And100 = request.MustBeBetween0And100
            };

            _db.TemplateFields.Add(field);
            await _db.SaveChangesAsync();

            var response = new TemplateFieldDto
            {
                Id = field.Id,
                TemplateId = field.TemplateId,
                StageNumber = field.StageNumber,
                FieldOrder = field.FieldOrder,
                Label = field.Label,
                InputType = field.InputType,
                FieldOptions = field.FieldOptions,
                Rationale = field.Rationale,
                IsRequired = field.IsRequired,
                MinLength = field.MinLength,
                MaxLength = field.MaxLength,
                MustBePositive = field.MustBePositive,
                MustBeValidUrl = field.MustBeValidUrl,
                MustBeBetween0And100 = field.MustBeBetween0And100,
                CreatedAt = field.CreatedAt
            };

            return CreatedAtAction(nameof(GetById), new { id = field.Id }, response);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTemplateFieldRequest request)
        {
            var field = await _db.TemplateFields.FindAsync(id);
            if (field == null) return NotFound();

            field.StageNumber = request.StageNumber;
            field.FieldOrder = request.FieldOrder;
            field.Label = request.Label;
            field.InputType = request.InputType;
            field.FieldOptions = request.FieldOptions;
            field.Rationale = request.Rationale;
            field.IsRequired = request.IsRequired;
            field.MinLength = request.MinLength;
            field.MaxLength = request.MaxLength;
            field.MustBePositive = request.MustBePositive;
            field.MustBeValidUrl = request.MustBeValidUrl;
            field.MustBeBetween0And100 = request.MustBeBetween0And100;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var field = await _db.TemplateFields.FindAsync(id);
            if (field == null) return NotFound();

            _db.TemplateFields.Remove(field);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("reorder")]
        public async Task<IActionResult> ReorderFields([FromBody] ReorderFieldsRequest request)
        {
            using var transaction = await _db.Database.BeginTransactionAsync();
            try
            {
                foreach (var fieldOrder in request.FieldOrders)
                {
                    var field = await _db.TemplateFields.FindAsync(fieldOrder.Id);
                    if (field != null)
                    {
                        field.FieldOrder = fieldOrder.Order;
                    }
                }

                await _db.SaveChangesAsync();
                await transaction.CommitAsync();
                return NoContent();
            }
            catch
            {
                await transaction.RollbackAsync();
                return BadRequest(new { message = "Failed to reorder fields" });
            }
        }
    }

    public class ReorderFieldsRequest
    {
        public List<FieldOrderItem> FieldOrders { get; set; } = new();
    }

    public class FieldOrderItem
    {
        public int Id { get; set; }
        public int Order { get; set; }
    }
}
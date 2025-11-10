namespace Masroo3k.Api.DTOs
{
    public class TemplateFieldDto
    {
        public int Id { get; set; }
        public int TemplateId { get; set; }
        public int StageNumber { get; set; }
        public int FieldOrder { get; set; }
        public string Label { get; set; } = null!;
        public string InputType { get; set; } = null!;
        public string? FieldOptions { get; set; }
        public string Rationale { get; set; } = null!;
        public bool IsRequired { get; set; }
        public int? MinLength { get; set; }
        public int? MaxLength { get; set; }
        public bool MustBePositive { get; set; }
        public bool MustBeValidUrl { get; set; }
        public bool MustBeBetween0And100 { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateTemplateFieldRequest
    {
        public int TemplateId { get; set; }
        public int StageNumber { get; set; }
        public int FieldOrder { get; set; }
        public string Label { get; set; } = null!;
        public string InputType { get; set; } = null!;
        public string? FieldOptions { get; set; }
        public string Rationale { get; set; } = null!;
        public bool IsRequired { get; set; }
        public int? MinLength { get; set; }
        public int? MaxLength { get; set; }
        public bool MustBePositive { get; set; }
        public bool MustBeValidUrl { get; set; }
        public bool MustBeBetween0And100 { get; set; }
    }

    public class UpdateTemplateFieldRequest
    {
        public int StageNumber { get; set; }
        public int FieldOrder { get; set; }
        public string Label { get; set; } = null!;
        public string InputType { get; set; } = null!;
        public string? FieldOptions { get; set; }
        public string Rationale { get; set; } = null!;
        public bool IsRequired { get; set; }
        public int? MinLength { get; set; }
        public int? MaxLength { get; set; }
        public bool MustBePositive { get; set; }
        public bool MustBeValidUrl { get; set; }
        public bool MustBeBetween0And100 { get; set; }
    }
}
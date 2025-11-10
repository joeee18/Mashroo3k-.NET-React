using System.ComponentModel.DataAnnotations;

namespace Masroo3k.Api.Models
{
    public class Template
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 5, ErrorMessage = "_localizer["auto.TemplateDTOs.91465edc"]")]
        public string Name { get; set; } = null!;
        
        [StringLength(280, MinimumLength = 20, ErrorMessage = "_localizer["auto.TemplateDTOs.7d72138c"]")]
        public string? Description { get; set; }
        
        [Required]
        public string Category { get; set; } = "_localizer["templateBuilder.generalCategory"]";
        
        [Required]
        public int Duration { get; set; } = 30;
        
        public bool IsPopular { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public ICollection<Analysis> Analyses { get; set; } = new List<Analysis>();
        
        // New relationship for template fields
        public ICollection<TemplateField> Fields { get; set; } = new List<TemplateField>();
    }
}

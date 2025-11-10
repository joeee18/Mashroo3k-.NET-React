namespace Masroo3k.Api.DTOs
{
    public class AnalysisListItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string CreatedAt { get; set; } = null!;
        public string? OwnerEmail { get; set; }
        public string? TemplateName { get; set; }
        public int Score { get; set; }
        public string RiskLevel { get; set; } = null!;
        public int SuccessPercent { get; set; }
        public decimal Investment { get; set; }
        public decimal ExpectedROI { get; set; }
    }

    public class CreateAnalysisRequest
    {
        public string Title { get; set; } = null!;
        public string? Content { get; set; }
        public int? TemplateId { get; set; }
        public int OwnerId { get; set; }
    }

    public class AnalysisResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Content { get; set; }
        public int Score { get; set; }
        public string RiskLevel { get; set; } = null!;
        public int SuccessPercent { get; set; }
        public decimal Investment { get; set; }
        public decimal ExpectedROI { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? OwnerName { get; set; }
        public string? TemplateName { get; set; }
        public string? ExecutiveSummary { get; set; }
        public List<string>? KeyFindings { get; set; }
        public List<string>? Recommendations { get; set; }
    }
}

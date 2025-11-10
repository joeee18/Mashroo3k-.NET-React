namespace Masroo3k.Api.Services
{
    public interface IAIAnalysisService
    {
        Task<BusinessAnalysisResult> GenerateAnalysisAsync(BusinessAnalysisRequest request);
    }

    public class BusinessAnalysisRequest
    {
        public string BusinessIdea { get; set; } = null!;
        public string Industry { get; set; } = null!;
        public string TargetMarket { get; set; } = null!;
        public decimal InitialInvestment { get; set; }
        public string? AdditionalDetails { get; set; }
    }

    public class BusinessAnalysisResult
    {
        public int SuccessProbability { get; set; } // 0-100%
        public string RiskLevel { get; set; } = null!; // Low, Medium, High, Critical
        public decimal ProjectedROI { get; set; } // Percentage
        public decimal Investment { get; set; } // Required capital
        public int OverallScore { get; set; } // 0-100
        public List<string> KeyFindings { get; set; } = new();
        public string ExecutiveSummary { get; set; } = null!;
        public List<string> Recommendations { get; set; } = new();
    }
}

using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Masroo3k.Api.Services
{
    public class GeminiAIService : IAIAnalysisService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<GeminiAIService> _logger;

        public GeminiAIService(HttpClient httpClient, IConfiguration configuration, ILogger<GeminiAIService> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<BusinessAnalysisResult> GenerateAnalysisAsync(BusinessAnalysisRequest request)
        {
            try
            {
                var apiKey = _configuration["Gemini:ApiKey"];
                if (string.IsNullOrEmpty(apiKey))
                {
                    _logger.LogWarning("_localizer["auto.GeminiAIService.f6abb532"]");
                    return GenerateSimulatedAnalysis(request);
                }

                var prompt = BuildAnalysisPrompt(request);
                var geminiResponse = await CallGeminiAPI(apiKey, prompt);
                
                return ParseGeminiResponse(geminiResponse, request);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "_localizer["auto.GeminiAIService.601c6d52"]");
                return GenerateSimulatedAnalysis(request);
            }
        }

        private string BuildAnalysisPrompt(BusinessAnalysisRequest request)
        {
            var prompt = $@"You are a professional business analyst. Analyze the following business idea and provide a detailed assessment.

Business Idea: {request.BusinessIdea}
Industry: {request.Industry}
Target Market: {request.TargetMarket}
Initial Investment: ${request.InitialInvestment:N2}
Additional Details: {request.AdditionalDetails ?? "_localizer["auto.GeminiAIService.593d549e"]"}

Please provide a comprehensive business analysis in JSON format with the following structure:
{{
  ""_localizer["auto.GeminiAIService.2fc68165"]"": <number 0-100>,
  ""_localizer["auto.GeminiAIService.60988b7c"]"": ""_localizer["auto.GeminiAIService.f23154b3"]"",
  ""_localizer["auto.GeminiAIService.517b3b6b"]"": <number representing percentage, can be negative>,
  ""_localizer["auto.GeminiAIService.9ddabcfc"]"": <number>,
  ""_localizer["auto.GeminiAIService.7f8b1199"]"": <number 0-100>,
  ""_localizer["auto.GeminiAIService.0284c546"]"": [
    ""_localizer["auto.GeminiAIService.f63771f0"]"",
    ""_localizer["auto.GeminiAIService.b15c3d35"]"",
    ""_localizer["auto.GeminiAIService.7fda25f6"]"",
    ""_localizer["auto.GeminiAIService.6d146f73"]"",
    ""_localizer["auto.GeminiAIService.571d5cda"]"",
    ""_localizer["auto.GeminiAIService.3a41484a"]""
  ],
  ""_localizer["auto.GeminiAIService.13fc0b3c"]"": ""<A brief 2-3 sentence summary of the business opportunity>"",
  ""recommendations"": [
    ""_localizer["auto.GeminiAIService.90ebaa70"]"",
    ""_localizer["auto.GeminiAIService.e94a92c7"]"",
    ""_localizer["auto.GeminiAIService.c8bf6d94"]"",
    ""_localizer["auto.GeminiAIService.1b7d7aec"]""
  ]
}}

Base your analysis on:
1. Market demand and competition
2. Financial viability and ROI potential
3. Risk factors and mitigation strategies
4. Scalability and growth potential
5. Industry trends and market conditions

Provide realistic and actionable insights. Return ONLY the JSON object, no additional text.";

            return prompt;
        }

        private async Task<string> CallGeminiAPI(string apiKey, string prompt)
        {
            var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={apiKey}";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                },
                generationConfig = new
                {
                    temperature = 0.7,
                    maxOutputTokens = 2048,
                }
            };

            var json = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(url, content);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            return responseBody;
        }

        private BusinessAnalysisResult ParseGeminiResponse(string geminiResponse, BusinessAnalysisRequest request)
        {
            try
            {
                var jsonResponse = JObject.Parse(geminiResponse);
                var textContent = jsonResponse["_localizer["auto.GeminiAIService.bef2e239"]"]?[0]?["_localizer["auto.GeminiAIService.9a0364b9"]"]?["_localizer["auto.GeminiAIService.78f0805f"]"]?[0]?["_localizer["auto.Program.1cb251ec"]"]?.ToString();

                if (string.IsNullOrEmpty(textContent))
                {
                    throw new Exception("_localizer["auto.GeminiAIService.9e867593"]");
                }

                // Extract JSON from response (handle cases where AI adds markdown code blocks)
                var jsonStart = textContent.IndexOf("{");
                var jsonEnd = textContent.LastIndexOf("}");
                if (jsonStart >= 0 && jsonEnd > jsonStart)
                {
                    textContent = textContent.Substring(jsonStart, jsonEnd - jsonStart + 1);
                }

                var analysis = JsonConvert.DeserializeObject<GeminiAnalysisResponse>(textContent);
                
                if (analysis == null)
                {
                    throw new Exception("_localizer["auto.GeminiAIService.2f8e2e18"]");
                }

                return new BusinessAnalysisResult
                {
                    SuccessProbability = Math.Clamp(analysis.SuccessProbability, 0, 100),
                    RiskLevel = ValidateRiskLevel(analysis.RiskLevel),
                    ProjectedROI = analysis.ProjectedROI,
                    Investment = analysis.RecommendedInvestment > 0 ? analysis.RecommendedInvestment : request.InitialInvestment,
                    OverallScore = Math.Clamp(analysis.OverallScore, 0, 100),
                    KeyFindings = analysis.KeyFindings ?? new List<string>(),
                    ExecutiveSummary = analysis.ExecutiveSummary ?? "Analysis completed successfully.",
                    Recommendations = analysis.Recommendations ?? new List<string>()
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "_localizer["auto.GeminiAIService.3e83490d"]");
                return GenerateSimulatedAnalysis(request);
            }
        }

        private string ValidateRiskLevel(string riskLevel)
        {
            var validLevels = new[] { "_localizer["analyses.low"]", "_localizer["analyses.medium"]", "_localizer["analyses.high"]", "_localizer["auto.ActivityLogsController.278d01e5"]" };
            var normalized = riskLevel?.Trim();
            
            if (normalized != null && validLevels.Contains(normalized, StringComparer.OrdinalIgnoreCase))
            {
                return char.ToUpper(normalized[0]) + normalized.Substring(1).ToLower();
            }
            
            return "_localizer["analyses.medium"]";
        }

        private BusinessAnalysisResult GenerateSimulatedAnalysis(BusinessAnalysisRequest request)
        {
            // Fallback simulated analysis when API is not available
            var random = new Random(request.BusinessIdea.GetHashCode());
            
            var successProbability = random.Next(45, 85);
            var overallScore = random.Next(60, 90);
            var projectedROI = (decimal)(random.Next(-20, 150) + random.NextDouble());
            
            var riskLevels = new[] { "_localizer["analyses.low"]", "_localizer["analyses.medium"]", "_localizer["analyses.high"]" };
            var riskLevel = riskLevels[random.Next(riskLevels.Length)];

            return new BusinessAnalysisResult
            {
                SuccessProbability = successProbability,
                RiskLevel = riskLevel,
                ProjectedROI = Math.Round(projectedROI, 2),
                Investment = request.InitialInvestment,
                OverallScore = overallScore,
                KeyFindings = new List<string>
                {
                    "_localizer["auto.GeminiAIService.357fea97"]",
                    "_localizer["auto.GeminiAIService.5d8efae3"]",
                    "_localizer["auto.GeminiAIService.4c679e46"]",
                    "_localizer["auto.GeminiAIService.98c8e5c3"]",
                    "_localizer["auto.GeminiAIService.6c9b4c5f"]",
                    "_localizer["auto.GeminiAIService.ccc563f0"]"
                },
                ExecutiveSummary = $"The proposed {request.Industry} business shows promising potential with calculated risks. Success depends heavily on execution strategy and market timing.",
                Recommendations = new List<string>
                {
                    "Conduct detailed market research before full-scale launch",
                    "_localizer["auto.GeminiAIService.7faec420"]",
                    "_localizer["auto.GeminiAIService.f67edda4"]",
                    "_localizer["auto.GeminiAIService.a54b0018"]"
                }
            };
        }

        private class GeminiAnalysisResponse
        {
            [JsonProperty("_localizer["auto.GeminiAIService.2fc68165"]")]
            public int SuccessProbability { get; set; }

            [JsonProperty("_localizer["auto.GeminiAIService.60988b7c"]")]
            public string RiskLevel { get; set; } = "_localizer["analyses.medium"]";

            [JsonProperty("_localizer["auto.GeminiAIService.517b3b6b"]")]
            public decimal ProjectedROI { get; set; }

            [JsonProperty("_localizer["auto.GeminiAIService.9ddabcfc"]")]
            public decimal RecommendedInvestment { get; set; }

            [JsonProperty("_localizer["auto.GeminiAIService.7f8b1199"]")]
            public int OverallScore { get; set; }

            [JsonProperty("_localizer["auto.GeminiAIService.0284c546"]")]
            public List<string>? KeyFindings { get; set; }

            [JsonProperty("_localizer["auto.GeminiAIService.13fc0b3c"]")]
            public string? ExecutiveSummary { get; set; }

            [JsonProperty("recommendations")]
            public List<string>? Recommendations { get; set; }
        }
    }
}

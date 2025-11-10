namespace Masroo3k.Api.DTOs
{
    public class ActivityLogResponse
    {
        public int Id { get; set; }
        public string Action { get; set; } = null!;
        public string EntityType { get; set; } = null!;
        public int? EntityId { get; set; }
        public string Description { get; set; } = null!;
        public string? Details { get; set; }
        public string IpAddress { get; set; } = null!;
        public string UserAgent { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public string Severity { get; set; } = null!;
        public int? UserId { get; set; }
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
    }

    public class ActivityLogFilter
    {
        public string? Action { get; set; }
        public string? EntityType { get; set; }
        public string? Severity { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? SearchTerm { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 50;
    }
}

namespace Masroo3k.Api.DTOs
{
    public class CreateUserRequest
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Role { get; set; }
    }

    public class UpdateUserRequest
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string? Password { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace demo_api.Models
{
    public class RefreshTokenDto
    {
        public string RefreshToken { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
    }
}

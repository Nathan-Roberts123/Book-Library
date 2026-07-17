namespace demo_api.Models
{
    public class BookResponseDto
    {
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public int YearPublished { get; set; }
        public string? PosterUrl { get; set; }
    }
}

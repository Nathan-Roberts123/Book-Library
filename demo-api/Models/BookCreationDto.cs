namespace demo_api.Models
{
    public class BookCreationDto
    {
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public int YearPublished { get; set; }
        public IFormFile? Poster { get; set; }
    }
}

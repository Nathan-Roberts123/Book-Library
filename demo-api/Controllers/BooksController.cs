using Amazon.S3;
using Amazon.S3.Model;
using demo_api.Data;
using demo_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Runtime;

namespace demo_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly DemoAPIContext _context;

        public BooksController(DemoAPIContext context) {
            _context = context;
        }

        private string getS3preSignedUrl(IAmazonS3 s3Client, string BucketName, string Key)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = BucketName,
                Key = Key,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(120)
            };

            string preSignedUrl = s3Client.GetPreSignedURL(request);

            return preSignedUrl;
        }

        private async Task putS3objet(IFormFile Poster, string BucketName, Book book, IAmazonS3 s3Client)
        {
            using var stream = Poster.OpenReadStream();

            var key = $"images/{Guid.NewGuid().ToString()}";
            var putRequest = new PutObjectRequest
            {
                BucketName = BucketName,
                Key = key,
                InputStream = stream,
                ContentType = Poster.ContentType,
                Metadata =
                    {
                        ["file-name"] = Poster.FileName
                    }
            };

            await s3Client.PutObjectAsync(putRequest);
            book.PosterKey = key;
        }

        private async Task deleteS3Object(string PosterKey, string BucketName, IAmazonS3 s3Client)
        {
            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = BucketName,
                Key = PosterKey
            };
            await s3Client.DeleteObjectAsync(deleteRequest);
        }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetBooks(IOptions<S3Settings> s3settings, IAmazonS3 s3Client)
        {
            List<Book> books = await _context.Books.ToListAsync();
            
            List<BookResponseDto> responseBooks = new List<BookResponseDto>();

            foreach (var book in books)
            {
                var dto = new BookResponseDto
                {
                    Title = book.Title,
                    Author = book.Author,
                    YearPublished = book.YearPublished
                };

                if (string.IsNullOrEmpty(book.PosterKey)) {
                    responseBooks.Add(dto);
                    continue;
                };

                string presignedUrl = getS3preSignedUrl(s3Client, s3settings.Value.BucketName, book.PosterKey); 
                dto.PosterUrl = presignedUrl;
                responseBooks.Add(dto);
            }
            return Ok(responseBooks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id, IAmazonS3 s3Client, IOptions<S3Settings> s3settings)
        {
            Book? book = await _context.Books.FindAsync(id);
            if (book == null) return NotFound();

            if (string.IsNullOrEmpty(book.PosterKey)) return Ok(book);

            string posterUrl = getS3preSignedUrl(s3Client, s3settings.Value.BucketName, book.PosterKey);

            BookResponseDto responseBook = new BookResponseDto
            {
                Title = book.Title,
                Author = book.Author,
                YearPublished = book.YearPublished,
                PosterUrl = posterUrl
            };

            return Ok(responseBook);
        }

        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook([FromForm] BookCreationDto dto, IAmazonS3 s3Client, IOptions<S3Settings> s3settings)
        {
            if (dto == null) return BadRequest();

            Book book = new Book
            {
                Title = dto.Title,
                Author = dto.Author,
                YearPublished = dto.YearPublished
            };

            if (dto.Poster != null && dto.Poster.Length > 0)
            {
                await putS3objet(dto.Poster, s3settings.Value.BucketName, book, s3Client);
            }

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBook(int id, [FromForm] BookCreationDto updatedBook, IAmazonS3 s3Client, IOptions<S3Settings> s3settings)
        {
            Book? book = await _context.Books.FindAsync(id);
            if (book == null) return NotFound();

            if (updatedBook.Poster != null && updatedBook.Poster.Length > 0)
            {
                if (!string.IsNullOrEmpty(book.PosterKey))
                {
                    await deleteS3Object(book.PosterKey, s3settings.Value.BucketName, s3Client);
                }

                await putS3objet(updatedBook.Poster, s3settings.Value.BucketName, book, s3Client);
            }

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.YearPublished = updatedBook.YearPublished;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(int id, IAmazonS3 s3Client, IOptions<S3Settings> s3settings)
        {
            Book? book = await _context.Books.FindAsync(id);
            if (book == null) return NotFound();

            if (book.PosterKey != null)
            {
                await deleteS3Object(book.PosterKey, s3settings.Value.BucketName,s3Client);
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

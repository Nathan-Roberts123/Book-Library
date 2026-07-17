using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace demo_api.Migrations
{
    /// <inheritdoc />
    public partial class fixbookmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "yearPublished",
                table: "Books",
                newName: "YearPublished");

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Author", "Title", "YearPublished" },
                values: new object[,]
                {
                    { 1, "F. Scott Fitzgerald", "The Great Gatsby", 1925 },
                    { 2, "Harper Lee", "To Kill a Mockingbird", 1960 },
                    { 3, "George Orwell", "1984", 1949 },
                    { 4, "Jane Austen", "Pride and Prejudice", 1813 },
                    { 5, "Herman Melville", "Moby-Dick", 1851 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.RenameColumn(
                name: "YearPublished",
                table: "Books",
                newName: "yearPublished");
        }
    }
}

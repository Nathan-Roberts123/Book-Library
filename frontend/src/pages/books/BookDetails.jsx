import BookHero from "../../components/BookDetails/BookHero";
import CoverImageCard from "../../components/BookDetails/CoverImageCard";
import BookActions from "../../components/BookDetails/BookActions";

const book = {
  id: 5,
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  yearPublished: 1937,
  addedOn: "May 12, 2024",
  cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
  description:
    "The Hobbit is a fantasy novel by English author J. R. R. Tolkien. It was first published in 1937 and tells the story of Bilbo Baggins, a hobbit who is swept into an epic quest with a group of dwarves to reclaim their lost kingdom.",
};

export default function BookDetails() {
  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <BookHero
          book={book}
          onEdit={() => console.log("Edit")}
          onDelete={() => console.log("Delete")}
        />
      </div>
      <CoverImageCard
        imageUrl="https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg"
        fileName="the-hobbit-cover.jpg"
        uploadedOn="May 12, 2024, 10:30 AM"
        fileSize="1.2 MB"
        storageProvider="Amazon S3"
        onViewFullSize={() =>
          window.open(
            "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
            "_blank",
          )
        }
      />
      <BookActions
        onEdit={() => navigate(`/books/${book.id}/edit`)}
        onDelete={() => deleteBook(book.id)}
        onBack={() => navigate("/books")}
      />
    </>
  );
}

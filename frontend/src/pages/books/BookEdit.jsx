import EditForm from "../../components/EditForm";
import { useBook } from "../../hooks/useBook";

export default function BookEdit() {
  const { book, loading } = useBook();

  if (loading) return <p>Loading form...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-bold">Edit Book</h1>

            <p className="mt-2 text-xl text-gray-500">
              Update the details of your book.
            </p>
          </div>
        </div>

        {/* Card */}
        <EditForm
          id={book.id}
          title={book.title}
          author={book.author}
          yearPublished={book.yearPublished}
          currentCover={book.posterUrl}
        />
      </div>
    </div>
  );
}

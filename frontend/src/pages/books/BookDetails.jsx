import BookHero from "../../components/BookDetails/BookHero";
import { useNavigate, useParams } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

export default function BookDetails() {
  const navigate = useNavigate();
  const { book, loading, error } = useBook();

  // 3. Handle loading and rendering states
  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  const onDelete = async () => {
    navigate("delete");
  };

  return (
    <>
      <BookHero
        book={book}
        onEdit={() => navigate("edit")}
        onDelete={onDelete}
      />
    </>
  );
}

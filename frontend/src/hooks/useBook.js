import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function useBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!bookId) return;

    fetch(
      `https://cd4u4zcxfw35tzjy5a3bwhhchy0jgzpw.lambda-url.us-east-1.on.aws/api/books/${bookId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch book");
        return response.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [bookId]);

  return { book, loading, error, bookId };
}

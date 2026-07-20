import { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import BookTable from "../../components/BookTable";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const getBooks = async () => {
    // Get the token out of storage
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        "https://cd4u4zcxfw35tzjy5a3bwhhchy0jgzpw.lambda-url.us-east-1.on.aws/api/books",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (response.status === 401) {
        console.log("Token expired or unauthorized!");
        // This is where you would use the refreshToken to get a new accessToken
      }

      const data = await response.json();

      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="text-5xl font-bold">Books</h1>

          <p className="mt-2 text-gray-500 text-xl">
            Manage your collection of books.
          </p>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <div className="relative w-[500px]">
          <FiSearch className="absolute left-4 top-4 text-gray-400 text-xl" />

          <input
            className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 outline-none"
            placeholder="Search books by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8">
        {loading ? <p>Loading Books</p> : <BookTable books={filteredBooks} />}
      </div>
    </>
  );
}

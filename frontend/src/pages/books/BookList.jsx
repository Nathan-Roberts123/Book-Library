import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import BookTable from "../../components/BookTable";
import { books as bookData } from "../../data/books";

export default function BookList() {
  const [search, setSearch] = useState("");

  const filteredBooks = bookData.filter(
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
        <BookTable books={filteredBooks} />
      </div>
    </>
  );
}

import { FiEdit, FiTrash, FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function BookTable({ books }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr className="text-left text-gray-600">
            <th className="p-6">Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year Published</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b last:border-none">
              <td className="p-6">
                <img
                  src={book.posterUrl}
                  alt={book.title}
                  className="h-28 rounded-lg object-cover"
                />
              </td>

              <td className="font-semibold text-lg">{book.title}</td>

              <td>{book.author}</td>

              <td>{book.yearPublished}</td>

              <td>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`${book.id}`)}
                    className="rounded-lg border border-blue-500 px-4 py-2 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <FiExternalLink />
                    View
                  </button>

                  <button
                    onClick={() => navigate(`${book.id}/edit`)}
                    className="rounded-lg border border-blue-500 px-4 py-2 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <FiEdit />
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

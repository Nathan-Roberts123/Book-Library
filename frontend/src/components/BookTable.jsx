import { FiEdit, FiTrash } from "react-icons/fi";

export default function BookTable({ books }) {
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
                  src={book.cover}
                  alt={book.title}
                  className="h-28 rounded-lg object-cover"
                />
              </td>

              <td className="font-semibold text-lg">{book.title}</td>

              <td>{book.author}</td>

              <td>{book.year}</td>

              <td>
                <div className="flex gap-3">
                  <button className="rounded-lg border border-blue-500 px-4 py-2 text-blue-600 hover:bg-blue-50 flex items-center gap-2">
                    <FiEdit />
                    Edit
                  </button>

                  <button className="rounded-lg border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50 flex items-center gap-2">
                    <FiTrash />
                    Delete
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

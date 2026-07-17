import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function BookActions({ onEdit, onDelete, onBack }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left */}

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Actions</h2>

          <p className="mt-1 text-gray-500">
            Manage this book or return to the list.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-500 px-5 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
            >
              <FiEdit2 size={18} />
              Edit Book
            </button>

            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 font-medium text-red-600 transition hover:bg-red-50"
            >
              <FiTrash2 size={18} />
              Delete Book
            </button>
          </div>
        </div>

        {/* Right */}

        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-blue-500 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50 md:self-end"
        >
          <FiArrowLeft size={18} />
          Back to Books
        </button>
      </div>
    </div>
  );
}

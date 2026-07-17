import {
  FiEdit,
  FiTrash2,
  FiUser,
  FiCalendar,
  FiClock,
  FiHash,
} from "react-icons/fi";

export default function BookHero({ book, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
        {/* Cover Image */}

        <div>
          <img
            src={book.cover}
            alt={book.title}
            className="w-full max-w-[320px] rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* Book Info */}

        <div className="flex flex-col justify-between">
          {/* Top Row */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onEdit}
                className="flex items-center gap-2 rounded-xl border border-blue-600 px-5 py-3 text-blue-600 hover:bg-blue-50"
              >
                <FiEdit />
                Edit Book
              </button>

              <button
                onClick={onDelete}
                className="flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 text-red-500 hover:bg-red-50"
              >
                <FiTrash2 />
                Delete Book
              </button>
            </div>
          </div>

          {/* Metadata */}

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4">
              <FiUser className="mt-1 text-2xl text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Author</p>

                <p className="text-lg font-medium text-gray-900">
                  {book.author}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiCalendar className="mt-1 text-2xl text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Year Published</p>

                <p className="text-lg font-medium text-gray-900">
                  {book.yearPublished}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiClock className="mt-1 text-2xl text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Added On</p>

                <p className="text-lg font-medium text-gray-900">
                  {book.addedOn}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiHash className="mt-1 text-2xl text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Book ID</p>

                <p className="text-lg font-medium text-gray-900">{book.id}</p>
              </div>
            </div>
          </div>

          {/* Description */}

          <div className="mt-10">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              Description
            </h2>

            <p className="max-w-4xl text-lg leading-8 text-gray-600">
              {book.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

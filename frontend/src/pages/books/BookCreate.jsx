import BookForm from "../../components/BookForm";

export default function BookCreate() {
  return (
    <main className="overflow-auto">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-bold text-gray-900">Add New Book</h1>

            <p className="mt-3 text-xl text-gray-500">
              Fill in the details below to add a new book to your collection.
            </p>
          </div>
        </div>

        <BookForm />
      </div>
    </main>
  );
}

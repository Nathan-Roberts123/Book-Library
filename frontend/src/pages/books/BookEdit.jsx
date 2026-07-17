import { useRef, useState } from "react";
import { FiArrowLeft, FiSave, FiUploadCloud, FiFile } from "react-icons/fi";

export default function BookEdit() {
  const fileInputRef = useRef();

  const [book, setBook] = useState({
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    yearPublished: 1937,
  });

  const [newCover, setNewCover] = useState({
    file: null,
    preview: null,
  });

  const currentCover =
    "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg";

  function handleChange(e) {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  }

  function handleFile(file) {
    if (!file) return;

    setNewCover({
      file,
      preview: URL.createObjectURL(file),
    });
  }

  function onDrop(e) {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function submit(e) {
    e.preventDefault();

    console.log(book);
    console.log(newCover.file);
  }

  return (
    <main className="flex-1 bg-gray-50 p-10 overflow-auto">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-bold">Edit Book</h1>

            <p className="mt-2 text-xl text-gray-500">
              Update the details of your book.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl border bg-white px-6 py-3 hover:bg-gray-100">
            <FiArrowLeft />
            Back to Books
          </button>
        </div>

        {/* Card */}

        <form
          onSubmit={submit}
          className="mt-10 rounded-2xl border bg-white shadow-sm"
        >
          <div className="grid grid-cols-[1fr_260px]">
            {/* Left */}

            <div className="p-10">
              <h2 className="mb-8 text-3xl font-semibold">Book Information</h2>

              {/* Title */}

              <div className="mb-7">
                <label className="mb-2 block font-semibold">
                  Title <span className="text-red-500">*</span>
                </label>

                <input
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-5 py-4 outline-none focus:border-blue-500"
                />
              </div>

              {/* Author */}

              <div className="mb-7">
                <label className="mb-2 block font-semibold">
                  Author <span className="text-red-500">*</span>
                </label>

                <input
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-5 py-4 outline-none focus:border-blue-500"
                />
              </div>

              {/* Year */}

              <div className="mb-8">
                <label className="mb-2 block font-semibold">
                  Year Published <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="yearPublished"
                  value={book.yearPublished}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-5 py-4 outline-none focus:border-blue-500"
                />
              </div>

              {/* Upload */}

              <div>
                <label className="font-semibold">Poster (Cover Image)</label>

                <p className="mt-1 text-gray-500">
                  Upload a new cover image to replace the current one. Allowed
                  formats: JPG, PNG, GIF. Max size: 5MB.
                </p>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                  className="mt-5 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12"
                >
                  <div className="text-center">
                    <FiUploadCloud className="mx-auto text-6xl text-blue-600" />

                    <p className="mt-4 text-lg text-gray-600">
                      Drag and drop your new image here
                    </p>

                    <p className="my-3 text-gray-500">or</p>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="rounded-lg border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50"
                    >
                      Choose File
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFile(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* Selected file */}

                {newCover.file && (
                  <div className="mt-3 flex items-center justify-between rounded-lg border bg-white px-4 py-3">
                    <div className="flex items-center gap-3">
                      <FiFile />

                      <div>
                        <p>{newCover.file.name}</p>

                        <p className="text-sm text-gray-500">
                          {(newCover.file.size / 1024 / 1024).toFixed(2)}
                          MB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setNewCover({
                          file: null,
                          preview: null,
                        })
                      }
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right */}

            <div className="border-l p-8">
              <h3 className="text-2xl font-semibold">Current Cover</h3>

              <img
                src={currentCover}
                alt=""
                className="mt-6 w-full rounded-xl shadow"
              />

              <p className="mt-5 text-gray-500">
                This is your current cover image.
              </p>

              {newCover.preview && (
                <>
                  <h3 className="mt-10 text-2xl font-semibold">
                    New Cover Preview
                  </h3>

                  <img
                    src={newCover.preview}
                    alt=""
                    className="mt-5 w-full rounded-xl shadow border"
                  />
                </>
              )}
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 border-t bg-gray-50 px-10 py-6">
            <button
              type="button"
              className="rounded-xl border bg-white px-8 py-3 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            >
              <FiSave />
              Update Book
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

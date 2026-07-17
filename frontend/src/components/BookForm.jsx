import { useRef, useState } from "react";
import { FiArrowLeft, FiBook, FiImage, FiUpload } from "react-icons/fi";
import React from "react";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    year: "",
  });

  const [cover, setCover] = useState(null);

  const inputRef = useRef();

  function handleChange(e) {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  }

  function handleFile(file) {
    if (!file) return;

    setCover({
      file,
      preview: URL.createObjectURL(file),
    });
  }

  function onFileChange(e) {
    handleFile(e.target.files[0]);
  }

  function onDrop(e) {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function submit(e) {
    e.preventDefault();

    console.log(book);
    console.log(cover);
  }

  return (
    <form
      onSubmit={submit}
      className="mt-10 rounded-2xl border bg-white p-10 shadow-sm"
    >
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
          placeholder="Enter book title"
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
          placeholder="Enter author name"
          className="w-full rounded-xl border px-5 py-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* Year */}

      <div className="mb-7">
        <label className="mb-2 block font-semibold">
          Year Published <span className="text-red-500">*</span>
        </label>

        <input
          type="number"
          name="year"
          value={book.year}
          onChange={handleChange}
          placeholder="Enter year published"
          className="w-full rounded-xl border px-5 py-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* Upload */}

      <div>
        <label className="block font-semibold">Poster (Cover Image)</label>

        <p className="mt-1 text-gray-500">
          Upload a book cover image. Allowed formats: JPG, PNG, GIF. Max size:
          5MB.
        </p>

        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="mt-5 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-10"
        >
          {cover ? (
            <div className="flex flex-col items-center">
              <img
                src={cover.preview}
                alt=""
                className="mb-4 h-60 rounded-lg shadow"
              />

              <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
              >
                Choose Another Image
              </button>
            </div>
          ) : (
            <div className="text-center">
              <FiImage className="mx-auto mb-5 text-6xl text-blue-600" />

              <p className="text-lg text-gray-600">
                Drag and drop your image here
              </p>

              <p className="my-3 text-gray-500">or</p>

              <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                Choose File
              </button>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border bg-white px-4 py-3 text-gray-500">
          <FiUpload />

          {cover ? cover.file.name : "No file selected"}
        </div>
      </div>

      {/* Footer */}

      <div className="mt-10 flex justify-end gap-4">
        <button
          type="button"
          className="rounded-xl border px-8 py-3 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
        >
          <FiBook />
          Create Book
        </button>
      </div>
    </form>
  );
};

export default BookForm;

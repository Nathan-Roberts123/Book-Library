import { FiBook, FiPlusCircle, FiInfo } from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="w-72 border-r bg-white flex flex-col justify-between">
      <div>
        <div className="px-8 py-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FiBook />
            Book Library
          </h1>
        </div>

        <nav className="space-y-2 px-5">
          <button className="flex w-full items-center gap-3 rounded-xl bg-blue-50 px-5 py-4 text-blue-600 font-medium">
            <FiBook />
            Books
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-5 py-4 hover:bg-gray-100">
            <FiPlusCircle />
            Add Book
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-5 py-4 hover:bg-gray-100">
            <FiInfo />
            About
          </button>
        </nav>
      </div>

      <div className="border-t p-6 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center text-white">
          U
        </div>

        <div>
          <p className="text-sm">user@example.com</p>

          <button className="text-blue-600 mt-1">Sign Out</button>
        </div>
      </div>
    </aside>
  );
}

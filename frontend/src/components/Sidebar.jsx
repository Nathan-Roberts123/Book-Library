import { FiBook, FiPlusCircle, FiInfo } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => path === location.pathname;

  const activeClass = "bg-blue-50 text-blue-600 font-medium";
  const inactiveClass = "hover:bg-gray-100";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    navigate("/auth/signin");
  };

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
          <button
            onClick={() => navigate("/books")}
            className={`flex w-full items-center gap-3 rounded-xl px-5 py-4 ${isActive("/books") ? activeClass : inactiveClass}`}
          >
            <FiBook />
            Books
          </button>

          <button
            onClick={() => navigate("/books/create")}
            className={`flex w-full items-center gap-3 rounded-xl px-5 py-4 ${isActive("/books/create") ? activeClass : inactiveClass}`}
          >
            <FiPlusCircle />
            Add Book
          </button>

          <button
            onClick={() => navigate("/books/about")}
            className={`flex w-full items-center gap-3 rounded-xl px-5 py-4 ${isActive("/books/about") ? activeClass : inactiveClass}`}
          >
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

          <button
            onClick={handleLogout}
            className="text-blue-600 mt-1 hover:underline"
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}

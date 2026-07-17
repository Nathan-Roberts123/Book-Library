import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import BookList from "../pages/books/BookList";
import BookCreate from "../pages/books/BookCreate";
import BookDetails from "../pages/books/BookDetails";
import BookEdit from "../pages/books/BookEdit";
import About from "../pages/books/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Contains your Navbar and <Outlet />
    children: [
      {
        path: "books",
        children: [
          { index: true, element: <BookList /> }, // GET  /books
          { path: "create", element: <BookCreate /> }, // POST /books/create
          { path: ":bookId", element: <BookDetails /> }, // GET  /books/:bookId
          { path: ":bookId/edit", element: <BookEdit /> }, // PUT  /books/:bookId/edit
          { path: "about", element: <About /> },
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

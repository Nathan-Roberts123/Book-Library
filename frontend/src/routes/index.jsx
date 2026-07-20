import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import BookList from "../pages/books/BookList";
import BookCreate from "../pages/books/BookCreate";
import BookDetails from "../pages/books/BookDetails";
import BookEdit from "../pages/books/BookEdit";
import About from "../pages/books/About";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/books/about" replace />,
      },
      {
        path: "books",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            ),
          }, // GET  /books
          {
            path: "create",
            element: (
              <ProtectedRoute>
                <BookCreate />
              </ProtectedRoute>
            ),
          }, // POST /books/create
          {
            path: ":bookId",
            element: (
              <ProtectedRoute>
                <BookDetails />
              </ProtectedRoute>
            ),
          }, // GET  /books/:bookId
          {
            path: ":bookId/edit",
            element: (
              <ProtectedRoute>
                <BookEdit />
              </ProtectedRoute>
            ),
          }, // PUT  /books/:bookId/edit
          { path: "about", element: <About /> },
        ],
      },
      {
        path: "auth",
        children: [
          { path: "signin", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

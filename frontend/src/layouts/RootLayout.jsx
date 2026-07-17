import { Outlet, Link, NavLink } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-12">
        <Outlet />
      </main>
    </div>
  );
}

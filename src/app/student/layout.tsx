"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaBookOpen,
  FaCheckCircle,
  FaChalkboardTeacher,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaBell,
  FaUserGraduate
} from "react-icons/fa";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex items-center space-x-3 p-4 border-b">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition"
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <FaChalkboardTeacher className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-lg font-bold">AcademyPlus</h2>
          </Link>
        </div>

        <nav className="p-4 space-y-4">
          <Link
            href={`/student/SFLJG43954`} // 👈 replace with real logged-in ID
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md w-full"
          >
            <FaUserGraduate /> Profile
          </Link>

          <Link
            href="/student/dashboard"
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800 px-3 py-2 rounded-md w-full bg-blue-100"
          >
            <FaChalkboardTeacher /> Dashboard
          </Link>
          <Link
            href="/student/courses"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md w-full"
          >
            <FaBookOpen /> Courses
          </Link>
          <Link
            href="/student/report"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md w-full"
          >
            <FaChartLine /> Report
          </Link>
          <Link
            href="/student/results"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md w-full"
          >
            <FaCheckCircle /> Results
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full text-left px-3 py-2 rounded-md"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={20} />
          </button>
          <h1 className="text-lg text-gray-600 font-bold">Student Dashboard</h1>
          <FaBell className="text-gray-600" />
        </header>

        {/* Dynamic Content */}
        <main className=" space-y-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

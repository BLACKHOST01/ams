"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaCalendarCheck,
  FaSignOutAlt,
  FaUserGraduate,
  FaFileAlt,
  FaQrcode,
  FaBell,
  FaBars,
} from "react-icons/fa";
import { useCourses } from "../../context/CoursesContext";
import { toast, Toaster } from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";

interface LecturerDashboardProps {
  children: React.ReactNode;
}

export default function LecturerDashboard({
  children,
}: LecturerDashboardProps) {
  const router = useRouter();
  const { courses } = useCourses();

  const [selectedCourse, setSelectedCourse] = useState<string>(
    courses[0]?.code || ""
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrCourse, setQrCourse] = useState<string>("");

  const activeCourse = courses.find((c) => c.code === selectedCourse);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const getSessionQR = (courseCode: string) => {
    const today = new Date().toISOString().split("T")[0];
    return `${courseCode}-${today}`;
  };

  const openQRModal = (courseCode: string) => {
    setQrCourse(courseCode);
    setQrOpen(true);
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <Toaster position="top-right" />

      {/* Sidebar */}
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white text-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:relative md:translate-x-0 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Link
            href="/lecturer/dashboard"
            className="flex items-center gap-2 text-gray-800 hover:text-yellow-500 transition"
          >
            <div className="bg-gray-100 p-2 rounded-lg">
              <FaChalkboardTeacher className="text-xl text-gray-700" />
            </div>
            <h2 className="text-lg font-bold">Lecturer Panel</h2>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            href="/lecturer/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition transform"
          >
            <FaChalkboardTeacher className="text-xl" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            href="/lecturer/studentlist"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition transform"
          >
            <FaUserGraduate className="text-xl" />
            <span className="font-medium">Student List</span>
          </Link>
          <Link
            href="/lecturer/reports"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition transform"
          >
            <FaFileAlt className="text-xl" />
            <span className="font-medium">Reports</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full mt-6 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Logout</span>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex items-center justify-between md:hidden">
          <button
            className="text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={20} />
          </button>
          <h1 className="text-lg text-gray-600 font-bold">
            Lecturer Dashboard
          </h1>
          <FaBell className="text-gray-600" />
        </header>

        {/* QR Modal */}
        {qrOpen && qrCourse && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
            <div className="bg-white p-6 rounded-lg flex flex-col items-center">
              <h2 className="mb-4 font-bold">Session QR</h2>
              <QRCodeCanvas value={getSessionQR(qrCourse)} size={200} />
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => setQrOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Content */}
        <main className="p-6 space-y-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

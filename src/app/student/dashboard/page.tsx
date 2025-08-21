// dev/ams/src/app/student/dashboard/page.tsx
"use client";

import { useState } from "react";
import {
  FaBookOpen,
  FaCalendarCheck,
  FaCheckCircle,
  FaSignOutAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBell,
  FaBars,
  FaChartLine,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCourses } from "../../../context/CoursesContext";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { courses } = useCourses();

  // Dummy attendance data – replace with API later
  const attendanceData = [
    { date: "Mon", attendance: 80 },
    { date: "Tue", attendance: 90 },
    { date: "Wed", attendance: 70 },
    { date: "Thu", attendance: 95 },
    { date: "Fri", attendance: 85 },
  ];

  // Handle logout
  const handleLogout = () => {
    // Clear session/token here if needed
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
      <div className="flex items-center space-x-3 p-4 border-b">
          <Link
            href="/student/dashboard"
            className="flex items-center  gap-2 text-gray-800 hover:text-blue-600 transition"
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <FaChalkboardTeacher className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-lg font-bold">AcademyPlus</h2>
          </Link>
        </div>
        <nav className="p-4 space-y-4">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800 px-3 py-2 rounded-md w-full bg-blue-100"
          >
            <FaChalkboardTeacher /> Dashboard
          </Link>
          <Link
            href="/student/courses"
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800 px-3 py-2 rounded-md w-full bg-blue-100"
          >
            <FaBookOpen /> Courses
          </Link>
          <Link
            href="/student/attendance"
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800 px-3 py-2 rounded-md w-full bg-blue-100"
          >
            <FaChartLine /> report
          </Link>
          <Link
            href="/student/results"
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800 px-3 py-2 rounded-md w-full bg-blue-100"
          >
            <FaCheckCircle /> Results
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-blue-800 hover:text-red-600 w-full text-left"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
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
          <h1 className="text-lg text-gray-600 font-bold">Dashboard</h1>
          <FaBell className="text-gray-600" />
        </header>

        {/* Content */}
        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white shadow rounded-2xl p-4 text-center">
              <p className="text-sm text-gray-500">Total Courses</p>
              <p className="text-xl font-bold">{courses.length}</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4 text-center">
              <p className="text-sm text-gray-500">Attendance Rate</p>
              <p className="text-xl font-bold">86%</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4 text-center">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold">12</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4 text-center">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </div>

          {/* Attendance Overview Chart */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Attendance Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

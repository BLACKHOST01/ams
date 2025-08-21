"use client";

import { useState } from "react";
import {
  FaBookOpen,
  FaCalendarCheck,
  FaSignOutAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBars,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCourses } from "../../../context/CoursesContext";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

export default function StudentDashboard() {
  const router = useRouter();
  const { courses, markAttendance } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<string>(
    courses[0]?.code || ""
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeCourse = courses.find((c) => c.code === selectedCourse);

  const handleMarkAttendance = (method: "biometric" | "qrcode") => {
    if (!activeCourse) return;

    const today = new Date().toISOString().split("T")[0];
    const alreadyMarked = activeCourse.history.some((h) => h.date === today);

    if (alreadyMarked) {
      toast.error("Attendance already marked for today.");
      return;
    }

    try {
      markAttendance(activeCourse.code, method);
      toast.success(
        `Attendance marked via ${
          method.charAt(0).toUpperCase() + method.slice(1)
        } for ${activeCourse.code}`
      );
    } catch (err) {
      toast.error("Failed to mark attendance. Try again.");
    }
  };

  const handleLogout = () => router.push("/login");

  return (
    <div className="h-screen flex bg-gray-100">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 flex flex-col`}
      >
        {/* Logo */}
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

        {/* Register new courses */}
        <div className="p-4 border-b">
          <Link
            href="/student/courses/register"
            className="flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
          >
            <span className="text-sm font-bold">Register New Courses</span>
          </Link>
        </div>

        {/* My Courses */}
        <div className="p-4 text-center">
          <h2 className="text-md font-semibold flex items-center justify-center gap-2 text-gray-700">
            <FaUserGraduate /> My Courses
          </h2>
        </div>

        {/* Courses List */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {courses.map((course) => (
            <button
              key={course.code}
              role="menuitem"
              onClick={() => {
                setSelectedCourse(course.code);
                setSidebarOpen(false); // Auto close on mobile
              }}
              className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center transition ${
                selectedCourse === course.code
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>
                {course.code}
                <br />
                <span className="text-xs text-gray-500">{course.name}</span>
              </span>
              <span
                className={`text-sm font-bold ${
                  course.attendance >= 80
                    ? "text-green-600"
                    : course.attendance >= 60
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {course.attendance}%
              </span>
            </button>
          ))}
          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 space-y-6">
        {/* Mobile Toggle */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <button
            className="text-gray-700 p-2 rounded-md shadow-sm bg-white hover:bg-gray-50 transition"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FaBars size={20} />
          </button>
          <span className="text-lg text-blue-800 font-semibold truncate">
            {activeCourse?.code || ""}
          </span>
        </div>

        {activeCourse ? (
          <div className="space-y-6">
            {/* Course Header */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
              <FaBookOpen className="text-blue-600" />
              <span className="truncate">
                {activeCourse.code} - {activeCourse.name}
              </span>
            </h1>

            {/* Attendance History */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-700">
                <FaCalendarCheck className="text-blue-600" /> Attendance History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px] text-left border text-sm sm:text-base">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCourse.history.map((entry, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="p-2 border">{entry.date}</td>
                        <td
                          className={`p-2 border font-medium ${
                            entry.status === "Present"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {entry.status}
                        </td>
                        <td className="p-2 border text-gray-600 capitalize">
                          {entry.method
                            ? entry.method.charAt(0).toUpperCase() +
                              entry.method.slice(1)
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mark Attendance */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col md:flex-row flex-wrap justify-between items-stretch gap-4">
              <p className="text-gray-700 text-center md:text-left flex-1">
                Mark your attendance for today’s class
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => handleMarkAttendance("biometric")}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                >
                  Biometric
                </button>
                <button
                  onClick={() => handleMarkAttendance("qrcode")}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition w-full sm:w-auto"
                >
                  QR Code
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Select a course from the sidebar</p>
        )}
      </main>
    </div>
  );
}

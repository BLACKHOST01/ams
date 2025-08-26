"use client";

import { useState } from "react";
import {
  FaBookOpen,
  FaCalendarCheck,
  FaSignOutAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBars,
  FaRegistered,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCourses } from "../../../context/CoursesContext";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { Scanner } from "@yudiel/react-qr-scanner"; // ✅ correct

export default function StudentDashboard() {
  const router = useRouter();
  const { courses, markAttendance } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<string>(
    courses[0]?.code || ""
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔑 Modal states
  const [openScanner, setOpenScanner] = useState(false);
  const [openBiometric, setOpenBiometric] = useState(false);

  const activeCourse = courses.find((c) => c.code === selectedCourse);

  // ✅ Attendance function
  const confirmAttendance = (method: "biometric" | "qrcode") => {
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
        }`
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
            <h2 className="text-lg font-bold">student Panel</h2>
          </Link>
        </div>
        <div className="flex items-center space-x-3 p-4 border-b">
          <Link
            href="/student/courses/register"
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition"
          >
            <span className="text-sm font-bold">Register New Courses</span>
          </Link>
        </div>

        {/* My Courses */}
        <div className="p-4 text-center">
          <h2 className="text-md font-semibold flex items-center justify-center gap-2 text-gray-700">
            <FaBookOpen /> My Courses
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
                setSidebarOpen(false); // Close sidebar on mobile
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden mb-4 p-2 bg-blue-700 text-white rounded"
        >
          <FaBars />
        </button>

        <h2 className="text-3xl font-bold mb-6">Student Dashboard</h2>

        {/* Course Selector */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Select Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border rounded-lg p-2 w-full"
          >
            {courses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.name} ({course.code})
              </option>
            ))}
          </select>
        </div>

        {/* Course Info */}
        {activeCourse && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{activeCourse.name}</h3>
            <p className="text-gray-600 mb-4">Code: {activeCourse.code}</p>

            {/* Attendance Buttons */}
            <div className="space-x-4 mb-4">
              <button
                onClick={() => setOpenBiometric(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Mark via Biometric
              </button>
              <button
                onClick={() => setOpenScanner(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Mark via QR Code
              </button>
            </div>

            {/* Attendance History */}
            <h4 className="font-semibold mb-2">Attendance History</h4>
            <ul className="space-y-1">
              {activeCourse.history.length > 0 ? (
                activeCourse.history.map((h, i) => (
                  <li key={i} className="text-gray-600">
                    {h.date} - {h.method}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No attendance records yet.</li>
              )}
            </ul>
          </div>
        )}
      </main>

      {/* QR Code Scanner Modal */}
      {/* QR Code Scanner Modal */}
      {openScanner && activeCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-4 shadow-lg w-[90%] sm:w-[400px]">
            <h2 className="font-semibold mb-2">Scan QR Code</h2>

            <Scanner
              onScan={(results) => {
                if (results && results[0]?.rawValue) {
                  const scannedValue = results[0].rawValue.trim();
                  const today = new Date().toISOString().split("T")[0];
                  const expectedQR = `${activeCourse.code}-${today}`;

                  if (scannedValue === expectedQR) {
                    confirmAttendance("qrcode");
                    setOpenScanner(false);
                  } else {
                    toast.error("Invalid or expired QR Code.");
                  }
                }
              }}
              onError={(err) => console.error("QR Scanner error:", err)}
              constraints={{ facingMode: "environment" }}
            />

            <button
              onClick={() => setOpenScanner(false)}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Biometric Modal */}
      {openBiometric && activeCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] sm:w-[400px] text-center">
            <h2 className="font-semibold mb-4">Biometric Authentication</h2>
            <p className="mb-4">Simulated biometric scan...</p>
            <button
              onClick={() => {
                confirmAttendance("biometric");
                setOpenBiometric(false);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Confirm Biometric
            </button>
            <button
              onClick={() => setOpenBiometric(false)}
              className="ml-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

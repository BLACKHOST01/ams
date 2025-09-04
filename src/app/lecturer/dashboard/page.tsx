"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaCalendarCheck,
  FaSignOutAlt,
  FaQrcode,
  FaBars,
} from "react-icons/fa";
import { useCourses } from "../../../context/CoursesContext";
import { toast, Toaster } from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";

export default function LecturerDashboard() {
  const router = useRouter();
  const { courses } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<string>(
    courses[0]?.code || ""
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const activeCourse = courses.find((c) => c.code === selectedCourse);

  const handleLogout = () => router.push("/login");

  // 🔑 Generate session QR value
  const getSessionQR = (courseCode: string) => {
    const today = new Date().toISOString().split("T")[0];
    return `${courseCode}-${today}`;
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 text-center border-b">
          <h2 className="text-md font-semibold flex items-center justify-center gap-2 text-gray-700">
            <FaBookOpen /> Mark Attendance
          </h2>
        </div>

        {/* Courses List */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {courses.map((course) => {
            const today = new Date().toISOString().split("T")[0];
            return (
              <div
                key={course.code}
                className={`w-full px-3 py-2 rounded-md flex justify-between items-center transition ${
                  selectedCourse === course.code
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  onClick={() => {
                    setSelectedCourse(course.code);
                    setSidebarOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {course.code}
                  <br />
                  <span className="text-xs text-gray-500">{course.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-500">
                    {course.attendance}%
                  </span>
                  {/* QR Button with Tooltip */}
                  <button
                    onClick={() => setQrOpen(true)}
                    title={`QR valid for today: ${today}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaQrcode />
                  </button>
                </div>
              </div>
            );
          })}
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
      <main className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 space-y-6">
        {/* Mobile Toggle */}
        <header className="bg-white shadow p-4 flex items-center justify-between md:hidden rounded-md">
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
        </header>

        {activeCourse ? (
          <div className="space-y-6">
            {/* Course Header */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden">
              <FaBookOpen className="text-blue-600" />
              <span className="truncate overflow-hidden">
                {activeCourse.code} - {activeCourse.name}
              </span>
            </h1>

            {/* Generate QR Code */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-4">
              <p className="text-gray-700 flex-1">
                Generate QR Code for today’s attendance
              </p>
              <button
                onClick={() => setQrOpen(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <FaQrcode /> Generate QR
              </button>
            </div>

            {/* Attendance History */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-700">
                <FaCalendarCheck className="text-blue-600" /> Attendance Records
              </h2>

              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full min-w-[360px] text-left border text-sm sm:text-base">
                  <thead>
                    <tr className="bg-gray-100 text-gray-800">
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Student</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCourse.history.map((entry, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="p-2 border">{entry.date}</td>
                        <td className="p-2 border">{entry.student || "N/A"}</td>
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
                          {entry.method || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card */}
              <div className="sm:hidden text-gray-600 flex flex-col gap-4">
                {activeCourse.history.map((entry, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-3 rounded-lg shadow-sm flex flex-col gap-1"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Date:</span>
                      <span>{entry.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Student:</span>
                      <span>{entry.student || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Status:</span>
                      <span
                        className={
                          entry.status === "Present"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {entry.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Method:</span>
                      <span className="capitalize">{entry.method || "N/A"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Select a course from the sidebar</p>
        )}
      </main>

      {/* 🔲 QR Code Modal */}
      {qrOpen && activeCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] sm:w-[400px] text-center">
            <h2 className="font-semibold mb-4">
              QR Code for {activeCourse.code}
            </h2>
            <QRCodeCanvas
              value={getSessionQR(activeCourse.code)}
              size={220}
              className="mx-auto"
            />
            <p className="mt-3 text-sm text-gray-600">
              Scan this QR to mark attendance. It expires today.
            </p>
            <button
              onClick={() => setQrOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

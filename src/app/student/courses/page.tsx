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
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCourses } from "../../../context/CoursesContext";
import Link from "next/link";

export default function StudentDashboard() {
  const router = useRouter();
  const { courses, markAttendance } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<string>(
    courses[0]?.code || ""
  );

  const activeCourse = courses.find((c) => c.code === selectedCourse);

  const handleMarkAttendance = () => {
    if (!activeCourse) return;
    const today = new Date().toISOString().split("T")[0];
    const alreadyMarked = activeCourse.history.some((h) => h.date === today);
    if (alreadyMarked) {
      alert("Attendance already marked for today.");
      return;
    }
    markAttendance(activeCourse.code);
    alert(`Attendance marked for ${activeCourse.code}`);
  };

  const handleLogout = () => router.push("/login");

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}

      <aside className="w-72 bg-indigo-800 text-white flex flex-col">
        <div className="flex items-center space-x-3 p-4 border-b border-indigo-700 pb-6">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FaChalkboardTeacher className="text-xl" />
          </div>
          <Link
            href="/student/dashboard"
            className="flex items-center space-x-3 p-3 bg-indigo-700 rounded-lg"
          >
            <h2 className="text-xl font-bold">AcademyPlus</h2>
          </Link>
        </div>
        <div className="p-4 text-center border-b border-indigo-600">
          <Link
            href="/student/courses/register"
            className="flex items-center p-3 bg-green-700 rounded-lg"
          >
            <h2 className="text-sm text-center font-bold flex items-center justify-center">
              register new courses
            </h2>
          </Link>
        </div>

        <div className="p-4 text-center">
          <h2 className="text-lg font-bold flex items-center justify-center gap-2">
            <FaUserGraduate /> My Courses
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {courses.map((course) => (
            <button
              key={course.code}
              onClick={() => setSelectedCourse(course.code)}
              className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                selectedCourse === course.code
                  ? "bg-indigo-500"
                  : "hover:bg-indigo-600"
              }`}
            >
              <span>
                {course.code}
                <br />
                <span className="text-xs text-indigo-200">{course.name}</span>
              </span>
              <span
                className={`text-sm font-bold ${
                  course.attendance >= 80
                    ? "text-green-300"
                    : course.attendance >= 60
                    ? "text-yellow-300"
                    : "text-red-300"
                }`}
              >
                {course.attendance}%
              </span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-indigo-600">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-500"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeCourse ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <FaBookOpen className="text-indigo-600" />
              {activeCourse.code} - {activeCourse.name}
            </h1>

            {/* Attendance History */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <FaCalendarCheck className="text-indigo-600" /> Attendance
                History
              </h2>
              <table className="w-full text-left border">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCourse.history.map((entry, i) => (
                    <tr key={i} className="hover:bg-gray-50">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mark Attendance */}
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
              <p className="text-gray-700">
                Mark your attendance for today’s class
              </p>
              <button
                onClick={handleMarkAttendance}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <FaCheckCircle /> Mark Attendance
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Select a course from the sidebar</p>
        )}
      </main>
    </div>
  );
}

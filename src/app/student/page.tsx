"use client";

import { useState } from "react";
import {
  FaUserGraduate,
  FaCalendarCheck,
  FaBookOpen,
  FaCheckCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

type Course = {
  code: string;
  name: string;
  attendance: number; // percentage
  history: { date: string; status: "Present" | "Absent" }[];
};

export default function StudentDashboard() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<string>("CSC101");

  // Sample courses with attendance
  const courses: Course[] = [
    {
      code: "CSC101",
      name: "Introduction to Computer Science",
      attendance: 90,
      history: [
        { date: "2025-08-01", status: "Present" },
        { date: "2025-08-02", status: "Absent" },
        { date: "2025-08-03", status: "Present" },
      ],
    },
    {
      code: "MTH102",
      name: "Calculus II",
      attendance: 80,
      history: [
        { date: "2025-08-01", status: "Present" },
        { date: "2025-08-02", status: "Present" },
        { date: "2025-08-03", status: "Absent" },
      ],
    },
    {
      code: "PHY103",
      name: "Physics for Engineers",
      attendance: 75,
      history: [
        { date: "2025-08-01", status: "Absent" },
        { date: "2025-08-02", status: "Present" },
        { date: "2025-08-03", status: "Present" },
      ],
    },
  ];

  const activeCourse = courses.find((c) => c.code === selectedCourse);

  const handleLogout = () => {
    // TODO: clear auth/session
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col">
        <div className="p-4 text-center border-b border-indigo-600">
          <h2 className="text-lg font-bold flex items-center justify-center gap-2">
            <FaUserGraduate /> My Courses
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
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
                {course.code} <br />
                <span className="text-xs text-indigo-200">{course.name}</span>
              </span>
              <span
                className={`text-sm font-bold ${
                  course.attendance >= 80 ? "text-green-300" : "text-yellow-300"
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
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <FaBookOpen className="text-indigo-600" />
              {activeCourse.code} - {activeCourse.name}
            </h1>

            {/* Attendance History */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <FaCalendarCheck className="text-indigo-600" /> Attendance History
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

            {/* Mark Attendance Button */}
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
              <p className="text-gray-700">
                Mark your attendance for today’s class
              </p>
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                <FaCheckCircle /> Mark Attendance
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Select a course from the sidebar</p>
        )}
      </main>
    </div>
  );
}

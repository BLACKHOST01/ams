"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function StudentReport() {
  const student = {
    name: "John Doe",
    matric: "FUK/CSC/21/001",
    department: "Computer Science",
    faculty: "Faculty of Science",
    level: "300 Level",
    session: "2024/2025 Academic Session",
    age: 20,
    gender: "Male",
  };

  // Registered courses (can later be pulled from DB)
  const courses = [
    { code: "CSC301", title: "Data Structures", credit: 3 },
    { code: "CSC305", title: "Database Systems", credit: 3 },
    { code: "CSC307", title: "Computer Networks", credit: 3 },
    { code: "CSC311", title: "Operating Systems", credit: 2 },
    { code: "MTH309", title: "Numerical Methods", credit: 2 },
    { code: "GST301", title: "Entrepreneurship", credit: 2 },
  ];

  const totalCourses = courses.length;
  const totalCredits = courses.reduce((sum, c) => sum + c.credit, 0);

  // Attendance data
  const attendanceData = [
    { week: "Week 1", attendance: 92 },
    { week: "Week 2", attendance: 85 },
    { week: "Week 3", attendance: 78 },
    { week: "Week 4", attendance: 95 },
  ];

  // Subject performance
  const performanceData = [
    { subject: "Mathematics", score: 88 },
    { subject: "Programming", score: 92 },
    { subject: "Databases", score: 75 },
    { subject: "Networking", score: 81 },
  ];

  // Assessment breakdown
  const assessmentData = [
    { type: "Assignments", score: 85 },
    { type: "Quizzes", score: 78 },
    { type: "Examinations", score: 90 },
  ];

  // Averages
  const avgScore =
    performanceData.reduce((sum, s) => sum + s.score, 0) /
    performanceData.length;
  const progression =
    avgScore >= 70 ? "Satisfactory" : avgScore >= 50 ? "Fair" : "Unsatisfactory";

  const attendanceRate =
    attendanceData.reduce((sum, a) => sum + a.attendance, 0) /
    attendanceData.length;

  const COLORS = ["#1d4ed8", "#16a34a", "#b91c1c"];

  return (
    <div className="p-6 space-y-6">
      {/* Cover Section */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-center uppercase mb-4">
          Federal University Kashere
        </h1>
        <h2 className="text-lg font-semibold text-center mb-6">
          Student Academic Report
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><span className="font-semibold">Name:</span> {student.name}</p>
          <p><span className="font-semibold">Matric No:</span> {student.matric}</p>
          <p><span className="font-semibold">Department:</span> {student.department}</p>
          <p><span className="font-semibold">Faculty:</span> {student.faculty}</p>
          <p><span className="font-semibold">Level:</span> {student.level}</p>
          <p><span className="font-semibold">Session:</span> {student.session}</p>
          <p><span className="font-semibold">Age:</span> {student.age}</p>
          <p><span className="font-semibold">Gender:</span> {student.gender}</p>
        </div>
      </div>

      {/* Registered Courses */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Registered Courses</h2>
        <p className="text-sm mb-3">
          <span className="font-semibold">Total Courses:</span> {totalCourses} |{" "}
          <span className="font-semibold">Total Credit Units:</span> {totalCredits}
        </p>
        <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-3 py-2 border-b">Course Code</th>
              <th className="px-3 py-2 border-b">Course Title</th>
              <th className="px-3 py-2 border-b">Credit Units</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, index) => (
              <tr
                key={c.code}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-3 py-2 border-b">{c.code}</td>
                <td className="px-3 py-2 border-b">{c.title}</td>
                <td className="px-3 py-2 border-b">{c.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Attendance */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Attendance Record</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={attendanceData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="attendance" stroke="#1d4ed8" />
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-3 text-sm">
          <span className="font-semibold">Overall Attendance Rate:</span>{" "}
          {attendanceRate.toFixed(1)}%
        </p>
      </div>

      {/* Academic Performance */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Course Performance</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={performanceData}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Assessment Breakdown */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Assessment Breakdown</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={assessmentData}
              dataKey="score"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {assessmentData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Academic Standing */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Academic Standing</h2>
        <p className="text-base">
          <span className="font-semibold">Overall Average:</span>{" "}
          {avgScore.toFixed(1)}%
        </p>
        <p className="mt-1 text-base">
          <span className="font-semibold">Standing:</span>{" "}
          <span
            className={
              progression === "Satisfactory"
                ? "text-green-700"
                : progression === "Fair"
                ? "text-yellow-600"
                : "text-red-600"
            }
          >
            {progression}
          </span>
        </p>
      </div>

      {/* Remarks */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Remarks</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          The student has demonstrated strong academic performance in
          Programming and Mathematics. Improvement is required in Databases
          to ensure balanced progress across all courses. With consistent
          attendance and academic engagement, the student is on track to
          graduate successfully.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaCalendarCheck,
  FaCheckCircle,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaBell,
  FaBars,
  FaChartLine,
} from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import { useCourses } from "../../../context/CoursesContext";

// import { useCourses } from "../../../../context/CoursesContext"; // updated path
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
  const [student, setStudent] = useState<any>(null);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    async function fetchStudent() {
      if (!id) return;
      const res = await fetch(`/api/student/${id}`);
      const data = await res.json();
      setStudent(data);
    }
    fetchStudent();
  }, [id]);

  const attendanceData = [
    { date: "Mon", attendance: 80 },
    { date: "Tue", attendance: 90 },
    { date: "Wed", attendance: 70 },
    { date: "Thu", attendance: 95 },
    { date: "Fri", attendance: 85 },
  ];

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
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

          {/* Attendance Chart */}
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

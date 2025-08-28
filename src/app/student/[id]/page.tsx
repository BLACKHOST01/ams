"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    async function fetchStudent() {
      const res = await fetch(`/api/student/${id}`);
      const data = await res.json();
      setStudent(data);
    }
    fetchStudent();
  }, [id]);

  if (!student) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 transition-transform duration-300 hover:scale-[1.02]">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          Student Profile
        </h1>

        {/* Profile Info */}
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Name:</span>
            <span>{student.full_name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">ID:</span>
            <span>{student.identifier}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Email:</span>
            <span>{student.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Role:</span>
            <span className="text-green-600 font-medium">Student</span>
          </div>
        </div>

        {/* Academic Info */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 border-b pb-2">
            Academic Info
          </h2>
          <p className="text-gray-600">Registered Courses, Attendance, etc.</p>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors">
            View Courses
          </button>
        </div>
      </div>
    </div>
  );
}

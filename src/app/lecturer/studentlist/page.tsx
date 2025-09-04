"use client";

import { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

interface Student {
  id: string;
  fullName: string;
  email: string;
  courses: string[];
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Single fetchStudents function
  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      if (!res.ok) throw new Error("Failed to fetch students");
      const data: Student[] = await res.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load students");
      setStudents([]);
    } finally {
      setLoading(false); // ✅ ensures loading is turned off
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Count students per course
  const courseCounts: Record<string, number> = {};
  students.forEach((student) => {
    student.courses.forEach((course) => {
      courseCounts[course] = (courseCounts[course] || 0) + 1;
    });
  });

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaUserGraduate /> Student List
      </h1>

      {/* Student counts per course */}
      {Object.keys(courseCounts).length > 0 && (
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(courseCounts).map(([course, count]) => (
            <div
              key={course}
              className="bg-indigo-600 text-white p-4 rounded-lg shadow"
            >
              <p className="font-medium">{course}</p>
              <p className="text-lg font-bold">{count} students</p>
            </div>
          ))}
        </div>
      )}

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Courses</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Loading students...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No students registered
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{student.fullName}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.courses.join(", ")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

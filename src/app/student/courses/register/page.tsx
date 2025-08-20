"use client";

import { useState } from "react";
import { useCourses, Course } from "../../../../context/CoursesContext";
import { useRouter } from "next/navigation";

export default function RegisterCourses() {
  const { addCourse } = useCourses();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const handleRegister = () => {
    if (!code || !name) return alert("Fill in all fields");

    const newCourse: Course = {
      code,
      name,
      attendance: 0,
      history: [],
    };

    addCourse(newCourse);
    alert(`${code} - ${name} registered successfully`);
    setCode("");
    setName("");
    router.push("/student/courses"); // redirect to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Register New Course</h1>
        <input
          type="text"
          placeholder="Course Code (e.g., CSC201)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          Register Course
        </button>
      </div>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LecturerProfile() {
  const { id } = useParams();
  const [lecturer, setLecturer] = useState<any>(null);

  useEffect(() => {
    async function fetchLecturer() {
      const res = await fetch(`/api/lecturer/${id}`);
      const data = await res.json();
      setLecturer(data);
    }
    fetchLecturer();
  }, [id]);

  if (!lecturer) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Lecturer Profile</h1>
        <p><strong>Name:</strong> {lecturer.full_name}</p>
        <p><strong>ID:</strong> {lecturer.identifier}</p>
        <p><strong>Email:</strong> {lecturer.email}</p>
        <p><strong>Role:</strong> Lecturer</p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Classes Taught</h2>
          <p>Subjects, student lists, etc.</p>
        </div>
      </div>
    </div>
  );
}

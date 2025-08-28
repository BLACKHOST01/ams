"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminProfile() {
  const { id } = useParams();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    async function fetchAdmin() {
      const res = await fetch(`/api/admin/${id}`);
      const data = await res.json();
      setAdmin(data);
    }
    fetchAdmin();
  }, [id]);

  if (!admin) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-red-700 mb-4">Admin Profile</h1>
        <p><strong>Name:</strong> {admin.full_name}</p>
        <p><strong>ID:</strong> {admin.identifier}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Role:</strong> Admin</p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Admin Controls</h2>
          <p>System settings, user management, etc.</p>
        </div>
      </div>
    </div>
  );
}

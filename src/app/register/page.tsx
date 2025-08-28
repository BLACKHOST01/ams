"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaUserGraduate,
  FaEnvelope,
  FaLock,
  FaUserShield,
} from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Basic password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName, // ✅ camelCase everywhere
          identifier,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const { user } = data;
        setSuccess("Account created successfully! Redirecting...");

        setTimeout(() => {
          if (user.role === "student") {
            router.push(`/student/[id]/${user.identifier}`);
          } else if (user.role === "lecturer") {
            router.push(`/lecturer/${user.identifier}`);
          } else if (user.role === "admin") {
            router.push(`/admin/${user.identifier}`);
          }
        }, 2000);
      } else {
        setError(data.error || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <FaUserShield className="text-indigo-600 text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Create Your Account
          </h1>
          <p className="text-gray-600 mt-2">Register to access the portal</p>
        </div>

        {/* ✅ Inline feedback messages */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-lg">
            {success}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <FaUserGraduate className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          {/* Identifier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student/Staff ID
            </label>
            <div className="relative">
              <FaUserGraduate className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={loading}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                placeholder="e.g. ST12345"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                placeholder="you@school.edu"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              required
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                disabled={loading}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Register button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>

        {/* Login link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

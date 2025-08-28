// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import jwt from "jsonwebtoken";
// import { query } from "@/lib/db";

// export default async function ProfilePage({ params }: { params: { id: string } }) {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token"); // ✅ we set this at login

//   // 1. Check if logged in
//   if (!token) {
//     redirect("/login");
//   }

//   let decoded: any;
//   try {
//     decoded = jwt.verify(token.value, process.env.JWT_SECRET!);
//   } catch {
//     redirect("/login"); // invalid token
//   }

//   // 2. Prevent users from accessing others' profiles
//   if (decoded.id.toString() !== params.id) {
//     redirect(`/profile/${decoded.id}`); // force them back to their own
//   }

//   // 3. Fetch user from DB
//   const result = await query("SELECT id, full_name, email, role, identifier FROM users WHERE id=$1", [params.id]);
//   const user = result.rows[0];

//   if (!user) {
//     redirect("/login");
//   }

//   // 4. Render user’s profile
//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">
//         Welcome, {user.full_name} 🎉
//       </h1>
//       <ul className="space-y-2 text-gray-700">
//         <li><strong>ID:</strong> {user.id}</li>
//         <li><strong>Identifier:</strong> {user.identifier}</li>
//         <li><strong>Email:</strong> {user.email}</li>
//         <li><strong>Role:</strong> {user.role}</li>
//       </ul>
//     </div>
//   );
// }

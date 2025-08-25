import { Inter } from "next/font/google";
import { CoursesProvider } from "../context/CoursesContext"; // adjust path
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "School Attendance System",
  description: "Manage student attendance efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CoursesProvider>{children}</CoursesProvider>
      </body>
    </html>
  );
}

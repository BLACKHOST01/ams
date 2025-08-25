"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";

export type AttendanceRecord = {
  date: string;
  status: "Present" | "Absent";
  method?: "biometric" | "qrcode";
};

export type Course = {
  code: string;
  name: string;
  attendance: number;
  history: AttendanceRecord[];
};

type CoursesContextType = {
  courses: Course[];
  addCourse: (course: Course) => void; // ✅ Make sure this is here
};

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([
    {
      code: "CSC101",
      name: "programming 101",
      attendance: 92,
      history: [
        { date: "2025-08-01", status: "Present" },
        { date: "2025-08-02", status: "Absent" },
      ],
    },
    {
      code: "MTH102",
      name: "Calculus II",
      attendance: 85,
      history: [
        { date: "2025-08-01", status: "Present" },
        { date: "2025-08-02", status: "Present" },
      ],
    },
    {
      code: "MTH103",
      name: "Calculus II",
      attendance: 85,
      history: [
        { date: "2025-08-01", status: "Present" },
        { date: "2025-08-02", status: "Present" },
      ],
    },
    {
      code: "MTH104",
      name: "Calculus II",
      attendance: 85,
      history: [
        { date: "2025-08-01", status: "Present" },
        { date: "2025-08-02", status: "Present" },
      ],
    },
  ]);

  const addCourse = (course: Course) => {
    setCourses((prev) => [...prev, course]);
    toast.success(`${course.code} - ${course.name} added`);
  };

  return (
    <CoursesContext.Provider value={{ courses, addCourse }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCourses must be used within a CoursesProvider");
  }
  return context;
}

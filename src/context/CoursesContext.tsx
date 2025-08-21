"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type AttendanceStatus = "Present" | "Absent";

export type AttendanceRecord = {
  date: string;
  status: AttendanceStatus;
};

export type Course = {
  code: string;
  name: string;
  attendance: number;
  history: AttendanceRecord[];
};

type CoursesContextType = {
  courses: Course[];
  addCourse: (course: Course) => void;
  markAttendance: (courseCode: string) => void;
};

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([
    {
      code: "CSC101",
      name: "computer programming 101",
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
  };

  const markAttendance = (courseCode: string) => {
    const today = new Date().toISOString().split("T")[0];
    setCourses((prev) =>
      prev.map((c) =>
        c.code === courseCode && !c.history.some((h) => h.date === today)
          ? {
              ...c,
              history: [...c.history, { date: today, status: "Present" }],
              attendance: Math.min(100, c.attendance + 2),
            }
          : c
      )
    );
  };

  return (
    <CoursesContext.Provider value={{ courses, addCourse, markAttendance }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) throw new Error("useCourses must be used within CoursesProvider");
  return context;
};

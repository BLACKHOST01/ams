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
  markAttendance: (courseCode: string, method: "biometric" | "qrcode") => void;
};

const CoursesContext = createContext<CoursesContextType>({
  courses: [],
  markAttendance: () => {},
});

export const useCourses = () => useContext(CoursesContext);

export const CoursesProvider = ({ children }: { children: ReactNode }) => {
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


  const markAttendance = (courseCode: string, method: "biometric" | "qrcode") => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.code === courseCode) {
          const today = new Date().toISOString().split("T")[0];
          if (course.history.some((h) => h.date === today)) {
            toast.error("Attendance already marked today.");
            return course;
          }
          const newHistory: AttendanceRecord = {
            date: today,
            status: "Present",
            method,
          };
          const newAttendance = Math.min(
            100,
            Math.round(((course.history.length + 1) / (course.history.length + 1)) * 100)
          );
          return {
            ...course,
            history: [...course.history, newHistory],
            attendance: newAttendance,
          };
        }
        return course;
      })
    );
  };

  return (
    <CoursesContext.Provider value={{ courses, markAttendance }}>
      {children}
    </CoursesContext.Provider>
  );
};

import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";


export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
      </Routes>
    </MainLayout>
  );
}

import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Introduction from "./pages/Introduction";
import Models from "./pages/Models";
import DataQualityEvaluation from "./pages/DataQualityEvaluation";


export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/models" element={<Models/>}/>
        <Route path="/data-quality" element={<DataQualityEvaluation/>}/>

      </Routes>
    </MainLayout>
  );
}

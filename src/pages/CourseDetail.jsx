import { Row, Col, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

import CourseHeader from "../components/courseDetail/CourseHeader";
import CourseOverviewStats from "../components/courseDetail/CourseOverviewStats";

import StudentProgressChart from "../components/courseDetail/StudentProgressChart";
import CourseTrendChart from "../components/courseDetail/CourseTrendChart";
import CourseEngagementQualityChart from "../components/courseDetail/CourseEngagementQualityChart";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get(`/courses/${courseId}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [courseId]);

  if (loading) return <Spin />;

  if (!course) return <div>Course not found</div>;

  return (
    <>
      {/* ===== DATA THẬT ===== */}
      <CourseHeader course={course} />
      <CourseOverviewStats course={course} />

      {/* ===== CHART (GIỮ MOCK / PYTHON SAU) ===== */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <CourseTrendChart courseId={courseId} />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <StudentProgressChart courseId={courseId} />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <CourseEngagementQualityChart courseId={courseId} />
        </Col>
      </Row>
    </>
  );
}

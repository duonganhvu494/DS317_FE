import { Row, Col, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

import CourseHeader from "../components/courseDetail/CourseHeader";
import CourseStats from "../components/courseDetail/CourseStats";
import CourseMetaStats from "../components/courseDetail/CourseMetaStats";
import StudentProgressChart from "../components/courseDetail/StudentProgressChart";
import RatingDistributionChart from "../components/courseDetail/RatingDistributionChart";
import WeeklyEngagementChart from "../components/courseDetail/WeeklyEngagementChart";
import StudentFeedbackList from "../components/courseDetail/StudentFeedbackList";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get(`/courses/${courseId}`)
      .then(res => {
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
      <CourseStats course={course} />
      <CourseMetaStats course={course} />

      {/* ===== CHART (GIỮ MOCK / PYTHON SAU) ===== */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={14}>
          <StudentProgressChart />
        </Col>
        <Col span={10}>
          <RatingDistributionChart />
        </Col>
      </Row>

      <WeeklyEngagementChart />
      <StudentFeedbackList />
    </>
  );
}

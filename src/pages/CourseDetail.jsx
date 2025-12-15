import { Row, Col } from "antd";

import CourseHeader from "../components/courseDetail/CourseHeader";
import CourseStats from "../components/courseDetail/CourseStats";
import CourseMetaStats from "../components/courseDetail/CourseMetaStats";
import StudentProgressChart from "../components/courseDetail/StudentProgressChart";
import RatingDistributionChart from "../components/courseDetail/RatingDistributionChart";
import WeeklyEngagementChart from "../components/courseDetail/WeeklyEngagementChart";
import StudentFeedbackList from "../components/courseDetail/StudentFeedbackList";

export default function CourseDetail() {
  return (
    <>
      <CourseHeader />
      <CourseStats />
      <CourseMetaStats />

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

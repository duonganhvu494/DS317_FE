import { Row, Col, Card } from "antd";

import DashboardFilters from "../components/dashboard/DashboardFilters";
import DashboardStats from "../components/dashboard/DashboardStats";
import CategoryPerformanceChart from "../components/dashboard/CategoryPerformanceChart";
import InstructorPerformanceChart from "../components/dashboard/InstructorPerformanceChart";

import OverallQualityRadar from "../components/dashboard/OverallQualityRadar";
import EngagementCompletionScatter from "../components/dashboard/EngagementCompletionScatter";
import CourseDetailsTable from "../components/dashboard/CourseDetailsTable";

export default function Dashboard() {
  return (
    <>
      <h1>📊 Dashboard</h1>

      {/* PART 1 */}
      <DashboardFilters />
      <DashboardStats />

      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <CategoryPerformanceChart />
        </Col>
        <Col span={12}>
          <InstructorPerformanceChart />
        </Col>
      </Row>

      {/* PART 2 */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <OverallQualityRadar />
        </Col>
        <Col span={12}>
          <EngagementCompletionScatter />
        </Col>
      </Row>

      <Card
        title="Course Details"
        extra={<span style={{ color: "#888" }}>
          Detailed breakdown of all courses
        </span>}
      >
        <CourseDetailsTable />
      </Card>
    </>
  );
}

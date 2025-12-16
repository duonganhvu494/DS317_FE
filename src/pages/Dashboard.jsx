import { Row, Col, Card, Spin } from "antd";
import { useState } from "react";
import { WarningOutlined } from "@ant-design/icons";

import DashboardFilters from "../components/dashboard/DashboardFilters";
import DashboardStats from "../components/dashboard/DashboardStats";
import CategoryPerformanceChart from "../components/dashboard/CategoryPerformanceChart";
import InstructorPerformanceChart from "../components/dashboard/InstructorPerformanceChart";
import OverallQualityRadar from "../components/dashboard/OverallQualityRadar";
import EngagementCompletionScatter from "../components/dashboard/EngagementCompletionScatter";
import DangerCourseTable from "../components/dashboard/DangerCourseTable";

export default function Dashboard() {
  const [filters, setFilters] = useState({});

  return (
    <>
      <h1>📊 Dashboard</h1>

      <DashboardFilters onChange={setFilters} />

      {/* ===== KPI ===== */}
      <DashboardStats filters={filters} />

      {/* ===== CHART (GIỮ MOCK) ===== */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <CategoryPerformanceChart />
        </Col>
        <Col span={12}>
          <InstructorPerformanceChart />
        </Col>
      </Row>

      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <OverallQualityRadar />
        </Col>
        <Col span={12}>
          <EngagementCompletionScatter />
        </Col>
      </Row>

      {/* ===== DANGER COURSES ===== */}
      <Card
        title={
          <>
            <WarningOutlined style={{ color: "#fa541c" }} /> Danger Courses
          </>
        }
        extra={<span style={{ color: "#888" }}>
          Courses with final rank below 3
        </span>}
      >
        <DangerCourseTable filters={filters} />
      </Card>
    </>
  );
}

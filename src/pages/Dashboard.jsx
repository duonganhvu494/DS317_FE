import { Row, Col, Card } from "antd";
import { useState } from "react";
import { WarningOutlined } from "@ant-design/icons";

import DashboardFilters from "../components/dashboard/DashboardFilters";
import DashboardStats from "../components/dashboard/DashboardStats";
import SystemTrendChart from "../components/dashboard/SystemTrendChart";
import OverallQualityRadar from "../components/dashboard/OverallQualityRadar";
import DangerCourseTable from "../components/dashboard/DangerCourseTable";
import FinalRankDistributionChart from "../components/dashboard/FinalRankDistributionChart";
import SystemStudentProgressChart from "../components/dashboard/SystemStudentProgressChart";
import SystemEngagementQualityChart from "../components/dashboard/SystemEngagementQualityChart";
import "../components/dashboard/dangerCourseTable.css";

export default function Dashboard() {
  const [filters, setFilters] = useState({});

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">📊 Dashboard</h1>

      <DashboardFilters onChange={setFilters} />

      {/* ===== KPI ===== */}
      <DashboardStats filters={filters} />

      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <SystemTrendChart filters={filters} />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <SystemStudentProgressChart filters={filters} />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <SystemEngagementQualityChart filters={filters} />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 24 }} align="stretch">
        <Col span={12}>
          <FinalRankDistributionChart />
        </Col>
        <Col span={12}>
          <OverallQualityRadar />
        </Col>
      </Row>

      {/* ===== DANGER COURSES ===== */}
      <Card
        className="danger-card"
        title={
          <>
            <WarningOutlined style={{ color: "#fa541c" }} /> Danger Courses
          </>
        }
        extra={
          <span style={{ color: "#888" }}>Courses with final rank below 3</span>
        }
      >
        <DangerCourseTable filters={filters} />
      </Card>
    </div>
  );
}

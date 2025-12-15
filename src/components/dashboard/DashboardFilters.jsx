import { Card, Row, Col, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";

export default function DashboardFilters() {
  return (
    <Card style={{ marginBottom: 24 }}>
      <Row gutter={24} align="middle">
        <Col span={24} style={{ marginBottom: 8 }}>
          <FilterOutlined /> <strong>Filters</strong>
        </Col>

        <Col span={8}>
          <label>Category</label>
          <Select
            defaultValue="All Categories"
            style={{ width: "100%" }}
            options={[
              { value: "all", label: "All Categories" },
              { value: "cs", label: "Computer Science" },
              { value: "ds", label: "Data Science" }
            ]}
          />
        </Col>

        <Col span={8}>
          <label>Instructor</label>
          <Select
            defaultValue="All Instructors"
            style={{ width: "100%" }}
            options={[
              { value: "all", label: "All Instructors" }
            ]}
          />
        </Col>

        <Col span={8}>
          <label>Date Range</label>
          <Select
            defaultValue="Last 6 Months"
            style={{ width: "100%" }}
            options={[
              { value: "6m", label: "Last 6 Months" },
              { value: "12m", label: "Last 12 Months" }
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
}

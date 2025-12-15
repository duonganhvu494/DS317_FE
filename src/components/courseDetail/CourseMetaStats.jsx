import { Card, Row, Col } from "antd";
import { ClockCircleOutlined, DollarOutlined } from "@ant-design/icons";

export default function CourseMetaStats() {
  return (
    <Row gutter={24} style={{ marginBottom: 24 }}>
      <Col span={8}>
        <Card>
          <ClockCircleOutlined /> Duration
          <h3>45 hours</h3>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <DollarOutlined /> Revenue Generated
          <h3>$86,400</h3>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <DollarOutlined /> Avg. Revenue per Student
          <h3>$120</h3>
        </Card>
      </Col>
    </Row>
  );
}

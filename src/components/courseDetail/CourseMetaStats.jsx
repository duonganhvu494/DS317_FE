import { Card, Row, Col } from "antd";

export default function CourseMetaStats({ course }) {
  return (
    <Row gutter={24} style={{ marginBottom: 24 }}>
      <Col span={8}>
        <Card>
          <div style={{ color: "#888" }}>Students Enrolled</div>
          <h3>{course.num_students?.enroll ?? 0}</h3>
        </Card>
      </Col>

      <Col span={8}>
        <Card>
          <div style={{ color: "#888" }}>Dropout</div>
          <h3>{course.num_students?.dropout ?? 0}</h3>
        </Card>
      </Col>
    </Row>
  );
}

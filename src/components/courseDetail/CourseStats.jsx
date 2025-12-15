import { Card, Row, Col, Tag } from "antd";
import {
  TeamOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  TrophyOutlined
} from "@ant-design/icons";

const stats = [
  {
    title: "Completion Rate",
    value: "73%",
    icon: <TeamOutlined />,
    tag: <Tag color="gold">Good</Tag>
  },
  {
    title: "Engagement Score",
    value: "86%",
    icon: <RiseOutlined />
  },
  {
    title: "Pass Rate",
    value: "84%",
    icon: <CheckCircleOutlined />
  },
  {
    title: "Satisfaction",
    value: "90%",
    icon: <TrophyOutlined />
  }
];

export default function CourseStats() {
  return (
    <Row gutter={24} style={{ marginBottom: 24 }}>
      {stats.map((s, i) => (
        <Col span={6} key={i}>
          <Card>
            <div style={{ fontSize: 20 }}>{s.icon}</div>
            <div style={{ color: "#888", marginTop: 8 }}>{s.title}</div>
            <div style={{ fontSize: 26, fontWeight: 600 }}>{s.value}</div>
            {s.tag}
          </Card>
        </Col>
      ))}
    </Row>
  );
}

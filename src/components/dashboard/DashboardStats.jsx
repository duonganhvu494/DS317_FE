import { Card, Row, Col } from "antd";
import {
  TeamOutlined,
  StarOutlined,
  RiseOutlined,
  TrophyOutlined
} from "@ant-design/icons";

const stats = [
  {
    title: "Total Students",
    value: "13,090",
    icon: <TeamOutlined />,
    color: "#e6f4ff"
  },
  {
    title: "Average Rating",
    value: "4.6",
    icon: <StarOutlined />,
    color: "#fffbe6"
  },
  {
    title: "Completion Rate",
    value: "73.3%",
    icon: <RiseOutlined />,
    color: "#f6ffed"
  },
  {
    title: "Satisfaction Score",
    value: "86.9%",
    icon: <TrophyOutlined />,
    color: "#f9f0ff"
  }
];

export default function DashboardStats() {
  return (
    <Row gutter={24} style={{ marginBottom: 24 }}>
      {stats.map((s, idx) => (
        <Col span={6} key={idx}>
          <Card style={{ background: s.color }}>
            <Row justify="space-between" align="middle">
              <Col>
                <div style={{ fontSize: 14 }}>{s.title}</div>
                <div style={{ fontSize: 28, fontWeight: 600 }}>
                  {s.value}
                </div>
              </Col>
              <Col style={{ fontSize: 28 }}>{s.icon}</Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

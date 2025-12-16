import { Card, Row, Col, Tag } from "antd";
import {
  TeamOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  TrophyOutlined
} from "@ant-design/icons";

export default function CourseStats({ course }) {
  const stats = [
    {
      title: "Completion Rate",
      value: course.completion_rate,
      icon: <TeamOutlined />,
    },
    {
      title: "Sentiment Index",
      value: course.sentiment_index,
      icon: <RiseOutlined />
    },
    {
      title: "Video Engagement",
      value: course.video_engagement,
      icon: <RiseOutlined />
    },
    {
      title: "Exercise Engagement",
      value: course.exercise_engagement,
      icon: <TrophyOutlined />
    }
  ];

  return (
    <Row gutter={24} style={{ marginBottom: 24 }}>
      {stats.map((s, i) => (
        <Col span={6} key={i}>
          <Card>
            <div style={{ fontSize: 20 }}>{s.icon}</div>
            <div style={{ color: "#888" }}>{s.title}</div>
            <div style={{ fontSize: 26, fontWeight: 600 }}>
              {s.value}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

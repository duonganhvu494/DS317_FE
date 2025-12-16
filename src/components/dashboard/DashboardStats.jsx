import { Row, Col, Card, Spin } from "antd";
import {
  TeamOutlined,
  StarOutlined,
  RiseOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

const formatValue = (value, digits = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "NG";
  }
  return Number(value).toFixed(digits);
};

export default function DashboardStats({ filters }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/courses/stats/overview", { params: filters })
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, [filters]);

  if (loading) return <Spin />;
  if (!stats) return null;

  const avgEngagement =
    stats.avg_video_engagement != null &&
    stats.avg_exercise_engagement != null
      ? (stats.avg_video_engagement + stats.avg_exercise_engagement) / 2
      : null;

  const items = [
    {
      title: "Total Courses",
      value: stats.total_courses ?? "NG",
      icon: <TeamOutlined />,
      color: "#e6f4ff"
    },
    {
      title: "Total Students",
      value: stats.total_students ?? "NG",
      icon: <TeamOutlined />,
      color: "#e6f4ff"
    },
    {
      title: "Avg Completion",
      value: formatValue(stats.avg_completion),
      icon: <RiseOutlined />,
      color: "#f6ffed"
    },
    {
      title: "Avg Sentiment",
      value: formatValue(stats.avg_sentiment),
      icon: <StarOutlined />,
      color: "#fffbe6"
    },
    {
      title: "Avg Engagement",
      value: formatValue(avgEngagement),
      icon: <TrophyOutlined />,
      color: "#f9f0ff"
    }
  ];

  return (
    <Row gutter={24} style={{ marginBottom: 24 }}>
      {items.map((s, idx) => (
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

import { Row, Col, Card, Spin } from "antd";
import {
  TeamOutlined,
  StarOutlined,
  RiseOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import "../../pages/Dashboard.css";

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
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, [filters]);

  if (loading) return <Spin />;
  if (!stats) return null;

  const avgEngagement =
    stats.avg_video_engagement != null && stats.avg_exercise_engagement != null
      ? (stats.avg_video_engagement + stats.avg_exercise_engagement) / 2
      : null;

  const items = [
    {
      title: "Total Courses",
      value: stats.total_courses ?? "NG",
      icon: <TeamOutlined />,
      theme: "blue",
    },
    {
      title: "Total Students",
      value: stats.total_students ?? "NG",
      icon: <TeamOutlined />,
      theme: "purple",
    },
    {
      title: "Completion Rating",
      value: formatValue(stats.avg_completion),
      icon: <RiseOutlined />,
      theme: "green",
    },
    {
      title: "Sentiment Rating",
      value: formatValue(stats.avg_sentiment),
      icon: <StarOutlined />,
      theme: "orange",
    },
    {
      title: "Engagement Rating",
      value: formatValue(avgEngagement),
      icon: <TrophyOutlined />,
      theme: "cyan",
    },
  ];

  return (
    <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
      {items.map((s, idx) => {
        const span = idx < 3 ? 8 : 12;

        return (
          <Col span={span} key={idx}>
            <Card className={`dashboard-stat-card theme-${s.theme}`}>
              <Row justify="space-between" align="middle">
                <Col>
                  <div className="stat-title">{s.title}</div>
                  <div className="stat-value">{s.value}</div>
                </Col>
                <Col className="stat-icon">{s.icon}</Col>
              </Row>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

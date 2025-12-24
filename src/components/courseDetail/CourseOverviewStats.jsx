import { Row, Col, Card } from "antd";
import {
  TeamOutlined,
  RiseOutlined,
  TrophyOutlined,
  UsergroupAddOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import "./CourseOverviewStats.css";

export default function CourseOverviewStats({ course }) {
  const mainStats = [
    {
      key: "completion",
      title: "Completion Rate",
      value: course.completion_rate,
      icon: <TeamOutlined />,
      theme: "blue"
    },
    {
      key: "sentiment",
      title: "Sentiment Index",
      value: course.sentiment_index,
      icon: <RiseOutlined />,
      theme: "orange"
    },
    {
      key: "video",
      title: "Video Engagement",
      value: course.video_engagement,
      icon: <RiseOutlined />,
      theme: "cyan"
    },
    {
      key: "exercise",
      title: "Exercise Engagement",
      value: course.exercise_engagement,
      icon: <TrophyOutlined />,
      theme: "green"
    }
  ];

  const metaStats = [
    {
      key: "enroll",
      title: "Students Enrolled",
      value: course.num_students?.enroll ?? 0,
      icon: <UsergroupAddOutlined />,
      theme: "purple"
    },
    {
      key: "dropout",
      title: "Dropout",
      value: course.num_students?.dropout ?? 0,
      icon: <LogoutOutlined />,
      theme: "red"
    }
  ];

  return (
    <div className="course-overview">
      {/* ===== MAIN STATS ===== */}
      <Row gutter={24} className="course-overview-row">
        {mainStats.map(s => (
          <Col span={6} key={s.key}>
            <Card className={`overview-card theme-${s.theme}`}>
              <div className="overview-icon">
                {s.icon}
              </div>

              <div className="overview-title">
                {s.title}
              </div>

              <div className="overview-value">
                {s.value}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ===== META STATS ===== */}
      <Row gutter={24}>
        {metaStats.map(s => (
          <Col span={12} key={s.key}>
            <Card className={`overview-card meta theme-${s.theme}`}>
              <div className="overview-icon">
                {s.icon}
              </div>

              <div className="overview-title">
                {s.title}
              </div>

              <div className="overview-value">
                {s.value}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

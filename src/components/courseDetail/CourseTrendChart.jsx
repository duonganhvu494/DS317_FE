import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./courseCharts.css";

export default function CourseTrendChart({ courseId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    axiosClient
      .get(`/course/${courseId}/trend`)
      .then((res) => setData(res.data || []))
      .finally(() => setLoading(false));
  }, [courseId]);

  return (
    <Card
      className="course-chart trend-chart"
      title="📈 Course Learning Trend"
      extra={
        <span style={{ fontSize: 12, color: "#888" }}>
          Completion, engagement & assignment score by week
        </span>
      }
      style={{ height: 500 }}
    >
      {loading ? (
        <Spin />
      ) : data.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: 80, color: "#999" }}>
          No data available
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="week" tickFormatter={(w) => `W${w}`} />
              <YAxis
                domain={[0, 1]}
                tickFormatter={(v) => `${Math.round(v * 100)}%`}
              />
              <Tooltip formatter={(v) => `${Math.round(v * 100)}%`} />
              <Legend />

              <Line
                type="monotone"
                dataKey="avg_completion_rate"
                name="Completion Rate"
                stroke="#52c41a"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="avg_engagement"
                name="Engagement"
                stroke="#1677ff"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="avg_assignment_score"
                name="Assignment Score"
                stroke="#faad14"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="course-chart-note">
            <strong>How to read:</strong> Trends of engagement, completion and
            score over time.
          </div>
        </>
      )}
    </Card>
  );
}

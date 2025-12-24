import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./courseCharts.css";

export default function CourseEngagementQualityChart({
  courseId
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    axiosClient
      .get(`/course/${courseId}/engagement-quality`)
      .then((res) => setData(res.data || []))
      .finally(() => setLoading(false));
  }, [courseId]);

  return (
    <Card
      className="course-chart engagement-chart"
      title="💬 Engagement & Learning Quality"
      extra={
        <span style={{ fontSize: 12, color: "#888" }}>
          Submissions, discussions & quality signals by week
        </span>
      }
      style={{ height:600 }}
    >
      {loading ? (
        <Spin />
      ) : (
        <>
          <ResponsiveContainer width="100%" height={480}>
            <ComposedChart data={data}>
              <XAxis dataKey="week" />
              <YAxis yAxisId="count" />
              <YAxis
                yAxisId="rate"
                orientation="right"
                domain={[0, 1]}
                tickFormatter={(v) => `${Math.round(v * 100)}%`}
              />
              <Tooltip />
              <Legend />

              <Bar
                yAxisId="count"
                dataKey="weekly_submit_count"
                name="Submissions"
                fill="#1677ff"
              />
              <Bar
                yAxisId="count"
                dataKey="comments_count"
                name="Comments"
                fill="#faad14"
              />

              <Line
                yAxisId="rate"
                dataKey="avg_sentiment"
                name="Avg Sentiment"
                stroke="#13c2c2"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="rate"
                dataKey="avg_assignment_score"
                name="Avg Assignment Score"
                stroke="#52c41a"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="course-chart-note">
            <strong>How to read:</strong> Activity vs learning quality.
          </div>
        </>
      )}
    </Card>
  );
}

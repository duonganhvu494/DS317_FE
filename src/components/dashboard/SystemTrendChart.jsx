import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./SystemTrendChart.css";

export default function SystemTrendChart({ filters }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasFilter = filters.field || filters.school;
    const url = hasFilter
      ? "/analytics/system/trend/filter"
      : "/analytics/system/trend";

    axiosClient
      .get(url, { params: filters })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <Card title="📈 System Trend (Weekly)" className="system-trend-card">
      {loading ? (
        <Spin />
      ) : (
        <ResponsiveContainer width="100%" height={360}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="avg_completion_rate"
              name="Completion Rate"
              stroke="#1677ff"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="avg_engagement"
              name="Engagement"
              stroke="#52c41a"
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
      )}
    </Card>
  );
}

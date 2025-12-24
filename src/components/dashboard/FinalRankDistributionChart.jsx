import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import "./dashboardQualityCharts.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// màu theo mức chất lượng
const COLORS = {
  1: "#ff4d4f", // rất thấp
  2: "#ff7a45",
  3: "#faad14",
  4: "#73d13d",
  5: "#52c41a", // rất tốt
};

export default function FinalRankDistributionChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/analytics/system/final-rank-distribution")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card
      title="🏆 Course Quality Distribution"
      className="quality-chart-card"
      extra={
        <span>
          Distribution by final rank (1–5)
        </span>
      }
      style={{ height: 480 }}
    >
      {loading ? (
        <Spin />
      ) : (
        <>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data}>
              <XAxis dataKey="rank" tickFormatter={(v) => `Rank ${v}`} />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} courses`, "Count"]}
                labelFormatter={(label) => `Final Rank ${label}`}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {data.map((d) => (
                  <Cell key={d.rank} fill={COLORS[d.rank]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* NOTE */}
          <div className="chart-note">
            • Final rank ranges from 1 (lowest quality) to 5 (highest quality){" "}
            <br />• Each bar represents the number of courses at each quality
            level
          </div>
        </>
      )}
    </Card>
  );
}

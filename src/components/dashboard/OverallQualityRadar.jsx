import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import "./dashboardQualityCharts.css";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function OverallQualityRadar() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/analytics/system/overall-quality")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card
      title="📊 Overall Course Quality (System Level)"
      className="quality-chart-card"
      extra={<span>Aggregated across all courses</span>}
      style={{ height: 480 }}
    >
      {loading ? (
        <Spin />
      ) : (
        <>
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={data}>
              <PolarGrid />

              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />

              <PolarRadiusAxis
                domain={[0, 100]}
                tickCount={6}
                angle={30}
                tick={{ fontSize: 11 }}
              />

              <Tooltip formatter={(value) => [`${value} / 100`, "Score"]} />

              <Legend />

              <Radar
                name="Overall Quality Score"
                dataKey="value"
                stroke="#1677ff"
                fill="#1677ff"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>

          {/* ===== NOTE ===== */}
          <div className="chart-note">
            • Metrics are normalized from a <b>1–5 scale</b> to <b>0–100</b>
          </div>
        </>
      )}
    </Card>
  );
}

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
import "./systemEngagementQualityChart.css";

// format số lớn cho dễ đọc
const formatNumber = (v) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return v;
};

export default function SystemEngagementQualityChart({ filters = {} }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasFilter =
      filters?.field || filters?.school || filters?.fromWeek || filters?.toWeek;

    const url = hasFilter
      ? "/analytics/system/engagement-quality/filter"
      : "/analytics/system/engagement-quality";

    axiosClient
      .get(url, { params: filters })
      .then((res) => setData(res.data || []))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <Card
      title="📊 Engagement & Learning Quality"
      className="system-engagement-card"
      extra={
        <span style={{ fontSize: 12, color: "#888" }}>
          {filters?.field || filters?.school
            ? "Filtered by selected criteria"
            : "Sentiment, submissions, comments & scores by week"}
        </span>
      }
      style={{ height: 540 }}
    >
      {loading ? (
        <Spin />
      ) : data.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: 80, color: "#999" }}>
          No data available
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 60, left: 40, bottom: 50 }}
            >
              {/* ===== X AXIS ===== */}
              <XAxis
                dataKey="week"
                interval="preserveStartEnd"
                angle={-30}
                textAnchor="end"
                height={60}
              />

              {/* ===== LEFT Y – COUNT ===== */}
              <YAxis
                yAxisId="count"
                tickFormatter={formatNumber}
                label={{
                  value: "Activity Volume",
                  angle: -90,
                  position: "insideLeft",
                }}
              />

              {/* ===== RIGHT Y – RATE ===== */}
              <YAxis
                yAxisId="rate"
                orientation="right"
                domain={[0, 1]}
                tickFormatter={(v) => v.toFixed(2)}
                label={{
                  value: "Score / Sentiment",
                  angle: 90,
                  position: "insideRight",
                }}
              />

              <Tooltip
                formatter={(value, name) =>
                  typeof value === "number"
                    ? [formatNumber(value), name]
                    : value
                }
              />

              <Legend verticalAlign="top" height={36} />

              {/* ===== BARS ===== */}
              <Bar
                yAxisId="count"
                dataKey="weekly_submit_count"
                name="Weekly Submissions"
                fill="#1677ff"
                barSize={14}
              />

              <Bar
                yAxisId="count"
                dataKey="comments_count"
                name="Comments"
                fill="#faad14"
                barSize={14}
              />

              {/* ===== LINES ===== */}
              <Line
                yAxisId="rate"
                type="monotone"
                dataKey="avg_sentiment"
                name="Avg Sentiment"
                stroke="#13c2c2"
                strokeWidth={2}
                dot={false}
              />

              <Line
                yAxisId="rate"
                type="monotone"
                dataKey="avg_assignment_score"
                name="Avg Assignment Score"
                stroke="#52c41a"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>

          {/* NOTE */}
          <div className="chart-note">
            <strong>How to read:</strong> Bars show learner activity scale
            (submissions & comments). Lines represent learning quality and
            sentiment. Sudden divergence may indicate content or engagement
            issues.
          </div>
        </>
      )}
    </Card>
  );
}

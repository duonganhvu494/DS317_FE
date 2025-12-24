import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./systemStudentProgressChart.css";

/* ======================
   FORMAT HELPERS
====================== */
const formatNumber = (value) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value;
};

const formatTooltip = (value) => value?.toLocaleString("en-US");

export default function SystemStudentProgressChart({ filters = {} }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasFilter =
      filters?.field || filters?.school || filters?.fromWeek || filters?.toWeek;

    const url = hasFilter
      ? "/analytics/system/student-progress/filter"
      : "/analytics/system/student-progress";

    axiosClient
      .get(url, { params: filters })
      .then((res) => setData(res.data || []))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <Card
      title="👥 Platform Student Flow & Progress"
      className="system-student-card"
      extra={
        <span style={{ color: "#888", fontSize: 12 }}>
          {filters?.field || filters?.school
            ? "Filtered by selected criteria"
            : "Aggregated across all courses"}
        </span>
      }
      style={{ height: 620 }}
    >
      {loading ? (
        <Spin />
      ) : data.length === 0 ? (
        <div style={{ textAlign: "center", color: "#999", marginTop: 80 }}>
          No data available for selected filters
        </div>
      ) : (
        <>
          {/* ===== CHART 1: NEW vs DROPOUT ===== */}
          <div className="chart-block">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />

                <YAxis tickFormatter={formatNumber} width={60} />

                <Tooltip formatter={formatTooltip} />

                <Legend />

                <Bar dataKey="new_enrolls" name="New Enrolls" fill="#1677ff" />
                <Bar dataKey="dropout_count" name="Dropouts" fill="#ff4d4f" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ===== CHART 2: ACTIVE vs COMPLETED ===== */}
          <div className="chart-block">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={data}>
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />

                <YAxis tickFormatter={formatNumber} width={70} />

                <Tooltip formatter={formatTooltip} />

                <Legend />

                <Area
                  type="monotone"
                  dataKey="active_students"
                  name="Active Students"
                  stroke="#1677ff"
                  fill="#1677ff"
                  fillOpacity={0.25}
                />

                <Area
                  type="monotone"
                  dataKey="completed_students"
                  name="Completed Students"
                  stroke="#52c41a"
                  fill="#52c41a"
                  fillOpacity={0.35}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* ===== NOTE ===== */}
          <div className="chart-note">
            <strong>Interpretation:</strong> Bars represent weekly student
            inflow and dropout. Area chart shows cumulative active learners and
            estimated completions for the selected scope.
          </div>
        </>
      )}
    </Card>
  );
}

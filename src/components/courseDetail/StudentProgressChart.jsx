import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./courseCharts.css";

export default function StudentProgressChart({ courseId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    axiosClient
      .get(`/course/${courseId}/detail/progress`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [courseId]);

  return (
    <Card
      className="course-chart progress-chart"
      title="👥 Student Enrollment & Progress"
      extra={
        <span style={{ color: "#888", fontSize: 12 }}>
          Weekly student inflow, dropout & learning progress
        </span>
      }
      style={{ height: 600 }}
    >
      {loading ? (
        <Spin />
      ) : (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="new_enrolls" name="New Enrolls" fill="#1677ff" />
              <Bar dataKey="dropout_count" name="Dropouts" fill="#ff4d4f" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
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

          <div className="course-chart-note">
            <strong>Note:</strong> Student flow and progress estimation.
          </div>
        </>
      )}
    </Card>
  );
}

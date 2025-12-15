import { Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const data = [
  { week: "W1", overall: 90, assignment: 85, discussion: 75 },
  { week: "W2", overall: 88, assignment: 83, discussion: 78 },
  { week: "W3", overall: 85, assignment: 80, discussion: 76 },
  { week: "W4", overall: 83, assignment: 78, discussion: 74 },
  { week: "W5", overall: 80, assignment: 75, discussion: 72 },
  { week: "W6", overall: 82, assignment: 77, discussion: 74 }
];

export default function WeeklyEngagementChart() {
  return (
    <Card title="Weekly Engagement Metrics">
      <LineChart width={800} height={300} data={data}>
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="overall" stroke="#722ed1" />
        <Line dataKey="assignment" stroke="#1677ff" />
        <Line dataKey="discussion" stroke="#20c997" />
      </LineChart>
    </Card>
  );
}

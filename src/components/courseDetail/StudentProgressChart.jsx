import { Card } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const data = [
  { week: "W1", enrolled: 150, completed: 120 },
  { week: "W2", enrolled: 180, completed: 150 },
  { week: "W3", enrolled: 220, completed: 170 },
  { week: "W4", enrolled: 200, completed: 160 },
  { week: "W5", enrolled: 260, completed: 190 }
];

export default function StudentProgressChart() {
  return (
    <Card title="Student Progress Trends">
      <AreaChart width={500} height={300} data={data}>
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area dataKey="enrolled" fill="#1677ff" stroke="#1677ff" />
        <Area dataKey="completed" fill="#52c41a" stroke="#52c41a" />
      </AreaChart>
    </Card>
  );
}

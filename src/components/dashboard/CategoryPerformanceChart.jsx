import { Card } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const data = [
  { name: "Computer Science", rating: 4.5, completion: 78 },
  { name: "Data Science", rating: 4.4, completion: 72 },
  { name: "Web Development", rating: 4.3, completion: 69 },
  { name: "Design", rating: 4.6, completion: 81 },
  { name: "Marketing", rating: 4.4, completion: 73 }
];

export default function CategoryPerformanceChart() {
  return (
    <Card title="Performance by Category">
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rating" fill="#1677ff" name="Avg Rating" />
        <Bar dataKey="completion" fill="#52c41a" name="Avg Completion %" />
      </BarChart>
    </Card>
  );
}

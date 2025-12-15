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
  { name: "Michael", satisfaction: 90, engagement: 85 },
  { name: "David", satisfaction: 88, engagement: 82 },
  { name: "Lisa", satisfaction: 92, engagement: 87 },
  { name: "James", satisfaction: 85, engagement: 78 }
];

export default function InstructorPerformanceChart() {
  return (
    <Card title="Instructor Performance">
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="satisfaction"
          stroke="#722ed1"
          name="Satisfaction %"
        />
        <Line
          type="monotone"
          dataKey="engagement"
          stroke="#faad14"
          name="Engagement %"
        />
      </LineChart>
    </Card>
  );
}

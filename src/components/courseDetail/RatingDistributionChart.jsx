import { Card } from "antd";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "5 Star", value: 54 },
  { name: "4 Star", value: 33 },
  { name: "3 Star", value: 8 },
  { name: "2 Star", value: 3 },
  { name: "1 Star", value: 2 }
];

const COLORS = ["#52c41a", "#1677ff", "#faad14", "#ff7875", "#d9d9d9"];

export default function RatingDistributionChart() {
  return (
    <Card title="Rating Distribution">
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" label>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Card>
  );
}

import { Card } from "antd";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const data = [
  { completion: 82, engagement: 78 },
  { completion: 88, engagement: 72 },
  { completion: 79, engagement: 68 },
  { completion: 91, engagement: 65 },
  { completion: 85, engagement: 82 },
  { completion: 77, engagement: 75 },
  { completion: 75, engagement: 70 },
  { completion: 86, engagement: 73 }
];

export default function EngagementCompletionScatter() {
  return (
    <Card title="Engagement vs Completion Rate">
      <ScatterChart width={450} height={300}>
        <XAxis
          type="number"
          dataKey="completion"
          name="Completion"
          unit="%"
          domain={[60, 100]}
        />
        <YAxis
          type="number"
          dataKey="engagement"
          name="Engagement"
          unit="%"
          domain={[60, 100]}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={data} fill="#20c997" />
      </ScatterChart>
    </Card>
  );
}

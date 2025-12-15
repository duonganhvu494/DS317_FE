import { Card } from "antd";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

const data = [
  { metric: "Rating", value: 90 },
  { metric: "Completion", value: 75 },
  { metric: "Satisfaction", value: 88 },
  { metric: "Engagement", value: 80 },
  { metric: "Pass Rate", value: 70 }
];

export default function OverallQualityRadar() {
  return (
    <Card title="Overall Quality Metrics">
      <RadarChart
        cx={200}
        cy={150}
        outerRadius={110}
        width={400}
        height={300}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          dataKey="value"
          stroke="#1677ff"
          fill="#1677ff"
          fillOpacity={0.4}
        />
      </RadarChart>
    </Card>
  );
}

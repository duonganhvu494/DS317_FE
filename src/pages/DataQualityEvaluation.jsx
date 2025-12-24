import { Card, Row, Col, Statistic, Table, Divider, Tag } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import "./DataQualityEvaluation.css";

/* =======================
   DATA
======================= */

const BAR_COLORS = {
  completeness: "#52c41a", // green
  consistency: "#1677ff", // blue
};

const COMPLETENESS = { train: 1.0, test: 1.0 };
const CONSISTENCY = { train: 0.9987, test: 0.999 };

const CONSISTENCY_DETAILS = [
  {
    key: "dropout_le_cum_enrolls",
    description: "Dropout count ≤ cumulative enrolls",
    train_valid: 0.984198,
    train_violations: 156750,
    test_valid: 0.987454,
    test_violations: 22738,
  },
  {
    key: "sentiment_sum_equals_comments",
    description: "pos + neg + neu = comments_count",
    train_valid: 1.0,
    train_violations: 0,
    test_valid: 1.0,
    test_violations: 0,
  },
  {
    key: "sentiment_in_range",
    description: "avg_sentiment ∈ [-1, 1]",
    train_valid: 1.0,
    train_violations: 0,
    test_valid: 1.0,
    test_violations: 0,
  },
];

export default function DataQualityEvaluation() {
  const overviewChart = [
    { name: "Completeness (Train)", value: COMPLETENESS.train },
    { name: "Completeness (Test)", value: COMPLETENESS.test },
    { name: "Consistency (Train)", value: CONSISTENCY.train },
    { name: "Consistency (Test)", value: CONSISTENCY.test },
  ];

  return (
    <div className="dq-page">
      <h1 className="page-title">🧪 Data Quality Evaluation</h1>

      {/* KPI */}
      <Row gutter={24} className="dq-kpi-row">
        <Col span={6}>
          <Card className="dq-kpi-card theme-green">
            <Statistic
              title="Completeness (Train)"
              value={COMPLETENESS.train}
              precision={4}
              suffix={<Tag color="green">Perfect</Tag>}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card className="dq-kpi-card theme-green">
            <Statistic
              title="Completeness (Test)"
              value={COMPLETENESS.test}
              precision={4}
              suffix={<Tag color="green">Perfect</Tag>}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card className="dq-kpi-card theme-blue">
            <Statistic
              title="Consistency (Train)"
              value={CONSISTENCY.train}
              precision={4}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card className="dq-kpi-card theme-blue">
            <Statistic
              title="Consistency (Test)"
              value={CONSISTENCY.test}
              precision={4}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Chart */}
      <Card className="dq-card" title="Overall Data Quality Metrics">
        <div style={{ height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={overviewChart}>
              <XAxis dataKey="name" />
              <YAxis domain={[0.95, 1]} />
              <Tooltip />
              <Bar dataKey="value">
                {overviewChart.map((entry, index) => {
                  const isCompleteness = entry.name.includes("Completeness");

                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        isCompleteness
                          ? "#52c41a" // green
                          : "#1677ff" // blue
                      }
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Divider />

      {/* Table */}
      <Card className="dq-card" title="Consistency Rule Evaluation Details">
        <Table
          pagination={false}
          dataSource={CONSISTENCY_DETAILS}
          columns={[
            { title: "Rule", dataIndex: "description" },
            {
              title: "Train Valid Ratio",
              dataIndex: "train_valid",
              render: (v) => v.toFixed(4),
            },
            { title: "Train Violations", dataIndex: "train_violations" },
            {
              title: "Test Valid Ratio",
              dataIndex: "test_valid",
              render: (v) => v.toFixed(4),
            },
            { title: "Test Violations", dataIndex: "test_violations" },
          ]}
        />
      </Card>

      <Divider />

      {/* Interpretation */}
      <Card className="dq-card" title="Interpretation">
        <p>
          The dataset achieves <b>perfect completeness</b> across training and
          testing sets.
        </p>
        <p>
          Consistency scores remain extremely high, confirming logical and
          semantic validity.
        </p>
        <p>
          Minor violations appear in <b>dropout ≤ cumulative enrolls</b>, but
          their impact is negligible.
        </p>
        <p>
          Overall, the dataset is <b>high quality</b> and suitable for modeling.
        </p>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Card, Row, Col, Select, Statistic, Table, Divider } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

/* =======================
   DATA (from CSV → JSON)
   ======================= */

const DATASETS = {
  TRAIN_META_OOF_STACK: {
    name: "Train Meta (OOF)",
    accuracy: 0.573360,
    precision_macro: 0.626499,
    recall_macro: 0.479901,
    f1_macro: 0.491653,
    precision_weighted: 0.694183,
    recall_weighted: 0.573360,
    f1_weighted: 0.587955
  },
  TEST_STACK: {
    name: "Test Stack",
    accuracy: 0.551931,
    precision_macro: 0.606760,
    recall_macro: 0.462515,
    f1_macro: 0.469958,
    precision_weighted: 0.690019,
    recall_weighted: 0.551931,
    f1_weighted: 0.567619
  }
};

/* =======================
   PAGE
   ======================= */

export default function EnsembleStackingEvaluation() {
  const [datasetKey, setDatasetKey] = useState("TEST_STACK");
  const data = DATASETS[datasetKey];

  const tableData = [
    { key: 1, metric: "Accuracy", value: data.accuracy },
    { key: 2, metric: "Precision (Macro)", value: data.precision_macro },
    { key: 3, metric: "Recall (Macro)", value: data.recall_macro },
    { key: 4, metric: "F1-score (Macro)", value: data.f1_macro },
    { key: 5, metric: "Precision (Weighted)", value: data.precision_weighted },
    { key: 6, metric: "Recall (Weighted)", value: data.recall_weighted },
    { key: 7, metric: "F1-score (Weighted)", value: data.f1_weighted }
  ];

  const chartData = Object.values(DATASETS).map(d => ({
    dataset: d.name,
    f1_weighted: d.f1_weighted
  }));

  return (
    <div style={{ padding: 24 }}>
      <h2>Ensemble Stacking Model Evaluation</h2>

      <Select
        value={datasetKey}
        onChange={setDatasetKey}
        style={{ width: 320, marginBottom: 24 }}
        options={[
          { value: "TRAIN_META_OOF_STACK", label: "Train Meta (OOF)" },
          { value: "TEST_STACK", label: "Test Stack" }
        ]}
      />

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Accuracy" value={data.accuracy} precision={3} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="F1 (Macro)" value={data.f1_macro} precision={3} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="F1 (Weighted)"
              value={data.f1_weighted}
              precision={3}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      <Table
        pagination={false}
        dataSource={tableData}
        columns={[
          { title: "Metric", dataIndex: "metric" },
          {
            title: "Value",
            dataIndex: "value",
            render: v => v.toFixed(4)
          }
        ]}
      />

      <Divider />

      <Card title="Ensemble Stacking Comparison (F1-score Weighted)">
        <div style={{ height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="dataset" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Bar dataKey="f1_weighted" fill="#1677ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

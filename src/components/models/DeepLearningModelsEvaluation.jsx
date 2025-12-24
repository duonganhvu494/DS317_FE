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

const MODELS = {
  TCN: {
    model: "TCN",
    accuracy: 0.7611,
    precision_macro: 0.6117,
    recall_macro: 0.5827,
    f1_macro: 0.5844,
    precision_weighted: 0.7219,
    recall_weighted: 0.7611,
    f1_weighted: 0.7315
  },
  BiLSTM: {
    model: "BiLSTM",
    accuracy: 0.6365,
    precision_macro: 0.5618,
    recall_macro: 0.5565,
    f1_macro: 0.5473,
    precision_weighted: 0.6710,
    recall_weighted: 0.6365,
    f1_weighted: 0.6491
  },
  GRU: {
    model: "GRU",
    accuracy: 0.7584,
    precision_macro: 0.6727,
    recall_macro: 0.6375,
    f1_macro: 0.6503,
    precision_weighted: 0.7458,
    recall_weighted: 0.7584,
    f1_weighted: 0.7491
  }
};

/* =======================
   PAGE
   ======================= */

export default function DeepLearningModelsEvaluation() {
  const [modelKey, setModelKey] = useState("GRU");
  const model = MODELS[modelKey];

  const tableData = [
    { key: 1, metric: "Accuracy", value: model.accuracy },
    { key: 2, metric: "Precision (Macro)", value: model.precision_macro },
    { key: 3, metric: "Recall (Macro)", value: model.recall_macro },
    { key: 4, metric: "F1-score (Macro)", value: model.f1_macro },
    { key: 5, metric: "Precision (Weighted)", value: model.precision_weighted },
    { key: 6, metric: "Recall (Weighted)", value: model.recall_weighted },
    { key: 7, metric: "F1-score (Weighted)", value: model.f1_weighted }
  ];

  const chartData = Object.values(MODELS).map(m => ({
    model: m.model,
    f1_weighted: m.f1_weighted
  }));

  return (
    <div style={{ padding: 24 }}>
      <h2>Deep Learning Models Evaluation</h2>

      <Select
        value={modelKey}
        onChange={setModelKey}
        style={{ width: 300, marginBottom: 24 }}
        options={[
          { value: "TCN", label: "TCN" },
          { value: "BiLSTM", label: "BiLSTM" },
          { value: "GRU", label: "GRU" }
        ]}
      />

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Accuracy" value={model.accuracy} precision={3} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="F1 (Macro)" value={model.f1_macro} precision={3} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="F1 (Weighted)"
              value={model.f1_weighted}
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

      <Card title="Deep Learning Model Comparison (F1-score Weighted)">
        <div style={{ height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="model" />
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

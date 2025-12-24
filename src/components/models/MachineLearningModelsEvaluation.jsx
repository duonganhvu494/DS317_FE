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
  gradient_boosting: {
    model: "Gradient Boosting",
    accuracy: 0.7583614,
    precision_macro: 0.6726999,
    recall_macro: 0.6374652,
    f1_macro: 0.6502747,
    precision_weighted: 0.7457640,
    recall_weighted: 0.7583614,
    f1_weighted: 0.7491102
  },
  random_forest: {
    model: "Random Forest",
    accuracy: 0.7870129,
    precision_macro: 0.6932154,
    recall_macro: 0.6558712,
    f1_macro: 0.6690158,
    precision_weighted: 0.7721843,
    recall_weighted: 0.7870129,
    f1_weighted: 0.7729986
  },
  xgboost: {
    model: "XGBoost",
    accuracy: 0.7610243,
    precision_macro: 0.6711125,
    recall_macro: 0.6369048,
    f1_macro: 0.6498721,
    precision_weighted: 0.7508319,
    recall_weighted: 0.7610243,
    f1_weighted: 0.7532841
  }
};

/* =======================
   PAGE
   ======================= */

export default function MachineLearningModelsEvaluation() {
  const [modelKey, setModelKey] = useState("random_forest");
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
      <h2>Machine Learning Models Evaluation</h2>

      <Select
        value={modelKey}
        onChange={setModelKey}
        style={{ width: 300, marginBottom: 24 }}
        options={[
          { value: "gradient_boosting", label: "Gradient Boosting" },
          { value: "random_forest", label: "Random Forest" },
          { value: "xgboost", label: "XGBoost" }
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

      <Card title="Model Comparison (F1-score Weighted)">
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

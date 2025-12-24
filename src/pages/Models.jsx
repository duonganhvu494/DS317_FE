import { Tabs } from "antd";
import MachineLearningModels from "../components/models/MachineLearningModelsEvaluation";
import DeepLearningModels from "../components/models/DeepLearningModelsEvaluation";
import EnsembleStackingModel from "../components/models/EnsembleStackingEvaluation";
import "./Models.css";

export default function Models() {
  return (
    <div className="models-page">
      <h1 className="page-title">🧠 Model Evaluation</h1>

      <Tabs
        defaultActiveKey="ml"
        className="models-tabs"
        items={[
          {
            key: "ml",
            label: "Machine Learning",
            children: <MachineLearningModels />
          },
          {
            key: "dl",
            label: "Deep Learning",
            children: <DeepLearningModels />
          },
          {
            key: "ensemble",
            label: "Ensemble Stacking",
            children: <EnsembleStackingModel />
          }
        ]}
      />
    </div>
  );
}

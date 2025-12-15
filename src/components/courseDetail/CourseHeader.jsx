import { ArrowLeftOutlined, StarFilled } from "@ant-design/icons";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";

export default function CourseHeader() {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{ cursor: "pointer", color: "#1677ff", marginBottom: 8 }}
        onClick={() => navigate(-1)}
      >
        <ArrowLeftOutlined /> Back to Dashboard
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ marginBottom: 4 }}>
            Cloud Computing Essentials <Tag>Computer Science</Tag>
          </h2>
          <div style={{ color: "#888" }}>
            Taught by Michael Chen · Course ID: CS301
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 24, fontWeight: 600 }}>
            <StarFilled style={{ color: "#fadb14" }} /> 4.8
          </div>
          <div style={{ color: "#888" }}>720 students</div>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";

export default function CourseHeader({ course }) {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{ cursor: "pointer", color: "#1677ff", marginBottom: 8 }}
        onClick={() => navigate(-1)}
      >
        <ArrowLeftOutlined /> Back
      </div>

      <h2 style={{ marginBottom: 4 }}>{course.name_en}</h2>

      <div style={{ color: "#888" }}>
        {course.school?.join(", ")} ·{" "}
        {course.teacher?.join(", ")}
      </div>

      <div style={{ marginTop: 8 }}>
        {course.field_en?.length > 0
          ? course.field_en.map(f => <Tag key={f}>{f}</Tag>)
          : <Tag color="default">Not given</Tag>}
      </div>
    </div>
  );
}

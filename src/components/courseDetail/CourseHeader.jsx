import { ArrowLeftOutlined } from "@ant-design/icons";
import { Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import "./CourseHeader.css";

export default function CourseHeader({ course }) {
  const navigate = useNavigate();

  return (
    <div className="course-header">
      {/* ===== BACK ===== */}
      <div className="course-back" onClick={() => navigate(-1)}>
        <ArrowLeftOutlined /> Back
      </div>

      {/* ===== TITLE ===== */}
      <h1 className="course-title">{course.name_en || course.name}</h1>

      {/* ===== META ===== */}
      <div className="course-meta">
        {course.school?.join(", ")} · {course.teacher?.join(", ")}
      </div>

      {/* ===== DESCRIPTION ===== */}
      {course.about_en && (
        <div className="course-description">{course.about_en}</div>
      )}

      {/* ===== FIELDS ===== */}
      <div className="course-fields">
        {course.field_en?.length > 0 ? (
          course.field_en.map((f) => (
            <Tag key={f} color="blue">
              {f}
            </Tag>
          ))
        ) : (
          <Tag color="default">Not given</Tag>
        )}
      </div>

      {/* ===== BADGES ===== */}
      <div className="course-badges">
        {course.final_rank !== undefined && (
          <Tooltip title="Overall course quality (1–5)">
            <Tag color={course.final_rank <= 2 ? "red" : "green"}>
              Rank: {course.final_rank}
            </Tag>
          </Tooltip>
        )}

        <Tooltip title="Estimated course duration">
          <Tag>Duration: {course.course_duration.toFixed(1)} hrs</Tag>
        </Tooltip>

        {course.teacher_rate && (
          <Tooltip title="Instructor rating">
            <Tag color="gold">Teacher ★ {course.teacher_rate}</Tag>
          </Tooltip>
        )}

        {course.school_ranking && (
          <Tooltip title="School ranking">
            <Tag>School Rank: {course.school_ranking}</Tag>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

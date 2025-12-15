import { Table, Tag, Progress } from "antd";
import { useNavigate } from "react-router-dom";

const data = [
  {
    key: "C_101",
    course: "Machine Learning Advanced",
    instructor: "David Park",
    category: "Data Science",
    students: 560,
    rating: 4.9,
    completion: 65,
    satisfaction: 94,
    quality: "Excellent"
  },
  {
    key: "C_102",
    course: "Data Science Fundamentals",
    instructor: "Michael Chen",
    category: "Data Science",
    students: 980,
    rating: 4.8,
    completion: 72,
    satisfaction: 91,
    quality: "Excellent"
  }
];

export default function CourseDetailsTable() {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Course",
      dataIndex: "course",
      render: (_, r) => (
        <>
          <div style={{ fontWeight: 500 }}>{r.course}</div>
          <div style={{ fontSize: 12, color: "#888" }}>
            {r.instructor}
          </div>
        </>
      )
    },
    {
      title: "Category",
      dataIndex: "category",
      render: v => <Tag>{v}</Tag>
    },
    {
      title: "Students",
      dataIndex: "students"
    },
    {
      title: "Rating",
      dataIndex: "rating"
    },
    {
      title: "Completion",
      dataIndex: "completion",
      render: v => <Progress percent={v} size="small" />
    },
    {
      title: "Satisfaction",
      dataIndex: "satisfaction",
      render: v => `${v}%`
    },
    {
      title: "Quality",
      dataIndex: "quality",
      render: v => <Tag color="green">{v}</Tag>
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={(record) => ({
        onClick: () => navigate(`/courses/${record.key}`)
      })}
      style={{ cursor: "pointer" }}
    />
  );
}

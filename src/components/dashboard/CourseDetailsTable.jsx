import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

export default function CourseDetailsTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get("/courses").then(res => {
      setCourses(res.data);
      setLoading(false);
    });
  }, []);
  // console.log(courses);

  const columns = [
    {
      title: "Course",
      render: (_, r) => (
        <>
          <div style={{ fontWeight: 500 }}>{r.name_en}</div>
        </>
      )
    },
    {
      title: "Field",
      render: (_, r) =>
        r.field_en && r.field_en.length > 0 ? (
          r.field_en.map(f => <Tag key={f}>{f}</Tag>)
        ) : (
          <Tag> <span style={{color: "#999"}}>NG</span> </Tag>
        )
    },
    {
      title: "Completion",
      dataIndex: "completion_rate"
    },
    {
      title: "Sentiment",
      dataIndex: "sentiment_index"
    },
    {
      title: "Rank",
      dataIndex: "final_rank"
    }
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={courses}
      loading={loading}
      onRow={(record) => ({
        onClick: () => navigate(`/courses/${record._id}`)
      })}
      style={{ cursor: "pointer" }}
    />
  );
}

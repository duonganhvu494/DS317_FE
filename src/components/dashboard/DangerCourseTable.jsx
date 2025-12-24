import { Table, Tag } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import "./dangerCourseTable.css";

export default function DangerCourseTable({ filters }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const PAGE_SIZE = 10;

  useEffect(() => {
    axiosClient
      .get("/courses/danger", {
        params: {
          threshold: 3,
          page,
          limit: PAGE_SIZE,
          ...filters,
        },
      })
      .then((res) => {
        setCourses(res.data.data);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  }, [page, filters]);

  const columns = [
    {
      title: "Course",
      render: (_, r) => (
        <>
          <div className="danger-course-name">{r.name_en}</div>
          <div className="danger-course-school">{r.school?.join(", ")}</div>
        </>
      ),
    },
    {
      title: "Field",
      render: (_, r) =>
        r.field_en?.length ? (
          r.field_en.map((f) => <Tag key={f}>{f}</Tag>)
        ) : (
          <Tag color="default">NG</Tag>
        ),
    },
    {
      title: "Completion",
      dataIndex: "completion_rate",
    },
    {
      title: "Sentiment",
      dataIndex: "sentiment_index",
    },
    {
      title: "Final Rank",
      dataIndex: "final_rank",
      render: (rank) => (
        <Tag color={rank <= 1 ? "red" : "orange"} icon={<WarningOutlined />}>
          Rank {rank}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={courses}
      loading={loading}
      pagination={{
        current: page,
        pageSize: PAGE_SIZE,
        total,
        onChange: (p) => setPage(p),
      }}
      onRow={(record) => ({
        onClick: () => navigate(`/courses/${record._id}`),
      })}
      rowClassName={(r) =>
        r.final_rank <= 1 ? "danger-row-critical" : "danger-row-warning"
      }
    />
  );
}

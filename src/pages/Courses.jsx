import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  });

  // ===== FETCH COURSES (SERVER SIDE PAGINATION) =====
  const fetchCourses = async (page = 1, limit = 20) => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/courses", {
        params: {
          page,
          limit
        }
      });

      setCourses(res.data.data);

      setPagination({
        current: page,
        pageSize: limit,
        total: res.data.pagination.total
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ===== LOAD FIRST PAGE =====
  useEffect(() => {
    fetchCourses(pagination.current, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===== TABLE COLUMNS =====
  const columns = [
    {
      title: "Course",
      width: 300,
      ellipsis: true,
      render: (_, r) => (
        <div style={{ maxWidth: 280 }}>
          <div
            style={{
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
            title={r.name_en}
          >
            {r.name_en}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#888",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
            title={r.school?.join(", ")}
          >
            {r.school?.join(", ")}
          </div>
        </div>
      )
    },
    {
      title: "Completion",
      dataIndex: "completion_rate",
      width: 120
    },
    {
      title: "Sentiment",
      dataIndex: "sentiment_index",
      width: 120
    },
    {
      title: "Field",
      width: 200,
      render: (_, r) =>
        r.field_en?.length ? (
          r.field_en.map(f => <Tag key={f}>{f}</Tag>)
        ) : (
          <Tag color="default">NG</Tag>
        )
    },
    {
      title: "Final Rank",
      dataIndex: "final_rank",
      width: 120
    }
  ];

  return (
    <>
      <h1>📚 Courses</h1>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={courses}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true
        }}
        onChange={(p) => {
          fetchCourses(p.current, p.pageSize);
        }}
        onRow={(record) => ({
          onClick: () => navigate(`/courses/${record._id}`)
        })}
        style={{ cursor: "pointer" }}
        tableLayout="fixed"
      />
    </>
  );
}

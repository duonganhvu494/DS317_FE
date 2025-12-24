import { Table, Tag, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "./courses.css";

export default function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sorter, setSorter] = useState({
    field: null,
    order: null
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  });

  // ======================
  // FETCH COURSES
  // ======================
  const fetchCourses = async (
    page = 1,
    limit = 20,
    keyword = search,
    sort = sorter
  ) => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/courses", {
        params: {
          page,
          limit,
          search: keyword,
          sortBy: sort.field,
          sortOrder:
            sort.order === "ascend"
              ? "asc"
              : sort.order === "descend"
              ? "desc"
              : undefined
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

  // ======================
  // INITIAL LOAD
  // ======================
  useEffect(() => {
    fetchCourses(pagination.current, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ======================
  // TABLE COLUMNS
  // ======================
  const columns = [
    {
      title: "Course",
      dataIndex: "name_en",
      width: 300,
      ellipsis: true,
      sorter: true,
      sortOrder:
        sorter.field === "name_en" ? sorter.order : null,
      render: (_, r) => (
        <div className="course-cell">
          <div className="course-name">
            {r.name_en}
          </div>
          <div className="course-school">
            {r.school?.join(", ")}
          </div>
        </div>
      )
    },
    {
      title: "Completion",
      dataIndex: "completion_rate",
      sorter: true,
      sortOrder:
        sorter.field === "completion_rate"
          ? sorter.order
          : null,
      width: 120
    },
    {
      title: "Sentiment",
      dataIndex: "sentiment_index",
      sorter: true,
      sortOrder:
        sorter.field === "sentiment_index"
          ? sorter.order
          : null,
      width: 120
    },
    {
      title: "Field",
      width: 220,
      render: (_, r) =>
        r.field_en?.length ? (
          r.field_en.map(f => (
            <Tag key={f}>{f}</Tag>
          ))
        ) : (
          <Tag color="default">NG</Tag>
        )
    },
    {
      title: "Final Rank",
      dataIndex: "final_rank",
      sorter: true,
      sortOrder:
        sorter.field === "final_rank"
          ? sorter.order
          : null,
      width: 120,
      render: rank => (
        <Tag
          color={
            rank <= 1
              ? "red"
              : rank <= 2
              ? "orange"
              : "green"
          }
        >
          {rank}
        </Tag>
      )
    }
  ];

  return (
    <div className="courses-page">
      <h1 className="page-title">📚 Courses</h1>

      {/* ===== SEARCH BAR ===== */}
      <div className="courses-toolbar">
        <Input.Search
          className="courses-search"
          placeholder="Search course name..."
          allowClear
          onSearch={value => {
            setSearch(value);
            fetchCourses(1, pagination.pageSize, value);
          }}
        />
      </div>

      {/* ===== TABLE ===== */}
      <Table
        className="courses-table"
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
        onChange={(p, _, s) => {
          const newSorter = s.order
            ? { field: s.field, order: s.order }
            : { field: null, order: null };

          setSorter(newSorter);

          fetchCourses(
            p.current,
            p.pageSize,
            search,
            newSorter
          );
        }}
        onRow={record => ({
          onClick: () =>
            navigate(`/courses/${record._id}`)
        })}
        tableLayout="fixed"
        locale={{
          emptyText: "No courses found"
        }}
      />
    </div>
  );
}

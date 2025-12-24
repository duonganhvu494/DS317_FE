import { Card, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import "./DashboardFilter.css";


const { Option } = Select;

const FILTER_CACHE_KEY = "course_filters_cache";
const FILTER_CACHE_TTL = 10 * 60 * 1000;

function getCachedFilters() {
  const cached = localStorage.getItem(FILTER_CACHE_KEY);
  if (!cached) return null;

  const { data, time } = JSON.parse(cached);
  if (Date.now() - time > FILTER_CACHE_TTL) return null;

  return data;
}

export default function DashboardFilters({ onChange }) {
  const [options, setOptions] = useState(() => getCachedFilters());

  useEffect(() => {
    if (options) return;

    axiosClient.get("/courses/courseFilters").then((res) => {
      setOptions(res.data);

      localStorage.setItem(
        FILTER_CACHE_KEY,
        JSON.stringify({
          data: res.data,
          time: Date.now(),
        })
      );
    });
  }, []);

  if (!options) return <Spin />;

  function updateFilter(key, value) {
    onChange((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  }

  // maxWeek có thể lấy từ backend, tạm dùng 1–100
  const weeks = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <Card className="dashboard-filter-card">
      <div className="filter-header">Filters</div>

      <div className="filter-row">
        {/* FIELD */}
        <Select
          allowClear
          placeholder="Field"
          className="filter-select"
          onChange={(v) => updateFilter("field", v)}
        >
          {options.fields.map((f) => (
            <Option key={f} value={f}>
              {f}
            </Option>
          ))}
        </Select>

        {/* SCHOOL */}
        <Select
          allowClear
          placeholder="School"
          className="filter-select wide"
          onChange={(v) => updateFilter("school", v)}
        >
          {options.schools.map((s) => (
            <Option key={s} value={s}>
              {s}
            </Option>
          ))}
        </Select>

        {/* FROM WEEK */}
        <Select
          allowClear
          placeholder="From week"
          className="filter-select small"
          onChange={(v) => updateFilter("fromWeek", v)}
        >
          {weeks.map((w) => (
            <Option key={w} value={w}>
              W{w}
            </Option>
          ))}
        </Select>

        {/* TO WEEK */}
        <Select
          allowClear
          placeholder="To week"
          className="filter-select small"
          onChange={(v) => updateFilter("toWeek", v)}
        >
          {weeks.map((w) => (
            <Option key={w} value={w}>
              W{w}
            </Option>
          ))}
        </Select>
      </div>
    </Card>
  );
}

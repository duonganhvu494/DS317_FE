import { Card, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

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

    axiosClient.get("/courses/courseFilters").then(res => {
      setOptions(res.data);

      localStorage.setItem(
        FILTER_CACHE_KEY,
        JSON.stringify({
          data: res.data,
          time: Date.now()
        })
      );
    });
  }, []);

  if (!options) return <Spin />;

  function updateFilter(key, value) {
    onChange(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  }

  return (
    <Card style={{ marginBottom: 24 }}>
      <Select
        allowClear
        placeholder="Filter by Field"
        style={{ width: 240, marginRight: 16 }}
        onChange={v => updateFilter("field", v)}
      >
        {options.fields.map(f => (
          <Option key={f} value={f}>
            {f}
          </Option>
        ))}
      </Select>

      <Select
        allowClear
        placeholder="Filter by School"
        style={{ width: 300 }}
        onChange={v => updateFilter("school", v)}
      >
        {options.schools.map(s => (
          <Option key={s} value={s}>
            {s}
          </Option>
        ))}
      </Select>
    </Card>
  );
}

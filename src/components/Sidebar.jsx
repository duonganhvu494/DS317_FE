import { Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { key: "/", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/introduction", icon: <BookOutlined />, label: "Introduction" },
    { key: "/courses", icon: <BookOutlined />, label: "Courses" },
    { key: "/models", icon: <ExperimentOutlined />, label: "Models" },
    { key: "/data-quality", icon: <CheckCircleOutlined />, label: "Data Quality" }
  ];

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: "0 16px",
          fontWeight: 600
        }}
      >
        {!collapsed && <span>🎓 Course AI</span>}
        <div
          style={{ cursor: "pointer" }}
          onClick={onToggle}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>

      {/* MENU */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        inlineCollapsed={collapsed}
        onClick={({ key }) => navigate(key)}
      />
    </div>
  );
}

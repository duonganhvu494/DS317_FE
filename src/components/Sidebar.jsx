import { Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  WarningOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Dashboard"
    },
    {
      key: "/courses",
      icon: <BookOutlined />,
      label: "Courses"
    }
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={items}
      onClick={({ key }) => navigate(key)}
      style={{
        height: "100%",
        borderRight: 0
      }}
    />
  );
}

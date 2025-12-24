// ==============================
// src/layouts/MainLayout.jsx
// ==============================

import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const { Content, Sider } = Layout;

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* SIDER */}
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={220}
        collapsedWidth={80}
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0"
        }}
      >
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </Sider>

      {/* CONTENT */}
      <Layout
        style={{
          padding: 16,
          background: "#f5f6fa"
        }}
      >
        <Content
          style={{
            background: "#f5f6fa",
            overflowY: "auto"
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

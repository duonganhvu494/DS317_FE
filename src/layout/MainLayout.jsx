import { Layout } from "antd";
import Sidebar from "../components/Sidebar";

const { Content, Sider } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220} style={{ background: "#fff" }}>
        <div
          style={{
            height: 64,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          Course Analytics
        </div>
        <Sidebar />
      </Sider>
      <Layout style={{ margin: -8, padding: 12 }}>
          <Content style={{ background: "#f5f6fa" }}>
            {children}
          </Content>
      </Layout>
    </Layout>
  );
}

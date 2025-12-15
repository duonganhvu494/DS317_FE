import { Layout } from "antd";

const { Content } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout style={{ margin: -8, padding: 12 }}>
        <Content style={{ background: "#f5f6fa" }}>
          {children}
        </Content>
    </Layout>
  );
}

import { Layout } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content } = Layout;

export default function MainLayout() {
  return (
    <Layout>
      <Header className="bg-primary text-white font-semibold">
        <Link to="/">TOKO ONLINE</Link>
      </Header>
      <Content className="min-h-screen bg-light-grey-2">
        <div className="max-w-3xl mx-auto p-8">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

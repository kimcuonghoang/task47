import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  RollbackOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    "DashBoard",
    "1",
    <Link to="/admin/dashboard">
      {" "}
      <PieChartOutlined />
    </Link>
  ),
  getItem(
    "Products",
    "2",
    <Link to="/admin/product">
      <DesktopOutlined />
    </Link>
  ),
  getItem(
    "User",
    "sub1",
    <Link to="/admin/user">
      <UserOutlined />{" "}
    </Link>
  ),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
  getItem(
    "Back to Home",
    "10",
    <Link to="/">
      <RollbackOutlined />
    </Link>
  ),
];
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 64,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#001529", // màu xanh Bootstrap
              fontWeight: "bold",
              fontSize: "2rem", // tương đương display-5 (~32px)
              // textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Xin chào Admin
          </h1>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "User" }, { title: "Bill" }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;

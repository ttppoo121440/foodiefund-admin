import React from 'react';
import { Layout } from 'antd';
import SiderMenu from '../Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const { Sider } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <SiderMenu />
      </Sider>
      <Layout className="site-layout">
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;

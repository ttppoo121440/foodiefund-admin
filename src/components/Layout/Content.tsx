import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

const AppContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        {children}
      </div>
    </Content>
  );
};

export default AppContent;

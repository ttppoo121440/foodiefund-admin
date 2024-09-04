import { ReactNode } from 'react';
import { Layout } from 'antd';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Sidebar';

const { Content } = Layout;

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Header />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff' }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

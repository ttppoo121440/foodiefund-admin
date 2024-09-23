import { Card, Col, Row } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import LineChart from '@/components/LineChart';
import PieChart from '@/components/PieChart';
import BarChart from '@/components/BarChart';
import FinanceBarChart from '@/components/FinanceBarChart';

const Home = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            style={{ display: 'flex', alignItems: 'center', padding: 0 }}
            styles={{
              body: {
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                width: '100%',
              },
            }}
          >
            <div
              style={{
                backgroundColor: '#1890ff',
                padding: '16px',
                color: '#fff',
                marginRight: 'auto',
              }}
            >
              <UserOutlined style={{ fontSize: '24px' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', color: '#1890ff' }}>1234</div>
              <div>會員總量</div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            style={{ display: 'flex', alignItems: 'center', padding: 0 }}
            styles={{
              body: {
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                width: '100%',
              },
            }}
          >
            <div
              style={{
                backgroundColor: '#52c41a',
                padding: '16px',
                color: '#fff',
                marginRight: 'auto',
              }}
            >
              <BellOutlined style={{ fontSize: '24px' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', color: '#52c41a' }}>321</div>
              <div>系統消息</div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            style={{ display: 'flex', alignItems: 'center', padding: 0 }}
            styles={{
              body: {
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                width: '100%',
              },
            }}
          >
            <div
              style={{
                backgroundColor: '#f5222d',
                padding: '16px',
                color: '#fff',
                marginRight: 'auto',
              }}
            >
              <ShoppingOutlined style={{ fontSize: '24px' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', color: '#f5222d' }}>5000</div>
              <div>專案總量</div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <LineChart></LineChart>
        </Col>
        <Col span={6}>
          <PieChart></PieChart>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <BarChart></BarChart>
        </Col>
        <Col span={12}>
          <FinanceBarChart></FinanceBarChart>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  DollarOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const items: MenuItem[] = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: <Link to="/">首頁</Link>,
  },
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: <Link to="/profile">會員管理</Link>,
    // children: [
    //   {
    //     key: 'profile-list',
    //     label: <Link to="/profile">會員管理</Link>,
    //   },
    //   {
    //     key: 'profile-blockList',
    //     label: <Link to="/blockList">黑白名單</Link>,
    //   },
    // ],
  },
  {
    key: 'raising-deals',
    icon: <DollarOutlined />,
    label: <Link to="/raising-deals">募集交易管理</Link>,
  },
  {
    key: 'announcement',
    icon: <SoundOutlined />,
    label: <Link to="/announcement">公告活動管理</Link>,
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: <Link to="/settings">設定</Link>,
  },
];

const Sidebar = () => {
  return (
    <Sider>
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  );
};

export default Sidebar;

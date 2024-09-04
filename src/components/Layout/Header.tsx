import { Layout } from 'antd';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className="site-layout-background" style={{ padding: 0 }}>
      <h1 style={{ textAlign: 'left', paddingLeft: '20px' }}>
        眾資成城-在你心愛的餐廳成為合夥人
      </h1>
    </AntHeader>
  );
};

export default Header;

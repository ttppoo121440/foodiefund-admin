import { WarningOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { ShowDeleteConfirmProps } from './types';

const { confirm } = Modal;

export const ShowDeleteConfirm = ({
  _id,
  title,
  text,
  deleteData,
}: ShowDeleteConfirmProps<string>) => {
  confirm({
    title: `您確定刪除該${title}資料嗎?`,
    icon: <WarningOutlined style={{ color: '#ff4d4f' }} />,
    content: text,
    okText: '刪除',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      deleteData(_id as string);
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

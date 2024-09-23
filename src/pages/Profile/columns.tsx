import { ColumnsType } from 'antd/es/table';
import { Button, Space, Switch, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Moment from 'moment';
import { AccountResponseType } from '@/api/services/userService/types';

export const getColumns = (
  openDialogEditData: (data: AccountResponseType) => void,
  openDialogDeleteData: (data: AccountResponseType) => void,
  filter: number | undefined,
  switchHandler: (checked: boolean, data: AccountResponseType) => void,
  isFetch: boolean,
): ColumnsType<AccountResponseType> => [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (text) => <a> {text}</a>,
  },
  {
    title: '信箱',
    dataIndex: 'email',
    key: 'email',
    sorter: true,
  },
  {
    title: '電話',
    dataIndex: 'phone',
    key: 'phone',
    sorter: true,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    sorter: true,
  },
  {
    title: '生日',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
    sorter: true,
    render: (date) => Moment(date).format('YYYY-MM-DD'),
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    sorter: true,
    render: (tag) =>
      tag === 'user' ? (
        <Tag color="success">{tag}</Tag>
      ) : (
        <Tag color="error">{tag}</Tag>
      ),
  },
  {
    title: '備註',
    dataIndex: 'remarks',
    key: 'remarks',
    sorter: true,
  },
  {
    title: '操作',
    dataIndex: '',
    key: '',
    render: (data: AccountResponseType) => (
      <Space>
        <Button
          disabled={isFetch}
          icon={<EditOutlined />}
          onClick={() => openDialogEditData(data)}
        ></Button>
        <Button
          disabled={isFetch}
          danger
          icon={<DeleteOutlined />}
          onClick={() => openDialogDeleteData(data)}
        ></Button>
        {filter === undefined ? null : (
          <Switch
            disabled={isFetch}
            checkedChildren="黑名單"
            unCheckedChildren="白名單"
            checked={data.isBlackListed === true}
            onChange={(checked) => switchHandler(checked, data)}
            loading={isFetch}
          />
        )}
      </Space>
    ),
  },
];

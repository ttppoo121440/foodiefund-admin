import { ColumnsType } from 'antd/es/table';
import { Button, Space, Switch } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Moment from 'moment';
import { NewsResponseType } from '@/api/services/newsService/types';

export const getColumns = (
  openDialogEditData: (data: NewsResponseType) => void,
  openDialogDeleteData: (data: NewsResponseType) => void,
  isFetch: boolean,
  switchHandler: (
    checked: boolean,
    data: NewsResponseType,
    key: keyof NewsResponseType,
  ) => void,
): ColumnsType<NewsResponseType> => [
  {
    title: '標題',
    dataIndex: 'title',
    key: 'title',
    sorter: true,
    render: (text) => <a> {text}</a>,
  },
  {
    title: '內容',
    dataIndex: 'content',
    key: 'content',
    sorter: true,
  },
  {
    title: '是否啟用',
    dataIndex: 'isEnabled',
    key: 'isEnabled',
    render: (isEnabled: boolean, data: NewsResponseType) => (
      <Space>
        <Switch
          disabled={isFetch}
          checkedChildren="啟用"
          unCheckedChildren="未啟用"
          checked={isEnabled}
          onChange={(checked) => switchHandler(checked, data, 'isEnabled')}
          loading={isFetch}
        />
      </Space>
    ),
  },
  {
    title: '是否置頂',
    dataIndex: 'isTop',
    key: 'isTop',
    render: (isTop: boolean, data: NewsResponseType) => (
      <Space>
        <Switch
          disabled={isFetch}
          checkedChildren="置頂"
          unCheckedChildren="未置頂"
          checked={isTop}
          onChange={(checked) => switchHandler(checked, data, 'isTop')}
          loading={isFetch}
        />
      </Space>
    ),
  },
  {
    title: '發表時間',
    dataIndex: 'publicAt',
    key: 'publicAt',
    sorter: true,
    render: (date) => Moment(date).format('YYYY-MM-DD'),
  },
  {
    title: '更新時間',
    dataIndex: 'updateAt',
    key: 'updateAt',
    sorter: true,
    render: (date) => Moment(date).format('YYYY-MM-DD'),
  },
  {
    title: '操作',
    dataIndex: '',
    key: '',
    render: (data: NewsResponseType) => (
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
      </Space>
    ),
  },
];

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DialogButtonProps } from './types';

const DialogButton = ({
  showModal,
  btnTitle,
  isLoading,
}: DialogButtonProps) => (
  <Button
    disabled={isLoading}
    type="primary"
    onClick={showModal}
    icon={<PlusOutlined />}
  >
    {btnTitle}
  </Button>
);

export default DialogButton;

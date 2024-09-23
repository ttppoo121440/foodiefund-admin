import { Form, Switch } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { inputType } from './types';

const FormSwitch = ({ name }: inputType) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <Form.Item
          validateStatus={error && isTouched ? 'error' : ''}
          help={error && isTouched ? error.message : ''}
        >
          <Switch
            {...field}
            checkedChildren="開啟"
            unCheckedChildren="關閉"
            defaultChecked
          />
        </Form.Item>
      )}
    />
  );
};

export default FormSwitch;

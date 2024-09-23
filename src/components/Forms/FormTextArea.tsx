import { Form, Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { inputType } from './types';

const FormTextArea = ({ name }: inputType) => {
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
          <TextArea {...field} autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
      )}
    />
  );
};

const { TextArea } = Input;

export default FormTextArea;

import { Form, Radio } from 'antd';
import { RadioProps } from './types';
import { Controller, useFormContext } from 'react-hook-form';

const FormRadio = ({ options = [], name }: RadioProps) => {
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
          <Radio.Group
            {...field}
            options={options}
            onChange={(e) => field.onChange(e.target.value)}
            value={field.value}
          />
        </Form.Item>
      )}
    />
  );
};

export default FormRadio;

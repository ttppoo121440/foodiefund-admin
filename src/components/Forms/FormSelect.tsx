import { Form, Select } from 'antd';
import { inputType } from './types';
import { Controller, useFormContext } from 'react-hook-form';

const { Option } = Select;

const FormSelect = ({ options = [], name }: inputType) => {
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
          <Select
            {...field}
            onChange={(value) => field.onChange(value)}
            value={field.value}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
    />
  );
};

export default FormSelect;

import { DatePicker, Form } from 'antd';
import { inputType } from './types';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

const FormDatePicker = ({ name, required = false }: inputType) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field }) => (
        <Form.Item required={required}>
          <DatePicker
            {...field}
            style={{ width: '100%' }}
            value={field.value ? dayjs(field.value) : null}
            presets={[
              { label: '1960', value: dayjs().year(1960) },
              { label: '1970', value: dayjs().year(1970) },
              { label: '1980', value: dayjs().year(1980) },
              { label: '1990', value: dayjs().year(1990) },
              { label: '2000', value: dayjs().year(2000) },
              { label: '2010', value: dayjs().year(2010) },
              { label: '2020', value: dayjs().year(2020) },
            ]}
            onChange={(date) => {
              field.onChange(date ? date.format('YYYY-MM-DD') : null);
            }}
          />
        </Form.Item>
      )}
    />
  );
};

export default FormDatePicker;

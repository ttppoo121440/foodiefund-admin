import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import {
  useFormContext,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import { inputType } from './types';
import FormSelect from './FormSelect';
import FormRadio from './FormRadio';
import FormDatePicker from './FormDatePicker';
import FormTextArea from './FormTextArea';
import FormSwitch from './FormSwitch';

const FormInput = ({
  name = '',
  label,
  required = false,
  type = 'text',
  options = [],
}: inputType) => {
  if (!type) {
    throw new Error(`Invalid type: ${type}. Expected 'text'.`);
  }
  const { control } = useFormContext();

  const renderInput = (field: ControllerRenderProps<FieldValues, string>) => {
    switch (type) {
      case 'number':
        return <InputNumber {...field} style={{ width: '100%' }} />;
      case 'select':
        return (
          <FormSelect
            name={name}
            label={label}
            required={required}
            options={options}
          />
        );
      case 'radio':
        return (
          <FormRadio
            name={name}
            required={required}
            options={options}
            field={field}
            label={label}
          />
        );
      case 'textarea':
        return <FormTextArea label={label} name={name} />;
      case 'switch':
        return <FormSwitch label={label} name={name} />;
      case 'date':
        return <FormDatePicker name={name} label={label} required={required} />;
      default:
        return <Input {...field} type={type} />;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={error && isTouched ? 'error' : ''}
          help={error && isTouched ? error.message : ''}
        >
          {renderInput(field)}
        </Form.Item>
      )}
    />
  );
};

export default React.memo(FormInput);

import { ReactNode } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import type { DatePickerProps as AntdDatePickerProps } from 'antd';

interface InputOption {
  value: string;
  label: string;
}

export interface inputType {
  name?: string;
  label: string;
  required?: boolean;
  type?: 'text' | 'email' | 'number' | 'password' | 'select' | 'radio' | 'date';
  options?: InputOption[];
  value?: string;
  onChange?: (value: string) => void;
  field?: Omit<ControllerRenderProps<FieldValues, string>, 'ref'>;
}

export interface FormsProps<T> {
  children?: ReactNode;
  formItems: inputType[];
  initialValues?: T;
}

export interface RadioProps extends Omit<inputType, 'type'> {
  field: Omit<ControllerRenderProps<FieldValues, string>, 'ref'>;
}

export interface DatePickerProps extends Omit<AntdDatePickerProps, 'onChange'> {
  field: Omit<ControllerRenderProps<FieldValues, string>, 'ref'>;
  required?: boolean;
}

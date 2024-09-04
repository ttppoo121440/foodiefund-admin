import { Form } from 'antd';
import FormInput from './FormInput';
import { FormsProps } from './types';

const Forms = <T extends object>({
  formItems,
  initialValues,
}: FormsProps<T>) => {
  return (
    <Form layout="vertical" autoComplete="off" initialValues={initialValues}>
      {formItems.map((item) => (
        <FormInput key={item.name} {...item} />
      ))}
    </Form>
  );
};

export default Forms;

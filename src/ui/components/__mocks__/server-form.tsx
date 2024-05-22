import React, { FC } from 'react';
import type { FormValues } from '../server-form';

interface Props {
  defaultValues?: FormValues;
  onSubmit(formValues: FormValues): Promise<void>;
}

const MockServerForm: FC<Props> = function MockServerForm({ defaultValues, onSubmit }) {
  return (
    <button
      type="submit"
      onClick={() => onSubmit({
        name: 'mockName',
        host: 'mock.example.com',
        sshPort: 22,
        username: 'mockuser',
        ...defaultValues,
      })}
    >
      Submit
    </button>
  );
};

export default MockServerForm;

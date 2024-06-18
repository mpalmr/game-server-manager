import React, { FC } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Button, Form } from 'react-bootstrap';
import Field from './field';

interface FormValues {
  password: string;
}

const schema = yup
  .object({
    password: yup.string().required('Required').trim(),
  })
  .required();

interface Props {
  onSubmit(password: string): Promise<void>;
}

const PasswordPrompt: FC<Props> = function PasswordPrompt({ onSubmit }) {
  const { handleSubmit, register, formState } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
  });

  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>Enter Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(({ password }) => onSubmit(password))}>
          <Field controlId="password-prompt" error={formState.errors.password}>
            <Form.Control
              type="password"
              {...register('password', { required: true })}
            />
          </Field>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Cancel</Button>
        <Button type="submit" variant="primary">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordPrompt;

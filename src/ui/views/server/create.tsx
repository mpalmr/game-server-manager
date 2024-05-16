import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Form,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import type { Server } from '../../../store';
import Field from '../../components/field';
import { SubmitButton, BackButton } from '../../components/buttons';

const ControlsCol = styled(Col)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 1.2rem;
`;

type FormData = Pick<Server, 'name' | 'host' | 'sshPort' | 'username'>;

const SSH_PORT_RANGE_ERROR = 'Must be an integer between 1 and 65535';

const schema = yup
  .object({
    name: yup.string().required('Required').trim(),
    host: yup.string().required('Required').trim(),
    sshPort: yup
      .number()
      .typeError(SSH_PORT_RANGE_ERROR)
      .integer('Must be an integer')
      .min(1, SSH_PORT_RANGE_ERROR)
      .max(65535, SSH_PORT_RANGE_ERROR),
    username: yup.string().required('Required').trim(),
  })
  .required();

const ServerCreateView: FC = function ServerCreateView() {
  const navigate = useNavigate();

  const { handleSubmit, register, formState } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
  });

  async function onSubmit(formData: FormData) {
    return window.gsm.createServer({
      ...formData,
      sshPort: formData.sshPort || 22,
    })
      .then(() => {
        navigate('/');
      });
  }

  return (
    <Container>
      <h1>Create Server</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Field controlId="name" label="Name" error={formState.errors.name}>
            <Form.Control {...register('name', { required: true })} />
          </Field>

          <Field controlId="host" label="Host" error={formState.errors.host}>
            <Form.Control
              {...register('host', {
                required: true,
                maxLength: 255,
              })}
            />
          </Field>

          <Field controlId="ssh-port" label="SSH Port" error={formState.errors.sshPort}>
            <Form.Control
              {...register('sshPort', {
                valueAsNumber: true,
                min: 1,
                max: 65535,
                validate: (value) => Number.isInteger(value) || 'Must be an integer',
              })}
              placeholder="22"
            />
          </Field>

          <Field controlId="username" label="Username" error={formState.errors.username}>
            <Form.Control {...register('username', { required: true })} />
          </Field>
        </Row>

        <Row>
          <ControlsCol xs={12}>
            <BackButton />
            <SubmitButton />
          </ControlsCol>
        </Row>
      </Form>
    </Container>
  );
};

export default ServerCreateView;

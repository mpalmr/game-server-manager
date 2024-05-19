import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ServerForm, { FormValues } from '../../components/server-form';

const ServerCreateView: FC = function ServerCreateView() {
  const navigate = useNavigate();

  async function handleSubmit(formValues: FormValues) {
    return window.gsm.createServer(formValues)
      .then(() => {
        navigate('/');
      });
  }

  return (
    <Container>
      <h1>Create Server</h1>
      <ServerForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default ServerCreateView;

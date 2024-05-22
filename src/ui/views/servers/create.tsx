import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useServers from '../../providers/servers';
import ServerForm, { FormValues } from '../../components/server-form';

const ServerCreateView: FC = function ServerCreateView() {
  const navigate = useNavigate();
  const servers = useServers();

  async function handleSubmit(formValues: FormValues) {
    return servers.create(formValues)
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

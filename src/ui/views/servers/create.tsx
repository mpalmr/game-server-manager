import React, { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useServers from '../../providers/servers';
import ServerForm, { FormValues } from '../../components/server-form';

const ServerCreateView: FC = function ServerCreateView() {
  const navigate = useNavigate();
  const servers = useServers();
  const [isPasswordPromptOpen, setIsPasswordPromptOpen] = useState(false);

  async function handleSubmit(formValues: FormValues) {
    setIsPasswordPromptOpen(true);
  }

  return (
    <Container>
      <h1>Create Server</h1>
      <ServerForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default ServerCreateView;

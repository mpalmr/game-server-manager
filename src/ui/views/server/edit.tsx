import React, { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';
import type { Server } from '../../../store';
import ServerForm, { FormValues } from '../../components/server-form';

const ServerEditView: FC = function ServerEditView() {
  const [server, setServer] = useState<Server>();
  const urlParams = useParams<{ id: string }>();

  useEffect(() => {
    window.gsm.getServers()
      .then((servers) => {
        const serverMatch = servers.find(({ id }) => id === urlParams.id);
        if (!serverMatch) throw new Error('Server not found');
        setServer(serverMatch);
      });
  });

  async function handleSubmit(formValues: FormValues) {
    window.gsm.updateServer(urlParams.id, formValues);
  }

  return (
    <Container>
      <h1>Edit Server</h1>
      {server ? (
        <ServerForm onSubmit={handleSubmit} />
      ) : (
        <Spinner animation="grow" variant="primary" role="status">
          <span className="visually-hidden">Loading server&hellip;</span>
        </Spinner>
      )}
    </Container>
  );
};

export default ServerEditView;

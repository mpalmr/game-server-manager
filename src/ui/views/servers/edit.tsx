import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useServers from '../../providers/servers';
import ServerForm, { FormValues } from '../../components/server-form';

const ServerEditView: FC = function ServerEditView() {
  const urlParams = useParams<{ id: string }>();
  const servers = useServers();

  const serverMatch = servers.servers.find((server) => server.id === urlParams.id);

  async function handleSubmit(formValues: FormValues) {
    servers.update(urlParams.id, formValues);
  }

  return (
    <Container>
      <h1>Edit Server</h1>
      {serverMatch ? (
        <ServerForm
          defaultValues={serverMatch}
          onSubmit={handleSubmit}
        />
      ) : (
        <p>Server not found&hellip;</p>
      )}
    </Container>
  );
};

export default ServerEditView;

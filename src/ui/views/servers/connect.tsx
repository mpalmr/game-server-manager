import React, { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useServers from '../../providers/servers';

const ConnectServerView: FC = function ServerConnectView() {
  const urlParams = useParams<{ id: string }>();
  const servers = useServers();

  const serverMatch = servers.servers.find((server) => server.id === urlParams.id);

  useEffect(() => {
    console.log('CONNECT TO SERVER');
  }, []);

  return (
    <Container fluid>
      <h1>{serverMatch.host}</h1>
    </Container>
  );
};

export default ConnectServerView;

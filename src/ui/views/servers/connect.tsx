import React, { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useServers from '../../providers/servers';
import SshTerminal from '../../components/ssh-terminal';

const ConnectServerView: FC = function ServerConnectView() {
  const urlParams = useParams<{ id: string }>();
  const servers = useServers();

  const serverMatch = servers.servers.find((server) => server.id === urlParams.id);

  useEffect(() => {
    window.gsm.connect(serverMatch);
  }, []);

  return (
    <Container fluid>
      <h1>{serverMatch.host}</h1>
      <SshTerminal />
    </Container>
  );
};

export default ConnectServerView;

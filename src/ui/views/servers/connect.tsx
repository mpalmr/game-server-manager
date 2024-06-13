import React, { useMemo, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useServers from '../../providers/servers';

const ConnectServerView: FC = function ServerConnectView() {
  const urlParams = useParams<{ id: string }>();
  const servers = useServers();

  const serverMatch = useMemo(
    () => servers.servers.find((server) => server.id === urlParams.id),
    [servers],
  );

  useEffect(() => {
    if (serverMatch) window.gsm.sshConnect(serverMatch.id);
  }, [serverMatch]);

  return (
    <Container fluid>
      <h1>{serverMatch.host}</h1>
      <p>Connecting&hellip;</p>
    </Container>
  );
};

export default ConnectServerView;

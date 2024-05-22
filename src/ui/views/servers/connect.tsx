import React, { useCallback, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useServers from '../../providers/servers';
import type { SshDataCb } from '../../../preload';

const ConnectServerView: FC = function ServerConnectView() {
  const urlParams = useParams<{ id: string }>();
  const servers = useServers();

  const handleSshData: SshDataCb = useCallback((event, value) => {
    console.log('HANDLING', value);
  }, []);

  const serverMatch = servers.servers.find((server) => server.id === urlParams.id);

  useEffect(() => {
    window.gsm.onSshData(handleSshData);
    return () => {
      window.gsm.offSshData(handleSshData);
    };
  }, []);

  return (
    <Container fluid>
      <h1>{serverMatch.host}</h1>
    </Container>
  );
};

export default ConnectServerView;

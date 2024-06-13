import React, { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Terminal from '../../components/terminal';

const ConnectServerView: FC = function ServerConnectView() {
  const urlParams = useParams<{ id: string }>();

  useEffect(() => {
    window.gsm.sshConnect(urlParams.id);
  }, [urlParams.id]);

  return (
    <Container fluid>
      <h1>{urlParams.id}</h1>
      <Terminal serverId={urlParams.id} />
    </Container>
  );
};

export default ConnectServerView;

import React, { useState, useEffect, FC } from 'react';
import { Container } from 'react-bootstrap';
import type { Server } from '../../db';

const ServersView: FC = function GamesView() {
  const [servers, setServers] = useState<Server[]>();

  useEffect(() => {
    window.gsm.getAllServers().then(setServers);
  }, []);

  console.log(servers);

  return (
    <Container>
      <h1>Servers</h1>
    </Container>
  );
};

export default ServersView;

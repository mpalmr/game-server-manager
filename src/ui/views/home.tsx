import React, { useEffect, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import type { Server } from '../../store';
import { Ul } from '../components/list';

const HomeView: FC = function HomeView() {
  const navigate = useNavigate();
  const [servers, setServers] = useState<Server[]>();

  useEffect(() => {
    window.gsm.getServers()
      .then((res) => {
        if (res.length) setServers(res);
        else navigate('/server/create');
      });
  }, []);

  return servers ? (
    <Container>
      <h1>Servers</h1>
      <Ul>
        {servers.map((server) => (
          <li key={server.id}>
            <h2>{server.name}</h2>
            <p>{server.host}</p>
            <p>{server.username}</p>
          </li>
        ))}
      </Ul>
    </Container>
  ) : (
    <h1>Loading&hellip;</h1>
  );
};

export default HomeView;

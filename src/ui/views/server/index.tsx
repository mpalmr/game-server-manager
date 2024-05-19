import React, { useEffect, useState, FC } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { FaGlobe, FaEdit, FaTrash } from 'react-icons/fa';
import type { Server } from '../../../store';
import { Ul } from '../../components/list';
import Dl from '../../components/dl';

const ServerControls = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 1rem;
`;

const HomeView: FC = function HomeView() {
  const navigate = useNavigate();
  const [servers, setServers] = useState<Server[]>();

  useEffect(() => {
    window.gsm.getServers().then<void>((res) => {
      if (res.length) {
        setServers(res.slice().sort((a, b) => a.name.localeCompare(b.name)));
      } else navigate('/server/create');
    });
  }, []);

  return servers ? (
    <Container>
      <h1>Servers</h1>
      <Ul>
        {servers.map((server) => (
          <li key={server.id}>
            <h2>{server.name}</h2>
            <Dl>
              <dt>Host</dt>
              <dd>{server.host}</dd>
              <dt>Username</dt>
              <dd>{server.username}</dd>
              <dt>Last Seen</dt>
              <dd>{server.lastSeenAt ? server.lastSeenAt.toLocaleString() : 'Never'}</dd>
            </Dl>

            <ServerControls>
              <Link className="btn btn-success" to={`/server/${server.id}`}>
                <FaGlobe />
              </Link>

              <Link className="btn btn-info" to={`/server/${server.id}/edit`}>
                <FaEdit />
              </Link>

              <Button variant="danger">
                <FaTrash />
              </Button>
            </ServerControls>
          </li>
        ))}
      </Ul>
    </Container>
  ) : (
    <h1>Loading&hellip;</h1>
  );
};

export default HomeView;

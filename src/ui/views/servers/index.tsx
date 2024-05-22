import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import {
  FaPlus,
  FaGlobe,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import useServers from '../../providers/servers';
import Loading from '../../components/loading';
import { Ul } from '../../components/list';
import Dl from '../../components/dl';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ServerControls = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 1rem;

  > .btn:not(:last-child) {
    margin-right: .5rem;
  }
`;

const HomeView: FC = function HomeView() {
  const servers = useServers();

  return (
    <Container>
      <Header>
        <h1>Servers</h1>
        <Link className="btn btn-success" to="/servers/create">
          <FaPlus />
        </Link>
      </Header>

      {!servers.isLoading ? (
        <div>
          {servers.servers.length ? (
            <Ul>
              {servers.servers.map((server) => (
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

                    <Button variant="danger" onClick={() => servers.remove(server.id)}>
                      <FaTrash />
                    </Button>
                  </ServerControls>
                </li>
              ))}
            </Ul>
          ) : (
            <p>No servers found</p>
          )}
        </div>
      ) : (
        <Loading message="Loading servers" />
      )}
    </Container>
  );
};

export default HomeView;

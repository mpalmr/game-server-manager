import React, { useEffect, FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import useServers from '../providers/servers';

const SplashContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const SplashView: FC = function SplashView() {
  const navigate = useNavigate();
  const servers = useServers();

  useEffect(() => {
    if (!servers.isLoading) {
      navigate(servers.servers.length ? '/servers' : '/servers/create');
    }
  }, [servers.isLoading]);

  return (
    <SplashContainer>
      <Spinner animation="grow" variant="primary" role="status">
        <span className="visually-hidden">Loading Game Server Manager&hellip;</span>
      </Spinner>
    </SplashContainer>
  );
};

export default SplashView;

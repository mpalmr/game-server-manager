import React, { useEffect, FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const SplashContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const SplashView: FC = function SplashView() {
  const navigate = useNavigate();

  useEffect(() => {
    window.gsm.getServers()
      .then((servers) => {
        navigate(servers.length ? '/server' : '/server/create');
      });
  }, []);

  return (
    <SplashContainer>
      <Spinner animation="grow" variant="primary" role="status">
        <span className="visually-hidden">Loading Game Server Manager&hellip;</span>
      </Spinner>
    </SplashContainer>
  );
};

export default SplashView;

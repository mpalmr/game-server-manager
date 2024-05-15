import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Ul } from '../list';
import NavItem from './nav-item';

const NavList = styled(Ul)`
  display: flex;
  flex-direction: row;
  align-items: center;

  > li:not(:last-of-type) {
    margin-right: 1.8em;
  }
`;

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = function Layout({ children }) {
  return (
    <>
      <Navbar as="header" className="bg-body-tertiary" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">GSM</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <NavList as={Nav} className="ml-auto">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/games">Games</NavItem>
            </NavList>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>{children}</main>
    </>
  );
};

export default Layout;

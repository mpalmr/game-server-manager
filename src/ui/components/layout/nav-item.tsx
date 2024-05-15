import React, { FC, ReactNode } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  to: string;
}

const NavItem: FC<Props> = function NavItem({ children, to }) {
  return (
    <Nav.Item as="li">
      <Nav.Link as={Link} to={to}>
        {children}
      </Nav.Link>
    </Nav.Item>
  );
};

export default NavItem;

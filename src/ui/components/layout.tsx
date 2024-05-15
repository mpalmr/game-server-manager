import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;

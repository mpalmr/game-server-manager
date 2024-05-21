import React, { ReactElement, ReactNode, FC } from 'react';
import { render as baseRender, RenderOptions } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

export * from '@testing-library/react';

interface Props {
  children: ReactNode;
}

const TestWrapper: FC<Props> = function TestWrapper({ children }) {
  return (
    <Router>
      {children}
    </Router>
  );
};

export function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return baseRender(ui, {
    wrapper: TestWrapper,
    ...options,
  });
}

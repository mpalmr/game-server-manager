import '@testing-library/jest-dom';
import React from 'react';
import * as reactRouterDom from 'react-router-dom';
import SplashView from '../splash';
import { waitFor, render } from '../../_test-utils';
import { ServersProvider } from '../../providers/servers';
import type { Server } from '../../../store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn<(url: string) => void, []>(),
}));

jest.mock('../../../store');

const mockNavigate = jest.fn();
const mockGsm = {
  getServers: jest.fn<Promise<Server[]>, []>(),
};

beforeEach(() => {
  jest.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(mockNavigate);
  Object.assign(window, { gsm: mockGsm });
});

afterAll(() => {
  window.gsm = undefined;
});

test('shows spinner when loading then navigates to /servers', async () => {
  (reactRouterDom.useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  mockGsm.getServers.mockResolvedValue([]);

  const { container } = render(
    <ServersProvider>
      <SplashView />
    </ServersProvider>,
  );

  expect(container.querySelector('[role="status"]')).toBeInTheDocument();
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/servers'));
});

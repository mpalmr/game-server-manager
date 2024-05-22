import '@testing-library/jest-dom';
import React from 'react';
import { waitFor, screen, render } from '../../../_test-utils';
import ServersView from '..';
import { ServersProvider } from '../../../providers/servers';
import type { Server } from '../../../../store';

jest.mock('../../../../store');

const mockGetServers = jest.fn<Promise<Server[]>, []>();
const mockGsm = {
  getServers: mockGetServers,
};

beforeEach(() => {
  Object.assign(window, { gsm: mockGsm });
});

afterAll(() => {
  window.gsm = undefined;
});

test('shows loading indicator if servers are not loaded', () => {
  mockGetServers.mockResolvedValue([]);

  const { container } = render(
    <ServersProvider>
      <ServersView />
    </ServersProvider>,
  );

  expect(container.querySelector('[role="status"]')).toBeInTheDocument();
  expect(screen.queryByText('No servers found')).not.toBeInTheDocument();
  expect(container.querySelector('ul')).not.toBeInTheDocument();
});

test('if no servers are found show a message', async () => {
  mockGetServers.mockResolvedValue([]);

  const { container } = render(
    <ServersProvider>
      <ServersView />
    </ServersProvider>,
  );

  await waitFor(() => expect(container.querySelector('[role="status"]')).not.toBeInTheDocument());
  expect(screen.queryByText('No servers found')).toBeInTheDocument();
  expect(container.querySelector('ul')).not.toBeInTheDocument();
});

test('if servers are found show them in a list', async () => {
  mockGetServers.mockResolvedValue([
    {
      id: 'mock-id-1',
      name: 'Test Server 1',
      host: 'one.example.com',
      username: 'testuser',
      games: [],
      lastSeenAt: new Date('2024-01-01'),
      createdAt: new Date('2019-02-02'),
    },
    {
      id: 'mock-id-2',
      name: 'Test Server 2',
      host: 'two.example.com',
      username: 'anothertestuser',
      games: [],
      lastSeenAt: new Date('2024-01-02'),
      createdAt: new Date('2019-02-03'),
    },
  ]);

  const { container } = render(
    <ServersProvider>
      <ServersView />
    </ServersProvider>,
  );

  await waitFor(() => expect(container.querySelector('[role="status"]')).not.toBeInTheDocument());
  expect(screen.queryByText('No servers found')).not.toBeInTheDocument();
  expect(container.querySelector('ul')).toBeInTheDocument();
  expect(screen.queryByText('one.example.com')).toBeInTheDocument();
  expect(screen.queryByText('two.example.com')).toBeInTheDocument();
  expect(container.querySelectorAll('ul > li')).toHaveLength(2);
});

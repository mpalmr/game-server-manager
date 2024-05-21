import '@testing-library/jest-dom';
import React, { FC } from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor, screen, render } from '../../_test-utils';
import useServers, { ServersProvider } from '../servers';

jest.mock('../../../store');

const mockGsm = {
  getServers: jest.fn(),
  createServer: jest.fn(),
  updateServer: jest.fn(),
  removeServer: jest.fn(),
};

beforeEach(() => {
  Object.assign(window, { gsm: mockGsm });
});

afterAll(() => {
  window.gsm = undefined;
});

test('isLoading is initially true then switches to false', async () => {
  const TestComponent: FC = function TestComponent() {
    const servers = useServers();
    return (
      <p>{servers.isLoading ? 'Loading' : 'Done'}</p>
    );
  };

  mockGsm.getServers.mockResolvedValue([]);

  render(
    <ServersProvider>
      <TestComponent />
    </ServersProvider>,
  );

  expect(screen.queryByText('Loading')).toBeInTheDocument();
  expect(screen.queryByText('Done')).not.toBeInTheDocument();
  await waitFor(() => expect(screen.queryByText('Done')).toBeInTheDocument());
  expect(screen.queryByText('Loading')).not.toBeInTheDocument();
});

test('throws error when useServers is used outside of a ServersProvider', () => {
  const TestComponent: FC = function TestComponent() {
    useServers();
    return null;
  };

  expect(() => render(<TestComponent />))
    .toThrow('Cannot use context without supporting provider');
});

test('shows existing servers', async () => {
  const TestComponent: FC = function TestComponent() {
    const servers = useServers();

    return (
      <ul data-testid="list">
        {servers.servers.map((server) => (
          <li key={server.id}>
            {server.name}
          </li>
        ))}
      </ul>
    );
  };

  mockGsm.getServers.mockResolvedValue([
    {
      id: 'mock-id-1',
      name: 'Test Server 1',
      host: 'one.example.com',
      username: 'testuser',
      games: [],
      lastSeenAt: new Date('2024-01-01').toISOString(),
      createdAt: new Date('2019-02-02').toISOString(),
    },
    {
      id: 'mock-id-2',
      name: 'Test Server 2',
      host: 'two.example.com',
      username: 'anothertestuser',
      games: [],
      lastSeenAt: new Date('2024-01-02').toISOString(),
      createdAt: new Date('2019-02-03').toISOString(),
    },
  ]);

  render(
    <ServersProvider>
      <TestComponent />
    </ServersProvider>,
  );

  expect(screen.getByTestId('list')).toBeEmptyDOMElement();
  await waitFor(() => expect(screen.getByTestId('list')).not.toBeEmptyDOMElement());
  expect(screen.queryByText('Test Server 1')).toBeInTheDocument();
  expect(screen.queryByText('Test Server 2')).toBeInTheDocument();
});

test('create a new server', async () => {
  const TestComponent: FC = function TestComponent() {
    const servers = useServers();

    return (
      <>
        <ul data-testid="list">
          {servers.servers.map((server) => (
            <li key={server.id}>
              {server.name}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => servers.create({
            name: 'Test Server New',
            host: 'new.example.com',
            username: 'testuser',
          })}
        >
          Create
        </button>
      </>
    );
  };

  mockGsm.getServers.mockResolvedValue([{
    id: 'mock-id-old',
    name: 'Test Server Old',
    host: 'old.example.com',
    username: 'testuser',
    games: [],
    lastSeenAt: new Date('2024-01-01').toISOString(),
    createdAt: new Date('2019-02-02').toISOString(),
  }]);

  mockGsm.createServer.mockResolvedValue({
    id: 'mock-id-new',
    name: 'Test Server New',
    host: 'new.example.com',
    username: 'testuser',
    games: [],
    lastSeenAt: new Date('2024-01-03').toISOString(),
    createdAt: new Date('2019-02-04').toISOString(),
  });

  render(
    <ServersProvider>
      <TestComponent />
    </ServersProvider>,
  );

  await waitFor(() => expect(screen.getByTestId('list')).not.toBeEmptyDOMElement());
  expect(screen.queryByText('Test Server New')).not.toBeInTheDocument();
  await userEvent.click(screen.getByText('Create'));
  expect(screen.queryByText('Test Server New')).toBeInTheDocument();
});

test('update an existing server', async () => {
  const TestComponent: FC = function TestComponent() {
    const servers = useServers();

    return (
      <>
        <ul data-testid="list">
          {servers.servers.map((server) => (
            <li key={server.id}>
              {server.name}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => servers.update('mock-id-1', {
            name: 'Updated Test Server 1',
            host: 'one.example.com',
            username: 'testuser',
          })}
        >
          Update Test Server 1
        </button>
      </>
    );
  };

  mockGsm.getServers.mockResolvedValue([
    {
      id: 'mock-id-1',
      name: 'Test Server 1',
      host: 'one.example.com',
      username: 'testuser',
      games: [],
      lastSeenAt: new Date('2024-01-01').toISOString(),
      createdAt: new Date('2019-02-02').toISOString(),
    },
    {
      id: 'mock-id-2',
      name: 'Test Server 2',
      host: 'two.example.com',
      username: 'anothertestuser',
      games: [],
      lastSeenAt: new Date('2024-01-02').toISOString(),
      createdAt: new Date('2019-02-03').toISOString(),
    },
  ]);

  mockGsm.updateServer.mockResolvedValue({
    id: 'mock-id-1',
    name: 'Updated Test Server 1',
    host: 'one.example.com',
    username: 'testuser',
    games: [],
    lastSeenAt: new Date('2024-01-01').toISOString(),
    createdAt: new Date('2019-02-02').toISOString(),
  });

  render(
    <ServersProvider>
      <TestComponent />
    </ServersProvider>,
  );

  await waitFor(() => expect(screen.getByTestId('list')).not.toBeEmptyDOMElement());
  expect(screen.queryByText('Test Server 1')).toBeInTheDocument();
  expect(screen.queryByText('Updated Test Server 1')).not.toBeInTheDocument();

  await userEvent.click(screen.getByText('Update Test Server 1'));
  expect(screen.queryByText('Test Server 1')).not.toBeInTheDocument();
  expect(screen.queryByText('Updated Test Server 1')).toBeInTheDocument();
});

test('remove an existing server', async () => {
  const TestComponent: FC = function TestComponent() {
    const servers = useServers();

    return (
      <>
        <ul data-testid="list">
          {servers.servers.map((server) => (
            <li key={server.id}>
              {server.name}
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => servers.remove('mock-id-1')}>
          Remove
        </button>
      </>
    );
  };

  mockGsm.getServers.mockResolvedValue([
    {
      id: 'mock-id-1',
      name: 'Test Server 1',
      host: 'one.example.com',
      username: 'testuser',
      games: [],
      lastSeenAt: new Date('2024-01-01').toISOString(),
      createdAt: new Date('2019-02-02').toISOString(),
    },
    {
      id: 'mock-id-2',
      name: 'Test Server 2',
      host: 'two.example.com',
      username: 'anothertestuser',
      games: [],
      lastSeenAt: new Date('2024-01-02').toISOString(),
      createdAt: new Date('2019-02-03').toISOString(),
    },
  ]);

  mockGsm.removeServer.mockResolvedValue(null);

  render(
    <ServersProvider>
      <TestComponent />
    </ServersProvider>,
  );

  await waitFor(() => expect(screen.getByTestId('list')).not.toBeEmptyDOMElement());
  expect(screen.queryByText('Test Server 1')).toBeInTheDocument();
  await userEvent.click(screen.getByText('Remove'));
  expect(screen.queryByText('Test Server 1')).not.toBeInTheDocument();
});

import transformServer from '../server';
import type { RawServer } from '../../store';

test('transforms server to use Date objects', () => {
  const testServer: RawServer = {
    id: 'testServerId',
    name: 'Test Server',
    host: 'example.com',
    username: 'admin',
    lastSeenAt: '2024-01-01T12:00:00Z',
    createdAt: '2023-01-01T12:00:00Z',
    games: [
      {
        id: 'game1',
        title: 'Valheim',
        lastRunningAt: '2023-06-01T12:00:00Z',
        createdAt: '2023-01-01T12:00:00Z',
      },
      {
        id: 'game2',
        title: 'Factorio',
        createdAt: '2023-01-02T12:00:00Z',
      },
    ],
  };

  expect(transformServer(testServer)).toEqual({
    id: 'testServerId',
    name: 'Test Server',
    host: 'example.com',
    username: 'admin',
    lastSeenAt: new Date('2024-01-01T12:00:00Z'),
    createdAt: new Date('2023-01-01T12:00:00Z'),
    games: [
      {
        id: 'game1',
        title: 'Valheim',
        lastRunningAt: new Date('2023-06-01T12:00:00Z'),
        createdAt: new Date('2023-01-01T12:00:00Z'),
      },
      {
        id: 'game2',
        title: 'Factorio',
        createdAt: new Date('2023-01-02T12:00:00Z'),
      },
    ],
  });
});

test('handles server with no lastSeenAt', () => {
  const testServer: RawServer = {
    id: 'testServerId',
    name: 'Test Server',
    host: 'example.com',
    username: 'admin',
    createdAt: '2023-01-01T12:00:00Z',
    games: [
      {
        id: 'game1',
        title: 'Valheim',
        lastRunningAt: '2023-06-01T12:00:00Z',
        createdAt: '2023-01-01T12:00:00Z',
      },
      {
        id: 'game2',
        title: 'Factorio',
        createdAt: '2023-01-02T12:00:00Z',
      },
    ],
  };

  expect(transformServer(testServer)).toEqual({
    id: 'testServerId',
    name: 'Test Server',
    host: 'example.com',
    username: 'admin',
    createdAt: new Date('2023-01-01T12:00:00Z'),
    games: [
      {
        id: 'game1',
        title: 'Valheim',
        lastRunningAt: new Date('2023-06-01T12:00:00Z'),
        createdAt: new Date('2023-01-01T12:00:00Z'),
      },
      {
        id: 'game2',
        title: 'Factorio',
        createdAt: new Date('2023-01-02T12:00:00Z'),
      },
    ],
  });
});

test('handles server with no games', () => {
  const testServer: RawServer = {
    id: 'testServerId',
    name: 'Test Server',
    host: 'example.com',
    username: 'admin',
    createdAt: '2023-01-01T12:00:00Z',
    games: [],
  };

  expect(transformServer(testServer).games).toEqual([]);
});

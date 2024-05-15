import mockFs from 'mock-fs';
import { advanceTo } from 'jest-date-mock';
import * as uuid from 'uuid';
import {
  Server,
  getServers,
  createServer,
  removeServer,
} from '../server';
import rootPath from '../root-path';

jest.mock('uuid');
const mockCreateUuid = uuid.v4 as jest.Mock<string, []>;

function mockServersJson(servers: Server[]) {
  mockFs({
    [rootPath]: {
      'servers.json': JSON.stringify({ servers }, null, 2),
    },
  });
}

describe('getAllServers', () => {
  test('returns an empty array if there are no servers', async () => {
    mockServersJson([]);
    const servers = await getServers();
    expect(servers).toEqual([]);
  });

  test('returns all stored servers', async () => {
    const mockServers = [
      {
        id: 'one',
        name: 'server1',
        createdAt: new Date('2000-01-01'),
      },
      {
        id: 'two',
        name: 'server2',
        createdAt: new Date('2000-01-02'),
      },
    ];

    mockServersJson(mockServers);
    const servers = await getServers();
    expect(servers).toEqual(mockServers);
  });
});

describe('createServer', () => {
  test('creates a new server', async () => {
    mockServersJson([{
      id: 'existing-id',
      name: 'old server',
      createdAt: new Date('2000-01-01'),
    }]);

    advanceTo(new Date('2000-01-02'));
    mockCreateUuid.mockReturnValue('new-id');
    await createServer({ name: 'new server' });

    expect(await getServers()).toEqual([
      {
        id: 'existing-id',
        name: 'old server',
        createdAt: new Date('2000-01-01'),
      },
      {
        id: 'new-id',
        name: 'new server',
        createdAt: new Date('2000-01-02'),
      },
    ]);
  });
});

describe('removeServer', () => {
  test('removes a server by id', async () => {
    mockServersJson([
      {
        id: 'id-to-remove',
        name: 'bad server',
        createdAt: new Date('2000-01-01'),
      },
      {
        id: 'id-to-keep',
        name: 'good server',
        createdAt: new Date('2000-01-02'),
      },
    ]);

    await removeServer('id-to-remove');

    expect(await getServers()).toEqual([
      {
        id: 'id-to-keep',
        name: 'good server',
        createdAt: new Date('2000-01-02'),
      },
    ]);
  });
});

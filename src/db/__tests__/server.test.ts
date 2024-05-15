import mockFs from 'mock-fs';
import { Server, getServers, createServer } from '../server';
import rootPath from '../root-path';

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
        name: 'server1',
      },
      {
        name: 'server2',
      },
    ];

    mockServersJson(mockServers);
    const servers = await getServers();
    expect(servers).toEqual(mockServers);
  });
});

describe('createServer', () => {
  test('creates a new server', async () => {
    mockServersJson([{ name: 'old server' }]);
    await createServer({ name: 'new server' });
    expect(await getServers()).toEqual([
      { name: 'old server' },
      { name: 'new server' },
    ]);
  });
});

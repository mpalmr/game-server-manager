import { ipcMain } from 'electron';
import { v4 as createId } from 'uuid';
import store, { Server } from '../store';

type NewServer = Omit<Server, 'id' | 'games' | 'createdAt'>;

function expectUniqueHost(host: string, servers: Server[]) {
  if (servers.some((server) => server.host === host)) {
    throw new Error('Host already exists');
  }
}

export default function applyServerEvents() {
  ipcMain.handle('getServerList', () => store.get('servers'));

  ipcMain.handle('getServerById', (event, id: string) => {
    const match = store.get('servers').find((server) => server.id === id);
    if (!match) throw new Error(`Could not find server with ID: ${id}`);
    return match;
  });

  ipcMain.handle('createServer', (event, server: NewServer) => {
    const newServer: Server = {
      ...server,
      id: createId(),
      games: [],
      createdAt: new Date(),
    };

    const existingServers = store.get('servers');
    expectUniqueHost(newServer.host, existingServers);

    store.set('servers', existingServers.concat(newServer));
    return newServer;
  });

  ipcMain.handle('updateServer', (event, serverId: string, server: NewServer) => {
    const existingServers = store.get('servers');
    const updatedServer = {
      ...existingServers.find(({ id }) => id === serverId),
      ...server,
    };

    const otherServers = existingServers.filter(({ id }) => id !== serverId);
    expectUniqueHost(updatedServer.host, otherServers);

    store.set('servers', existingServers.map((s) => (s.id !== serverId ? s : updatedServer)));
  });

  ipcMain.handle('removeServer', (event, serverId: string) => {
    const existingServers = store.get('servers');
    if (existingServers.every((server) => server.id !== serverId)) {
      throw new Error('Server does not exist');
    }

    store.set('servers', existingServers.filter(({ id }) => id !== serverId));
  });
}

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
  ipcMain.handle('server.list', () => store.get('servers'));

  ipcMain.handle('server.get-by-id', (event, id: string) => {
    const match = store.get('servers').find((server) => server.id === id);
    if (!match) throw new Error(`Could not find server with ID: ${id}`);
    return match;
  });

  ipcMain.handle('server.create', (event, server: NewServer) => {
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

  ipcMain.handle('server.update', (event, serverId: string, server: NewServer) => {
    const existingServers = store.get('servers');
    const updatedServer = {
      ...existingServers.find(({ id }) => id === serverId),
      ...server,
    };

    const otherServers = existingServers.filter(({ id }) => id !== serverId);
    expectUniqueHost(updatedServer.host, otherServers);

    store.set('servers', existingServers.map((s) => (s.id !== serverId ? s : updatedServer)));
  });

  ipcMain.handle('server.remove', (event, serverId: string) => {
    const existingServers = store.get('servers');
    if (existingServers.every((server) => server.id !== serverId)) {
      throw new Error('Server does not exist');
    }

    store.set('servers', existingServers.filter(({ id }) => id !== serverId));
  });
}

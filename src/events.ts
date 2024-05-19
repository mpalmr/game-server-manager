import { ipcMain } from 'electron';
import { v4 as createUuid } from 'uuid';
import store, { Server } from './store';

type NewServer = Omit<Server, 'id' | 'games' | 'createdAt'>;

export default function applyEvents() {
  ipcMain.handle('getServers', () => store.get('servers'));

  ipcMain.handle('createServer', (event, server: NewServer) => {
    const newServer: Server = {
      ...server,
      id: createUuid(),
      games: [],
      createdAt: new Date(),
    };

    const existingServers = store.get('servers');
    if (existingServers.some(({ host }) => host === newServer.host)) {
      throw new Error('Host already exists');
    }

    store.set('servers', existingServers.concat(newServer));
    return newServer;
  });
}

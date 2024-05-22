import { ipcMain } from 'electron';
import { v4 as createUuid } from 'uuid';
import { Client } from 'ssh2';
import store, { Server } from './store';

type NewServer = Omit<Server, 'id' | 'games' | 'createdAt'>;

function expectUniqueHost(host: string, servers: Server[]) {
  if (servers.some((server) => server.host === host)) {
    throw new Error('Host already exists');
  }
}

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

    expectUniqueHost(updatedServer.host, existingServers.filter(({ id }) => id !== serverId));
    store.set('servers', existingServers.map((s) => (s.id !== serverId ? s : updatedServer)));
  });

  ipcMain.handle('removeServer', (event, serverId: string) => {
    const existingServers = store.get('servers');
    if (existingServers.every((server) => server.id !== serverId)) {
      throw new Error('Server does not exist');
    }

    store.set('servers', existingServers.filter(({ id }) => id !== serverId));
  });

  ipcMain.handle('connect', async (event, server: Server) => {
    const conn = new Client();

    conn.on('ready', () => {
      conn.shell((err, stream) => {
        if (err) throw err;
        stream
          .on('close', conn.end)
          .on('data', (data: string) => {
            console.log('SSH OUTPUT', data);
          });
        stream.end('ls -l\nexit\n');
      });
    })
      .connect({
        host: server.host,
        port: server.sshPort || 22,
        username: server.username,
        password: 'P@ssw0rd',
      });
  });
}

import { ipcMain, BrowserWindow } from 'electron';
import { Client } from 'ssh2';
import type { Server } from '../store';

export default function connectEvents(window: BrowserWindow) {
  ipcMain.handle('connect', async (event, server: Server) => {
    const conn = new Client();

    conn
      .on('ready', () => {
        conn.shell((err, stream) => {
          if (err) throw err;
          stream
            .on('close', conn.end)
            .on('data', (data: string) => {
              window.webContents.send('ssh-data', data);
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

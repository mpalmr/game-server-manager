import { ipcMain } from 'electron';
import { Client, ClientChannel } from 'ssh2';
import store from '../store';

export default function applySshEvents() {
  let sshStream: ClientChannel;

  ipcMain.on('sshConnect', (event, serverId) => {
    const server = store.get('servers').find(({ id }) => id === serverId);
    if (!server) throw new Error(`Could not find server by ID: ${serverId}`);

    const sshClient = new Client();

    sshClient
      .on('ready', () => {
        event.sender.send('sshData', 'SSH Connection Established...\n');
        sshClient.shell((error, stream) => {
          if (error) event.sender.send('sshData', `Error: ${error.message}\n`);
          else {
            sshStream = stream;
            stream
              .on('data', (data: string) => {
                event.sender.send('sshData', data.toString());
              })
              .on('close', () => {
                event.sender.send('sshData', '\nSSH Connection Closed...\n');
                sshClient.end();
              });
          }
        });
      })
      .connect({
        host: server.host,
        port: server.sshPort,
        username: server.username,
        password: 'milo5985',
        timeout: 30_000,
      });
  });

  ipcMain.on('sshInput', (event, data) => {
    if (sshStream) sshStream.write(data);
  });
}

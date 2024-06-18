import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import type { RawServer, ServerEditableFields } from './store';

export type SshDataCb = (event: IpcRendererEvent, data: string) => void;

interface GsmApi {
  getServers(): Promise<RawServer[]>;
  initializeServer(server: ServerEditableFields, password: string): void;
  createServer(server: ServerEditableFields): Promise<RawServer>;
  updateServer(id: string, server: ServerEditableFields): Promise<RawServer>;
  removeServer(id: string): Promise<void>;

  sshConnect(serverId: string): void;
  sshData(cb: (data: string) => void): void;
  sshInput(key: string): void;
}

declare global {
  interface Window {
    gsm: GsmApi;
  }
}

contextBridge.exposeInMainWorld('gsm', {
  getServers: async () => ipcRenderer.invoke('server.list'),
  initializeServer: (server, password) => ipcRenderer.send('server.initalize', server, password),
  createServer: async (server) => ipcRenderer.invoke('server.create', server),
  updateServer: async (id, server) => ipcRenderer.invoke('server.update', id, server),
  removeServer: async (id) => ipcRenderer.invoke('server.remove', id),

  sshConnect: (serverId) => ipcRenderer.send('ssh.connect', serverId),
  sshData: (cb) => ipcRenderer.on('ssh.data', (event, data) => cb(data)),
  sshInput: (data) => ipcRenderer.send('ssh.input', data),
} as GsmApi);

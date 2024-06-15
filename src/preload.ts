import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import type { Server, ServerEditableFields } from './store';

export type SshDataCb = (event: IpcRendererEvent, data: string) => void;

interface GsmApi {
  getServers(): Promise<Server[]>;
  getServerById(id: string): Promise<Server>;
  createServer(server: ServerEditableFields): Promise<Server>;
  updateServer(id: string, server: ServerEditableFields): Promise<Server>;
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
  getServerById: async (id) => ipcRenderer.invoke('server.get-by-id', id),
  createServer: async (server) => ipcRenderer.invoke('server.create', server),
  updateServer: async (id, server) => ipcRenderer.invoke('server.update', id, server),
  removeServer: async (id) => ipcRenderer.invoke('server.remove', id),

  sshConnect: (serverId) => ipcRenderer.send('ssh.connect', serverId),
  sshData: (cb) => ipcRenderer.on('ssh.data', (event, data) => cb(data)),
  sshInput: (data) => ipcRenderer.send('ssh.input', data),
} as GsmApi);

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import type { Server, ServerEditableFields } from './store';

export type SshDataCb = (event: IpcRendererEvent, data: string) => void;

interface GsmApi {
  getServers(): Promise<Server[]>;
  createServer(server: ServerEditableFields): Promise<Server>;
  updateServer(id: string, server: ServerEditableFields): Promise<Server>;
  removeServer(id: string): Promise<void>;

  sshConnect(serverId: string): void;
  onSshData(cb: (data: string) => void): void;
}

declare global {
  interface Window {
    gsm: GsmApi;
  }
}

contextBridge.exposeInMainWorld('gsm', {
  getServers: async () => ipcRenderer.invoke('getServers'),
  createServer: async (server) => ipcRenderer.invoke('createServer', server),
  updateServer: async (id, server) => ipcRenderer.invoke('updateServer', id, server),
  removeServer: async (id) => ipcRenderer.invoke('removeServer', id),

  sshConnect: (serverId) => ipcRenderer.send('sshConnect', serverId),
  onSshData: (cb) => ipcRenderer.on('sshData', (event, data) => cb(data)),
} as GsmApi);

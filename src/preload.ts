import { contextBridge, ipcRenderer } from 'electron';
import type { Server, ServerEditableFields } from './store';

interface GsmApi {
  getServers(): Promise<Server[]>;
  createServer(server: ServerEditableFields): Promise<Server>;
  updateServer(id: string, server: ServerEditableFields): Promise<Server>;
  removeServer(id: string): Promise<void>;
  connect(server: Server): Promise<void>;
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
  connect: async (server) => ipcRenderer.invoke('connect', server),
  onSshData: (cb) => ipcRenderer.on('ssh-data', (event, value) => cb(value)),
} as GsmApi);

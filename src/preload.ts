import { contextBridge, ipcRenderer } from 'electron';
import type { Server } from './store';

type ServerFields = Omit<Server, 'id' | 'lastSeenAt' | 'createdAt'>;

interface GsmApi {
  getServers(): Promise<Server[]>;
  createServer(server: ServerFields): Promise<Server>;
  updateServer(id: string, server: ServerFields): Promise<Server>;
  removeServer(id: string): Promise<void>;
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
} as GsmApi);

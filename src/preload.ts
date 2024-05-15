import { contextBridge, ipcRenderer } from 'electron';
import type { Server } from './db';

interface GsmApi {
  getAllServers(): Promise<Server[]>;
}

declare global {
  interface Window {
    gsm: GsmApi;
  }
}

contextBridge.exposeInMainWorld('gsm', {
  getAllServers: async () => ipcRenderer.invoke('getAllServers'),
} as GsmApi);

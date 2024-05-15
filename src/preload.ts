import { contextBridge, ipcRenderer } from 'electron';
import type { Server } from './db';
import context from 'react-bootstrap/esm/AccordionContext';

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

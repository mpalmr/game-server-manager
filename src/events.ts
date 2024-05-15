import { ipcMain } from 'electron';
import { getServers } from './db';

export default function applyEvents() {
  ipcMain.handle('getServers', async () => getServers());
}

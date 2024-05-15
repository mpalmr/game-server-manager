import fs from 'node:fs/promises';
import { initializeServers } from './server';
import rootPath from './root-path';

export { Server, getServers } from './server';

export async function initializeDb() {
  const exists = await fs.access(rootPath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!exists) {
    await fs.mkdir(rootPath);
    await initializeServers();
  }
}

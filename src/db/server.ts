import path from 'node:path';
import fs from 'node:fs/promises';
import rootPath from './root-path';

const SERVERS_PATH = path.join(rootPath, 'servers.json');

export interface Server {
  name: string;
}

interface ServersJson {
  servers: Server[];
}

async function read() {
  return fs.readFile(SERVERS_PATH, 'utf-8')
    .then<ServersJson>(JSON.parse);
}

async function write(serversJson: ServersJson) {
  return fs.writeFile(SERVERS_PATH, JSON.stringify(serversJson, null, 2), 'utf-8');
}

export async function initializeServers() {
  return write({ servers: [] });
}

export async function getServers() {
  return read().then(({ servers }) => servers);
}

export async function createServer(server: Server) {
  const serversJson = await read();
  return write({
    ...serversJson,
    servers: serversJson.servers.concat(server),
  });
}

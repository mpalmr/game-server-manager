import path from 'node:path';
import fs from 'node:fs/promises';
import { v4 as createUuid } from 'uuid';
import rootPath from './root-path';

const SERVERS_PATH = path.join(rootPath, 'servers.json');

export interface Server {
  id: string;
  name: string;
  createdAt: Date;
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
  return read().then(({ servers }) => servers.map((server) => ({
    ...server,
    createdAt: new Date(server.createdAt),
  })));
}

export async function getServerById(serverId: string) {
  const server = await read()
    .then(({ servers }) => servers.find(({ id }) => id === serverId));

  if (!server) throw new Error('Server not found');
  return {
    ...server,
    createdAt: new Date(server.createdAt),
  };
}

export async function createServer(server: Omit<Server, 'id' | 'createdAt'>) {
  const serversJson = await read();
  return write({
    ...serversJson,
    servers: serversJson.servers.concat({
      ...server,
      id: createUuid(),
      createdAt: new Date(),
    }),
  });
}

export async function removeServer(serverId: string) {
  const serversJson = await read();
  return write({
    ...serversJson,
    servers: serversJson.servers.filter((server) => server.id !== serverId),
  });
}

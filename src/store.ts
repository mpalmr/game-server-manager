import Store from 'electron-store';

export interface Game {
  readonly id: string;
  title: 'Valheim' | 'Factorio';
  lastRunningAt?: Date;
  readonly createdAt: Date;
}

export interface Server {
  readonly id: string;
  name: string;
  host: string;
  sshPort?: number;
  username: string;
  games: Game[];
  lastSeenAt?: Date;
  readonly createdAt: Date;
}

export type ServerEditableFields = Pick<Server, 'name' | 'host' | 'sshPort' | 'username'>;

interface StoreData {
  servers: Server[];
}

const store = new Store<StoreData>({
  schema: {
    servers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          host: { type: 'string' },
          sshPort: { type: 'number' },
          username: { type: 'string' },
          lastSeenAt: { type: 'object' },
          createdAt: { type: 'object' },
        },
        required: [
          'id',
          'name',
          'host',
          'username',
          'createdAt',
        ],
      },
    },
  },

  defaults: {
    servers: [],
  },

  deserialize(json) {
    const storeData: StoreData = JSON.parse(json);

    return {
      ...storeData,
      servers: storeData.servers.map((server) => ({
        ...server,
        lastSeenAt: server.lastSeenAt && new Date(server.lastSeenAt),
        createdAt: new Date(server.createdAt),
      })),
    };
  },
});

export default store;

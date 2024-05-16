import Store from 'electron-store';

export interface Server {
  id: string;
  name: string;
  host: string;
  sshPort?: number;
  username: string;
  lastSeenAt?: Date;
  createdAt: Date;
}

interface Schema {
  servers: Server[];
}

const store = new Store<Schema>({
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
          lastSeenAt: { type: 'string' },
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
    const { servers, ...xs }: Schema = JSON.parse(json);

    return {
      ...xs,
      servers: servers.map((server) => ({
        ...server,
        lastSeenAt: server.lastSeenAt && new Date(server.lastSeenAt),
        createdAt: new Date(server.createdAt),
      })),
    };
  },
});

export default store;

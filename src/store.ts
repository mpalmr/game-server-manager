import Store from 'electron-store';
import { transformServer } from './transforms';

export interface Game {
  readonly id: string;
  readonly title: 'Valheim' | 'Factorio';
  label?: string;
  lastRunningAt?: Date;
  readonly createdAt: Date;
}

export interface RawGame extends Omit<Game, 'lastRunningAt' | 'createdAt'> {
  lastRunningAt?: string;
  createdAt: string;
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

export interface RawServer extends Omit<Server, 'lastSeenAt' | 'createdAt' | 'games'> {
  lastSeenAt?: string;
  createdAt: string;
  games: RawGame[];
}

export type ServerEditableFields = Pick<Server, 'name' | 'host' | 'sshPort' | 'username'>;

interface RawStoreData {
  servers: RawServer[];
}

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
          games: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: {
                  type: 'string',
                  enum: ['Valheim', 'Factorio'],
                },
                label: { type: 'string' },
                lastRunningAt: { type: 'object' },
                createdAt: { type: 'object' },
              },
              required: [
                'id',
                'title',
                'createdAt',
              ],
            },
          },
        },
        required: [
          'id',
          'name',
          'host',
          'username',
          'games',
          'createdAt',
        ],
      },
    },
  },

  defaults: {
    servers: [],
  },

  deserialize(json: string): StoreData {
    const storeData: RawStoreData = JSON.parse(json);

    return {
      ...storeData,
      servers: storeData.servers.map(transformServer),
    };
  },
});

export default store;

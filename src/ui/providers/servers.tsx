import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
  FC,
} from 'react';
import type { Server, ServerEditableFields } from '../../store';

interface Context {
  servers: Server[];
  isLoading: boolean;
  create(server: ServerEditableFields): Promise<Server>;
  update(serverId: string, server: ServerEditableFields): Promise<Server>;
  remove(serverId: string): Promise<void>;
}

const ServersContext = createContext<Context | null>(null);

export default function useServers() {
  const ctx = useContext(ServersContext);
  if (!ctx) throw new Error('Cannot use context without supporting provider');
  return ctx;
}

function parseServer(server: Server): Server {
  return {
    ...server,
    lastSeenAt: server.lastSeenAt && new Date(server.lastSeenAt),
    createdAt: new Date(server.createdAt),
    games: (server.games || []).map((game) => ({ // TODO: Remove "|| []"
      ...game,
      lastRunningAt: game.lastRunningAt && new Date(game.lastRunningAt),
      createdAt: new Date(game.createdAt),
    })),
  };
}

interface Props {
  children: ReactNode;
}

export const ServersProvider: FC<Props> = function ServersProvider({ children }) {
  const [servers, setServers] = useState<Server[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.gsm.getServers()
      .then((xs) => {
        setServers(xs.map(parseServer));
        setIsLoading(false);
      });
  }, []);

  const value = useMemo(() => ({
    servers,
    isLoading,

    async create(server: ServerEditableFields) {
      const newServer = parseServer(await window.gsm.createServer(server));
      setServers((prev) => prev.concat({
        ...newServer,
        lastSeenAt: newServer.lastSeenAt && new Date(newServer.lastSeenAt),
        createdAt: new Date(newServer.createdAt),
        games: [],
      }));
      return newServer;
    },

    async update(serverId: string, server: ServerEditableFields) {
      const updatedServer = parseServer(await window.gsm.updateServer(serverId, server));
      setServers((prev) => prev.map((s) => (s.id === updatedServer.id ? updatedServer : s)));
      return updatedServer;
    },

    async remove(serverId: string) {
      await window.gsm.removeServer(serverId);
      setServers((prev) => prev.filter((server) => server.id !== serverId));
    },
  }), [servers]);

  return (
    <ServersContext.Provider value={value}>
      {children}
    </ServersContext.Provider>
  );
};

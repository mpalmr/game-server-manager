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
import Loading from '../components/loading';

interface Context {
  servers: Server[];
  createServer(server: ServerEditableFields): Promise<Server>;
  updateServer(serverId: string, server: ServerEditableFields): Promise<Server>;
  removeServer(serverId: string): Promise<void>;
}

const ServersContext = createContext<Context | null>(null);

export default function useServers() {
  const ctx = useContext(ServersContext);
  if (!ctx) throw new Error('Cannot use context without supporting provider');
  return ctx;
}

interface Props {
  children: ReactNode;
}

export const ServersProvider: FC<Props> = function StoreProvider({ children }) {
  const [servers, setServers] = useState<Server[]>();

  useEffect(() => {
    window.gsm.getServers()
      .then((xs) => {
        setServers(xs.map((server) => ({
          ...server,
          lastSeenAt: server.lastSeenAt && new Date(server.lastSeenAt),
          createdAt: new Date(server.createdAt),
        })));
      });
  }, []);

  const value = useMemo(() => ({
    servers,

    async createServer(server: ServerEditableFields) {
      const newServer = await window.gsm.createServer(server);
      setServers((prev) => prev.concat(newServer));
      return newServer;
    },

    async updateServer(serverId: string, server: ServerEditableFields) {
      const updatedServer = await window.gsm.updateServer(serverId, server);
      setServers((prev) => prev.map((s) => (s.id === updatedServer.id ? updatedServer : s)));
      return updatedServer;
    },

    async removeServer(serverId: string) {
      await window.gsm.removeServer(serverId);
      setServers((prev) => prev.filter((server) => server.id !== serverId));
    },
  }), [servers]);

  return servers ? (
    <ServersContext.Provider value={value}>
      {children}
    </ServersContext.Provider>
  ) : (
    <Loading />
  );
};

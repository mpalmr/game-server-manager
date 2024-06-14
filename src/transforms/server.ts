import type { Server, RawServer } from '../store';

export default function transformServer(server: RawServer): Server {
  return {
    ...server,
    lastSeenAt: server.lastSeenAt && new Date(server.lastSeenAt),
    createdAt: new Date(server.createdAt),
    games: server.games.map((game) => ({
      ...game,
      lastRunningAt: game.lastRunningAt && new Date(game.lastRunningAt),
      createdAt: new Date(game.createdAt),
    })),
  };
}

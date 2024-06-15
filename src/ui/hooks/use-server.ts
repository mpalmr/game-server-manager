import { useEffect, useState } from 'react';
import { transformServer } from '../../transforms';
import type { Server } from '../../store';

export default function useServer(id?: string) {
  const [server, setServer] = useState<Server | Server[]>();

  useEffect(() => {
    const ipcRequest = id
      ? window.gsm.getServerById(id).then(transformServer)
      : window.gsm.getServers().then((servers) => servers.map(transformServer));
    ipcRequest.then(setServer);
  }, [id]);

  return server;
}

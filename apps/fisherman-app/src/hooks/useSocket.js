import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export function useSocket(serverUrl = 'http://localhost:5000') {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const s = io(serverUrl);
    setSocket(s);

    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));

    return () => s.close();
  }, [serverUrl]);

  return { socket, connected };
}

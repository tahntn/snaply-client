// PusherContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import Pusher from 'pusher-js';

interface PusherContextProps {
  children: React.ReactNode;
}

const PusherContext = createContext<Pusher | undefined>(undefined);

const PusherProvider: React.FC<PusherContextProps> = ({ children }) => {
  const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  });

  useEffect(() => {
    return () => {
      pusher.disconnect();
    };
  }, [pusher]);

  return <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>;
};

export const usePusher = (): Pusher => {
  const pusher = useContext(PusherContext);

  if (!pusher) {
    throw new Error('usePusher must be used within a PusherProvider');
  }

  return pusher;
};

export default PusherProvider;

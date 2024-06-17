import { createContext, useContext } from "react";
import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_WEBSOCKET_URL!, {
  withCredentials: true,
});

// Create a context with default values
export const SocketContext = createContext(socket);

// Context consumer hook
export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }

  return context;
};

// Context provider
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

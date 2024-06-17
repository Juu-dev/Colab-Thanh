import { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@-store";
import { AuthProvider, SocketProvider } from "@-utils/context";

export function AppWithProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <SocketProvider>{children}</SocketProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}

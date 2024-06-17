import { createContext, useContext, useState } from "react";

import { User } from "@-utils/types";

type AuthContextType = {
  user?: User;
  updateAuthUser: (data: User) => void;
};

// Create a context with default values
export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},
});

// Context consumer hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

// Context provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

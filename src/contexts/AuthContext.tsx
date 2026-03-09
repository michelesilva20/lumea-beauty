import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { User } from '@store/auth';
import { getStoredUser, setStoredUser, loginDemo as doLogin, logout as doLogout } from '@store/auth';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; user?: User; error?: string };
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    setUser(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const loggedUser = doLogin(email, password);
    if (loggedUser) {
      setUser(loggedUser);
      setStoredUser(loggedUser);
      return { success: true, user: loggedUser };
    }
    return {
      success: false,
      error: 'E-mail ou senha incorretos. Use os usuários demo.',
    };
  }, []);

  const logout = useCallback(() => {
    doLogout();
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}

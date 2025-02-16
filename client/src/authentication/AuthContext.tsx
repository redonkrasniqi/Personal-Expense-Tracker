// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../services/useAuth';

type User = {
  id: string;
  email: string;
  name: string;
} | null;

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { fetchUser, user, logout: logoutUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(null);

  const checkAuth = async () => {
    try {
      const userData = await fetchUser();
      if (!userData.id) {
        setCurrentUser(null);
        setIsAuthenticated(false);
      } else {
        setCurrentUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setCurrentUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [ user ]);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isLoading, 
        user: currentUser, 
        checkAuth,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthContext);
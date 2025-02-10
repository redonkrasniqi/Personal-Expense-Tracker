import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;

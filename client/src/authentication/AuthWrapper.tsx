import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  console.log("isAuthenticated: ", isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;

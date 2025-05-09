import { Navigate } from 'react-router-dom';
import { useAuthentication } from '../authentication/AuthContext';
import Loading from './Loading';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthentication();

  if (isLoading) return <Loading />

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
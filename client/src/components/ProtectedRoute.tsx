import { Navigate } from 'react-router-dom';
import { useAuthentication } from '../authentication/AuthContext';
import { Spin } from 'antd';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthentication();

  const content = <div style={contentStyle} />;

  if (isLoading) {
    return (
        <Spin tip="Loading" size="large">
            {content}
        </Spin>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
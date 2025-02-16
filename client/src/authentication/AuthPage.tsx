import React, { useEffect } from 'react';
import { Button, Card } from 'antd';
import Login from './Login';
import Register from './Register';
import { useAuthentication } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoNavbar from '../dashboard/LogoNavbar';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = React.useState(true);
    const { isAuthenticated } = useAuthentication();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSuccess = () => {
        navigate('/dashboard');
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh' 
        }}>            
            <LogoNavbar />
            <Card style={{ width: 300, margin: 'auto', marginTop: '100px' }}>
                {isLogin ? (
                    <Login onSuccess={handleSuccess} />
                ) : (
                    <Register onSuccess={() => {
                        handleSuccess();
                        // Optional: Switch back to login after successful registration
                        setIsLogin(true);
                    }} />
                )}
                
                <Button 
                    type="link" 
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ marginTop: '20px', color: '#1890ff', fontWeight: 'bold' }}
                >
                    {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </Button>
            </Card>
        </div>
    );
};

export default AuthPage;
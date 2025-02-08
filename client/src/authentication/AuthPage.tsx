import React, { useState } from 'react';
import { Button, Card } from 'antd';
import Login from './Login';
import Register from './Register';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Card style={{ width: 300, margin: 'auto', marginTop: '100px' }}>
            {isLogin ? <Login /> : <Register />}
            <Button type="link" onClick={toggleAuthMode} style={{ marginTop: '20px', color: '#1890ff', fontWeight: 'bold' }}>
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </Button>
        </Card>
    );
};

export default AuthPage;
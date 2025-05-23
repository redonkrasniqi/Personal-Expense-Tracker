import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useAuth } from '../services/useAuth';
import './style/Register.css';

interface LoginProps {
    onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            const input = { email: values.email, password: values.password };
            await login(input);
            onSuccess();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    
    return (
        <div className="login-container">
            <h2 className="login-title">Login to Your Account</h2>
            <Form
                name="login"
                layout='vertical'
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import './style/Register.css';

interface RegisterProps {
    onSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (values: any) => {
        // Handle registration logic here
        console.log('Full Name:', values.fullName);
        console.log('Email:', values.email);
        console.log('Password:', values.password);
        onSuccess();
    };

    return (
        <div className='register-container'>
            <h2>Create a New Account</h2>
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </Form.Item>
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
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
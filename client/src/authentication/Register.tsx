import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import './style/Register.css';
import { useAuth } from '../services/useAuth';
import { fetchCurrencies } from '../services/currencyService';

interface RegisterProps {
    onSuccess: () => void;
}

type Currency = {
    id: string,
    name: string,
    symbol: string,
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
    const { register } = useAuth();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [currency, setCurrency] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [currencies, setCurrencies] = useState<Currency[]>([]);

    useEffect(() => {
        const loadCurrencies = async () => {
            try {
                const data = await fetchCurrencies();
                setCurrencies(data.data);
            } catch (error) {
                console.error('Failed to fetch currencies:', error);
            }
        };

        loadCurrencies();
    }, []);

    const handleSubmit = async (values: { email: string; password: string, fullName: string, currency: string }) => {
        if (password !== confirmPassword) {
            return;
        }
        try {
            const input = { email: values.email, password: values.password, fullName: values.fullName, currencyId: values.currency };
            const response = await register(input);
            onSuccess();
        } catch (error) {
            console.error('Login failed:', error);
        }
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
                    label="Currency"
                    name="currency"
                    rules={[{ required: true, message: 'Please select a currency!' }]}
                >
                    <Select 
                        placeholder="Select a currency"
                        onChange={setCurrency} 
                        value={currency}
                    >
                        {Array.isArray(currencies) && currencies.map(({ id, name, symbol }) => (
                            <Select.Option key={id} value={id}>
                                {symbol} - {name}
                            </Select.Option>
                        ))}
                    </Select>
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
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
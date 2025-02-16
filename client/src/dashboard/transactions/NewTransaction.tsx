import React, { useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button } from 'antd';
import { TransactionType } from './types/TransactionType';

const { Option } = Select;

interface NewTransactionProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (transaction: TransactionType) => void;
}

const NewTransaction: React.FC<NewTransactionProps> = ({ visible, onClose, onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            onSubmit(values);
            form.resetFields();
            onClose();
        });
    };

    const categories = [
        'Food & Drinks',
        'Shopping',
        'Housing',
        'Transportation',
        'Entertainment',
        'Healthcare',
        'Others',
    ];

    const currencies = ['USD', 'EUR', 'GBP', 'JPY']; // Add more currencies as needed

    return (
        <Modal
            title="Add New Transaction"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add Transaction
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: 'Please enter the amount' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Enter amount"
                        min={0}
                        step={0.01}
                    />
                </Form.Item>

                <Form.Item
                    name="currency"
                    label="Currency"
                    rules={[{ required: true, message: 'Please select a currency' }]}
                >
                    <Select placeholder="Select currency">
                        {currencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                >
                    <Input placeholder="Enter description" />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please select a category' }]}
                >
                    <Select placeholder="Select category">
                        {categories.map((category) => (
                            <Option key={category} value={category}>
                                {category}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NewTransaction;
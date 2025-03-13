import React, { useState, createContext, useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button, Checkbox, CheckboxChangeEvent, DatePicker } from 'antd';
import { createTransaction } from '../../services/transactionService';
import CategoryForm from './CategoryForm';
import moment from 'moment';
import { useRefetch } from '../RefetchContext'; // Import useRefetch

interface NewTransactionProps {
    visible: boolean;
    onClose: () => void;
}

export const CategoryVisibilityContext = createContext(false);
export const CategoryVisibilitySetterContext = createContext((value: boolean) => { });

const NewTransaction: React.FC<NewTransactionProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [date, setDate] = useState<moment.Moment | null>(moment());
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const { refetchTransactions } = useRefetch();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const transactionData = { ...values, date, paymentMethod };

            const transaction = await createTransaction(transactionData);
            form.resetFields();
            setDate(moment());
            onClose();
            await refetchTransactions();
        } catch (error) {
            console.error("Failed to create a transaction: ", error);
        }
    };

    const handlePaymentMethodChange = (e: CheckboxChangeEvent) => {
        setPaymentMethod(e.target.value);
    };

    const handleDateChange = (date: moment.Moment | null) => {
        setDate(date);
    };

    return (
        <CategoryVisibilitySetterContext.Provider value={setShowCategoryForm}>
            <CategoryVisibilityContext.Provider value={showCategoryForm}>
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
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please enter a description' }]}
                        >
                            <Input.TextArea placeholder="Enter description" rows={4} />
                        </Form.Item>

                        <Form layout='inline' style={{ marginBottom: '8px' }}>
                            <Form.Item
                                name="date"
                                label="Date"
                                rules={[{ required: true, message: 'Please select a date' }]}
                            >
                                <DatePicker
                                    value={date}
                                    onChange={handleDateChange}
                                    format="YYYY-MM-DD"
                                />
                            </Form.Item>

                            <Form.Item
                                name="paymentMethod"
                                label="Payment Method"
                                rules={[{ required: true, message: 'Please select a payment method' }]}
                            >
                                <div className="payment-method-group">
                                    <Checkbox
                                        value="cash"
                                        checked={paymentMethod === 'cash'}
                                        onChange={handlePaymentMethodChange}
                                    >
                                        Cash
                                    </Checkbox>
                                    <Checkbox
                                        value="creditCard"
                                        checked={paymentMethod === 'creditCard'}
                                        onChange={handlePaymentMethodChange}
                                    >
                                        Credit Card
                                    </Checkbox>
                                    <Checkbox
                                        value="debitCard"
                                        checked={paymentMethod === 'debitCard'}
                                        onChange={handlePaymentMethodChange}
                                    >
                                        Debit Card
                                    </Checkbox>
                                </div>
                            </Form.Item>
                        </Form>

                        <CategoryForm form={form} />
                    </Form>
                </Modal>
            </CategoryVisibilityContext.Provider>
        </CategoryVisibilitySetterContext.Provider>
    );
};

export default NewTransaction;
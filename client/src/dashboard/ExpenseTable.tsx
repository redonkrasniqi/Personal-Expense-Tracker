import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { expenseTableColumns } from "./table/expenseTableColumns";
import { fetchTranscations } from "../services/transactionService";
import { useRefetch } from './RefetchContext';

const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};

function ExpenseTable() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { refetchTransactions } = useRefetch();

    const content = <div style={contentStyle} />;

    useEffect(() => {
        const loadExpenses = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchTranscations();
                setExpenses(result);
            } catch (err: any) {
                console.error("Error fetching user transactions: ", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadExpenses();
    }, [refetchTransactions]);

    if (loading) {
        return (
            <Spin tip="Loading" size="large">
                {content}
            </Spin>
        );
    }

    return (
        <>
            <Table
                dataSource={expenses}
                columns={expenseTableColumns}
                rowKey="id"
                bordered
            />
        </>
    );
}

export default ExpenseTable;
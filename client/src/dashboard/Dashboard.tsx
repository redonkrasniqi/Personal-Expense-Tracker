import { Button } from 'antd';
import NewTransaction from './transactions/NewTransaction';
import ExpenseTable from './ExpenseTable';
import '../App.css';
import { useState, useCallback, useEffect } from 'react';
import { RefetchProvider } from './RefetchContext'; 
import { fetchTranscations } from '../services/transactionService';

const Dashboard = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadExpenses = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        loadExpenses();
    }, [loadExpenses]);

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <div className="App">
            <RefetchProvider refetchTransactions={loadExpenses}>
                <Button onClick={() => setModalVisible(true)}>
                    <p>Add Expense</p>
                </Button>
                <ExpenseTable />
                <NewTransaction visible={modalVisible} onClose={handleModalClose} />
            </RefetchProvider>
        </div>
    );
};

export default Dashboard;
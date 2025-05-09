import { Button } from 'antd';
import NewTransaction from './transactions/NewTransaction';
import ExpenseTable from './ExpenseTable';
import '../App.css';
import { useState, useCallback, useEffect } from 'react';
import { RefetchProvider } from './RefetchContext'; 
import { fetchTranscations, fetchPredictiveAnalytics } from '../services/transactionService';
import './style/Dashboard.css';
import ExpenseChart from './ExpenseChart';
import PredictiveAnalyticsModal, { AnalyticsResponse } from '../components/PredictiveAnalyticsModal';

const Dashboard = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [analyticsVisible, setAnalyticsVisible] = useState(false);
    const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse | null>(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);
    const [analyticsError, setAnalyticsError] = useState<string | null>(null);

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

    const loadAnalytics = useCallback(async () => {
        setAnalyticsLoading(true);
        setAnalyticsError(null);
        try {
            const resp = await fetchPredictiveAnalytics();
            setAnalyticsData(resp);
        } catch (err: any) {
            console.error('Error fetching predictions:', err);
            setAnalyticsError(err.message || 'Unknown error');
        } finally {
            setAnalyticsLoading(false);
        }
    }, []);
    
    const openAnalytics = () => {
        setAnalyticsVisible(true);
        loadAnalytics();
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <div className="App">
            <RefetchProvider refetchTransactions={loadExpenses}>
                <div className='flex-dashboard-layout'>
                    <div className="dashboard-container flex-dashboard-left">
                        <div className="dashboard-header">
                            <Button
                                onClick={() => setModalVisible(true)}
                                className="add-expense-button"
                            >
                                Add Expense
                            </Button>
                            <Button type="primary" onClick={openAnalytics}>
                                Predictive Analytics
                            </Button>
                        </div>
                        <ExpenseTable expenses={expenses} loading={loading} />
                    </div>
                    <div className='chart-container flex-dashboard-right'>
                        <h2>Last 3 months</h2>
                        <ExpenseChart expenses={expenses} />
                    </div>
                </div>
                <NewTransaction visible={modalVisible} onClose={handleModalClose} />
                <PredictiveAnalyticsModal
                    visible={analyticsVisible}
                    onClose={() => { setAnalyticsVisible(false) }}
                    loading={analyticsLoading}
                    error={analyticsError}
                    data={analyticsData}
                />
            </RefetchProvider>
        </div>
    );
};

export default Dashboard;
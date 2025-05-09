import React from 'react';
import { Modal, Table, Descriptions, Button, Divider, Empty, Alert } from 'antd';
import Loading from './Loading';

export interface AnalyticsResponse {
    categoryForecast: Record<string, number>;
    nextTransaction: {
        predictedDate: string;
        predictedAmount: number;
    } | null;
    recurringTransactions: Array<{
        description: string;
        predictedDate: string;
        predictedAmount: number;
    }>;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    loading: boolean;
    error: string | null;
    data: AnalyticsResponse | null;
}

const PredictiveAnalyticsModal: React.FC<Props> = ({
    visible,
    onClose,
    loading,
    error,
    data,
}) => {
    // Format date to be more readable
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // prepare table data only when we have data
    const categoryData = data
        ? Object.entries(data.categoryForecast).map(([category, forecast]) => ({
            key: category,
            category,
            forecast: forecast.toFixed(2),
        }))
        : [];

    console.log('categoryData', categoryData);

    const recurringData = data
        ? data.recurringTransactions.map((r, index) => ({
            key: `${r.description}-${index}`,
            description: r.description,
            predictedDate: formatDate(r.predictedDate),
            predictedAmount: r.predictedAmount,
        }))
        : [];
    console.log('recurringData', recurringData);

    return (
        <Modal
            visible={visible}
            title="Predictive Analytics"
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
            width="100%"
            style={{ maxWidth: 800, margin: '0 auto', top: 20 }}
            bodyStyle={{ padding: 24, maxHeight: '80vh', overflowY: 'auto' }}
        >
            {loading ? (
                <Loading />
            ) : error ? (
                <Alert type="error" message="Error loading predictions" description={error} />
            ) : data ? (
                <>
                    <h4>Next Predicted Transaction</h4>
                    <Descriptions bordered size="small">
                        <Descriptions.Item label="Date" span={2}>
                            {data.nextTransaction
                                ? formatDate(data.nextTransaction.predictedDate)
                                : 'Not enough data'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Amount" span={2}>
                            {data.nextTransaction
                                ? `$${data.nextTransaction.predictedAmount.toFixed(2)}`
                                : '–'}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <h4>Category Spend Forecast (next month)</h4>
                    <Table
                        dataSource={categoryData}
                        pagination={false}
                        size="small"
                        columns={[
                            { title: 'Category', dataIndex: 'category', key: 'category' },
                            {
                                title: 'Forecast Amount ($)',
                                dataIndex: 'forecast',
                                key: 'forecast',
                                render: (val: string) => Number(val).toFixed(2),
                            },
                        ]}
                    />

                    <Divider />

                    <h4>Recurring Transactions</h4>
                    {recurringData.length === 0 ? (
                        <Empty description="No recurring items found" />
                    ) : (
                        <Table
                            dataSource={recurringData}
                            pagination={false}
                            size="small"
                            columns={[
                                { 
                                    title: 'Description',
                                    dataIndex: 'description',
                                    key: 'description',
                                    width: '40%'
                                },
                                { 
                                    title: 'Next Date',
                                    dataIndex: 'predictedDate',
                                    key: 'predictedDate',
                                    width: '30%'
                                },
                                {
                                    title: 'Amount ($)',
                                    dataIndex: 'predictedAmount',
                                    key: 'predictedAmount',
                                    width: '30%',
                                    render: (val: number) => val.toFixed(2),
                                },
                            ]}
                        />
                    )}
                </>
            ) : null}
        </Modal>
    );
};

export default PredictiveAnalyticsModal;

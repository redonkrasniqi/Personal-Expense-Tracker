import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    ReferenceArea
} from 'recharts';
const moment = require('moment');

interface ExpenseChartProps {
    expenses: any;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
    const [refAreaLeft, setRefAreaLeft] = useState<string>('');
    const [refAreaRight, setRefAreaRight] = useState<string>('');
    const [dataRange, setDataRange] = useState<any>({ start: null, end: null });

    interface Expense {
        date: string;
        amount: number;
    }

    interface GroupedData {
        [key: string]: number;
    }

    const formatDate = (dateString: string) => {
        return moment(dateString).format('DD/MM/YYYY');
    };

    const groupedData: GroupedData = expenses
        .filter((expense: Expense) => {
            const expenseDate = moment(expense.date);
            const threeMonthsAgo = moment().subtract(3, 'months');
            return expenseDate.isAfter(threeMonthsAgo);
        })
        .reduce((acc: GroupedData, expense: Expense) => {
            const formattedDate = formatDate(expense.date);
            if (!acc[formattedDate]) {
                acc[formattedDate] = 0;
            }
            acc[formattedDate] += expense.amount;
            return acc;
        }, {});

    const chartData = Object.keys(groupedData).map(date => ({
        date,
        amount: groupedData[date],
    }));

    const handleMouseDown = (e: any) => {
        if (e) setRefAreaLeft(e.activeLabel);
    };

    const handleMouseMove = (e: any) => {
        if (refAreaLeft && e) setRefAreaRight(e.activeLabel);
    };

    const handleMouseUp = () => {
        if (refAreaLeft && refAreaRight) {
            setDataRange({
                start: refAreaLeft,
                end: refAreaRight
            });
        }
        setRefAreaLeft('');
        setRefAreaRight('');
    };

    const getAxisYDomain = (from: string, to: string, offset: number = 1) => {
        const filteredData = chartData.filter(
            (d: any) => d.date >= from && d.date <= to
        );
        const amounts = filteredData.map((d: any) => d.amount);
        const max = Math.max(...amounts);
        const min = Math.min(...amounts);
        return [min - offset, max + offset];
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={chartData}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="date"
                    domain={dataRange.start && dataRange.end ? [dataRange.start, dataRange.end] : ['auto', 'auto']}
                />
                <YAxis 
                    domain={dataRange.start && dataRange.end ? 
                        getAxisYDomain(dataRange.start, dataRange.end) : ['auto', 'auto']}
                />
                <Tooltip />
                <Legend />
                <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#8884d8" 
                    dot={false}
                    strokeWidth={2}
                />
                {refAreaLeft && refAreaRight && (
                    <ReferenceArea
                        x1={refAreaLeft}
                        x2={refAreaRight}
                        strokeOpacity={0.3}
                        fill="#8884d8"
                        fillOpacity={0.3}
                    />
                )}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ExpenseChart;

import { Table } from "antd";
import { expenseTableColumns } from "./table/expenseTableColumns";
import Loading from "../components/Loading";

interface ExpenseTableProps {
    expenses: any[];
    loading: boolean;
}

function ExpenseTable({ expenses, loading }: ExpenseTableProps) {

    if (loading) return <Loading />

    const sortedExpenses = [...expenses].sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt);
        const dateB = new Date(b.date || b.createdAt);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <>
            <Table
                dataSource={sortedExpenses}
                columns={expenseTableColumns}
                rowKey="id"
                bordered
            />
        </>
    );
}

export default ExpenseTable;

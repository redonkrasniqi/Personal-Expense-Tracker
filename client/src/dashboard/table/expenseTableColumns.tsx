import { Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { paymentText } from "./helperFunctions";
import { deleteTransaction } from "../../services/transactionService";

export const expenseTableColumns: ColumnsType<any> = [
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        width: 50,
        render: (value: number) => `$${value.toFixed(2)}`,
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: 50,
        render: (value: string) => moment(value).format("DD/MM/YYYY"),
        sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 450,
    },
    {
        title: "Payment Method",
        dataIndex: "paymentMethod",
        key: "paymentMethod",
        width: 170,
        render: (value: string) => paymentText(value as "cash" | "creditCard" | "debitCard"),
        filters: [
            { text: 'Cash', value: 'cash' },
            { text: 'Credit Card', value: 'creditCard' },
            { text: 'Debit Card', value: 'debitCard' },
        ],
        onFilter: (value, record) => record.paymentMethod === value,
    },
    {
        title: "Actions",
        key: "actions",
        width: 10,
        render: (record: any) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Popconfirm
                    title="Are you sure you want to delete this transaction?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                </Popconfirm>
            </div>
        ),
    },
];

const handleDelete = async (id: string) => {
    try {
        await deleteTransaction(id);
        message.success("Transaction deleted successfully");
    } catch (error) {
        console.error("Error deleting transaction:", error);
        message.error("Failed to delete transaction");
    }
};
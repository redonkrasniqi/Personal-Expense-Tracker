import apiClient from './apiClient';

type Transaction = {
    amount: number,
    description: string,
    category?: string
}

export const createTransaction = async (input: Transaction) => {
    const response = await apiClient.post('/transaction/create', input, {
        withCredentials: true
    });

    return response.data;
};

const getAllTransactions = async () => {
    const response = await apiClient.get('/transaction/')

    return await response.data;
}
export const fetchTranscations = async () => {
    return await getAllTransactions();
};

export const deleteTransaction = async (id: string) => {
    try {
        const response = await apiClient.delete(`/transaction/${id}`);

        if (response.status !== 204) {
            console.warn("Delete request did not return 204:", response);
        }
        return response;
    } catch (error) {
        console.error("Error deleting transaction:", error);
        throw error;
    }
};
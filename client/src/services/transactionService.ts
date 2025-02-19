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

export const getAllTransactions = async () => {
    const response = await apiClient.get('/transaction/')

    return response.data;
}


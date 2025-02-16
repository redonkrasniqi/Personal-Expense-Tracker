import apiClient from './apiClient';

const getCurrencies = async () => {
    const response = await apiClient.get('/currency/');

    return response.data;
};

export const fetchCurrencies = async () => {
    return await getCurrencies();
};

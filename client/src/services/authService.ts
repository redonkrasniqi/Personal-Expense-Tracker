import apiClient from './apiClient';

type LoginInput = {
    email: string;
    password: string;
}

type RegisterInput = {
    email: string;
    password: string;
    fullName: string;
}

export const login = async (input: LoginInput) => {
    const response = await apiClient.post('/auth/login', input, {
        withCredentials: true // Required for cookies
    });

    return response.data;
};

export const register = async (input: RegisterInput) => {
    const response = await apiClient.post('/auth/register', input, {
        withCredentials: true
    });

    return response.data;
}

export const logout = async () => {
    const response = await apiClient.post('/auth/logout', null, {
        withCredentials: true
    });
    
    return response.data;
}

export const me = async () => {
    const response = await apiClient.get('auth/me')

    return response.data;
}
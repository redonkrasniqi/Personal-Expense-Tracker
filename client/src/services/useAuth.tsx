import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register, logout, me } from './authService';
import { RegisterInput, LoginInput } from './authService';

export const useAuth = () => {
    const queryClient = useQueryClient();

    // Fetch user
    const fetchUser = async () => {
        return await me();
    };

    const { data: user, isLoading } = useQuery({
        queryKey: ['me'],
        queryFn: fetchUser,
        retry: false
    });

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginInput) => {
            return await login(credentials);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
        }
    });

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: async (userData: RegisterInput) => {
            return await register(userData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
        }
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            return await logout();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
        }
    });

    return {
        user,
        isLoading,
        fetchUser,
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
    };
};

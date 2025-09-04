import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, updateUser } from '../api/users';
import type { UserUpdate } from '../types/user';

export const useUserActions = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Mutación para crear un usuario
    const createMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate('/Userlist');
        },
    });

    // Mutación para actualizar un usuario
    const updateMutation = useMutation({
        mutationFn: (data: { id: string, user: UserUpdate }) => updateUser(data.id, data.user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate('/Userlist');
        },
    });

    return {
        createMutation,
        updateMutation,
        isPending: createMutation.isPending || updateMutation.isPending,
    };
};
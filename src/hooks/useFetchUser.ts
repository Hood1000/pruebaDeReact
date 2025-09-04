import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../api/users'; 

export const useFetchUser = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => {
            if (!userId) {
                // Si no hay ID, no se hace la llamada a la API
                return null;
            }
            return getUserById(userId);
        },
        // Esta consulta solo se ejecuta si hay un userId
        enabled: !!userId,
    });
};
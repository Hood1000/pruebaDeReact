import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserStatus } from '../api/users';

export const useToggleUserStatus = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: 'Activo' | 'Inactivo' }) =>
            updateUserStatus(id, status),
        onSuccess: () => {
            // **LA SOLUCIÓN PRINCIPAL**: Invalida la caché de la consulta 'users'
            // Esto obliga a la tabla a refrescarse con los datos más recientes de la API.
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error('Error al actualizar el estado del usuario:', error);
            // Manejo de errores
        }
    });

    const handleToggleStatus = (id: string, currentStatus: string) => {
        // **LÓGICA DE CONFIRMACIÓN**: Recupera el mensaje que faltaba
        const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';
        const confirmMessage = `¿Estás seguro de ${newStatus === 'Activo' ? 'habilitar' : 'deshabilitar'} este usuario?`;

        // Si el usuario confirma, procede con la mutación
        if (window.confirm(confirmMessage)) {
            mutation.mutate({ id, status: newStatus as 'Activo' | 'Inactivo' });
        }
    };

    return {
        handleToggleStatus,
        isToggling: mutation.isPending,
        togglingId: mutation.variables?.id,
    };
};
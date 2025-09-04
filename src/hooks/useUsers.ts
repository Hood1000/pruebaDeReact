import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/users'; 

// Hook Personalizado para la Búsqueda y Obtención de Usuarios
export const useUsers = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users', searchTerm],
        queryFn: () => getUsers(searchTerm),
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || (event.target as HTMLInputElement).value === '') {
            setSearchTerm(inputValue);
        }
    };

    return {
        users,
        isLoading,
        error,
        inputValue,
        setInputValue,
        handleKeyDown,
        searchTerm,
        setSearchTerm,
    };
};
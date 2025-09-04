import httpClient from '../services/http-client';
import type { User, UserCreate, UserUpdate } from '../types/user';
import axios from 'axios';

// Función genérica para manejar el error 404 de mockapi.io
const handleApiError = (error: unknown, fallback: any) => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
        return fallback;
    }
    throw error;
};

export const getUsers = async (query?: string, page = 1) => {
    try {
        const params: { [key: string]: string | number } = { page, limit: 10 };
        if (query) {
            params.search = query;
        }

        const response = await httpClient.get<User[]>('/users', { params });
        return response.data;
    } catch (error) {
        return handleApiError(error, []);
    }
};

export const createUser = async (userData: UserCreate) => {
    const response = await httpClient.post<User>('/users', userData);
    return response.data;
};

export const updateUser = async (id: string, userData: UserUpdate) => {
    const response = await httpClient.put<User>(`/users/${id}`, userData);
    return response.data;
};

export const updateUserStatus = async (id: string, status: 'Activo' | 'Inactivo') => {
    const response = await httpClient.put<User>(`/users/${id}`, { status });
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await httpClient.put<User>(`/users/${id}`, { status: 'Inactivo' });
    return response.data;
};

// **Lógica de Validación de Correo**
// Verifica si un correo electrónico ya existe en la base de datos
export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        // Obtenemos todos los usuarios sin usar un parámetro de búsqueda
        const response = await httpClient.get<User[]>('/users');
        
        // Buscamos si existe algún usuario con el correo proporcionado
        const userFound = response.data.find(user => user.email === email);
        
        // Retorna 'true' si se encontró un usuario, 'false' si no.
        return !!userFound;

    } catch (error) {
        // En este caso, si hay un error (por ejemplo, del servidor 500),
        // lo lanzamos para no ocultar problemas reales.
        throw error;
    }
};

export const getUserById = async (id: string) => {
    const response = await httpClient.get<User>(`/users/${id}`);
    return response.data;
};
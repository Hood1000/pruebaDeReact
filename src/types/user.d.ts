export interface User {
    id: string;
    fullName: string;
    email: string;
    status: 'Activo' | 'Inactivo';
    createdAt: string;
}

export type UserCreate = Omit<User, 'id' | 'createdAt'>;
export type UserUpdate = Partial<UserCreate>;
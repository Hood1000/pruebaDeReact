import { useState } from 'react';

// 'T' es un tipo genérico que representa la estructura de los datos del formulario.
export const useFormInput = <T>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<T>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Asignamos el valor al campo correcto usando una clave de tipo 'T'.
        setFormData(prev => ({ ...prev, [name as keyof T]: value }));
    };

    return {
        formData,
        setFormData,
        errors,
        setErrors,
        handleChange,
    };
};
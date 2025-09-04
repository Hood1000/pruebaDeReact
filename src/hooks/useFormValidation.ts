import { checkEmailExists } from '../api/users';
import type { UserCreate } from '../types/user';
import { useFetchUser } from './useFetchUser'; // Necesitas importar el hook aquí

type ValidationErrors = {
    fullName: string;
    email: string;
};

export const useFormValidation = (formData: UserCreate, id?: string) => {
    // Usa el hook para cargar el usuario a editar si es necesario
    const { data: userToEdit } = useFetchUser(id);

    const validate = async (): Promise<ValidationErrors | null> => {
        const newErrors: ValidationErrors = { fullName: '', email: '' };
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'El nombre es obligatorio';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El correo es obligatorio';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El formato del correo es inválido';
            isValid = false;
        } else {
            // Lógica para verificar la existencia del correo
            // Solo valida si es un usuario nuevo o si el correo ha cambiado
            if (!id || (userToEdit && formData.email !== userToEdit.email)) {
                const emailExists = await checkEmailExists(formData.email);
                if (emailExists) {
                    newErrors.email = 'Este correo electrónico ya está registrado.';
                    isValid = false;
                }
            }
        }

        return isValid ? null : newErrors;
    };

    return { validate };
};
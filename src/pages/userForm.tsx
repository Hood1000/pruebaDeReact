import { Link, useParams } from 'react-router-dom';
import { useFormInput } from '../hooks/useFormInput';
import { useUserActions } from '../hooks/useUserActions';
import { useFetchUser } from '../hooks/useFetchUser';
import { useEffect } from 'react';
import type { UserCreate } from '../types/user';
import { useFormValidation } from '../hooks/useFormValidation'; // <-- Importa el nuevo hook

const UserForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: userToEdit, isLoading: isUserLoading } = useFetchUser(id);
    const { formData, errors, setFormData, setErrors, handleChange } = useFormInput<UserCreate>({
        fullName: '',
        email: '',
        status: 'Activo',
    });
    const { validate } = useFormValidation(formData, id); // <-- Usa el nuevo hook
    const { createMutation, updateMutation, isPending } = useUserActions();

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                fullName: userToEdit.fullName,
                email: userToEdit.email,
                status: userToEdit.status,
            });
        }
    }, [userToEdit, setFormData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = await validate();
        if (validationErrors) {
            setErrors(validationErrors);
        } else {
            setErrors({ fullName: '', email: '' }); // Limpia los errores si la validación es exitosa
            if (id) {
                updateMutation.mutate({ id: id as string, user: formData });
            } else {
                createMutation.mutate(formData);
            }
        }
    };

    if (id && isUserLoading) {
        return <div className="text-center">Cargando datos del usuario...</div>;
    }
    return (
        <div className="flex items-center justify-center min-h-screen  p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100 transform transition-all duration-300 hover:scale-[1.01]">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
                    {id ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nombre Completo */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder='Ej: Juan Pérez'
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                            aria-invalid={errors.fullName ? "true" : "false"}
                            aria-describedby="fullName-error"
                        />
                        {errors.fullName && <p id="fullName-error" className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Correo Electrónico */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='ejemplo@dominio.com'
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            autoComplete="email"
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby="email-error"
                        />
                        {errors.email && <p id="email-error" className="text-red-600 text-xs mt-1">{errors.email}</p>}
                    </div>

                    

                    {/* Botones de Acción */}
                    <div className="flex justify-end space-x-3 mt-8">
                        <Link
                            to="/Userlist"
                            className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="cursor-pointer inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            {isPending ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {id ? 'Actualizando...' : 'Creando...'}
                                </>
                            ) : (
                                id ? 'Actualizar Usuario' : 'Crear Usuario'
                            )}
                        </button>
                    </div>

                    {(createMutation.isError || updateMutation.isError) && (
                        <p className="text-red-600 text-center text-sm mt-4">
                            Error al procesar el usuario. Inténtalo de nuevo.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserForm;
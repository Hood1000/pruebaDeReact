import { FaUserCheck, FaUserSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import type { User } from "../types/user";
import { useUsers } from "../hooks/useUsers"; // Importa el hook
import { useToggleUserStatus } from '../hooks/useToggleUserStatus';// Importa el hook
import { Redirigir } from "../hooks/Redirigir";

const UserList: React.FC = () => {
    // Del hook busqueda y obtencion de usuario
    const { users, isLoading, error, inputValue, setInputValue, handleKeyDown, searchTerm, setSearchTerm, } = useUsers();

    // Del hook eliminacion logica de usuario
    const { handleToggleStatus, isToggling, togglingId } = useToggleUserStatus();

    // Lógica para mostrar el mensaje de "no encontrado"
    const noUsersFound = !isLoading && (users?.length === 0) && !!searchTerm;
    Redirigir(noUsersFound, 2000, () => {
        setSearchTerm("");
        setInputValue("");
    });

    if (isLoading) {
        return <div className="text-center text-lg">Cargando usuarios...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-500">Error al cargar los datos.</div>
        );
    }



    return (
        <div className="p-2">
            <Link
                to="/"
                className="text-blue-600 text-4xl hover:text-blue-800 hover:underline"
            >
                Inicio
            </Link>
            <h1 className="text-4xl font-bold text-center my-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-gray-800">
                Lista de usuarios
            </h1>

            {/* Campo de búsqueda */}
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    id="Busqueda"
                    placeholder="Buscar por nombre o correo..."
                    className="p-2  rounded w-full md:w-1/2
                    border-2 border-gray-900  placeholder-gray-700 bg-white"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <Link
                    to="/users/new"
                    className="ml-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Crear Nuevo Usuario
                </Link>
            </div>

            {noUsersFound ? (
                // Muestra este mensaje si no hay usuarios y se realizó una búsqueda
                <div className="text-center text-lg text-gray-500">
                    No se encontraron usuarios que coincidan con la búsqueda "{searchTerm}".
                </div>
            ) : (
                /* Tabla de usuarios */
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2 px-4 border-b">Nombre Completo</th>
                                <th className="py-2 px-4 border-b">Correo Electrónico</th>
                                <th className="py-2 px-4 border-b">Estado</th>
                                <th className="py-2 px-4 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {users?.map((user: User) => (
                                <tr
                                    key={user.id}
                                    className="border-t bg-blue-100 hover:bg-blue-200"
                                >
                                    <td className="text-black py-2 px-4">{user.fullName}</td>
                                    <td className="py-2 px-4 text-blue-600">{user.email}</td>
                                    <td className="py-2 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === "Activo"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 flex space-x-2">
                                        <Link
                                            to={`/users/edit/${user.id}`}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 mx-auto "
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleToggleStatus(user.id, user.status)}
                                            className={`text-gray-600 hover:text-gray-900 transition mx-auto ${isToggling && togglingId === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={isToggling && togglingId === user.id}
                                            aria-label={user.status === 'Activo' ? `Desactivar a ${user.fullName}` : `Activar a ${user.fullName}`}
                                        >
                                            {user.status === 'Activo' ? (
                                                <FaUserSlash size={20} className="text-red-500 cursor-pointer" /> // Icono para desactivar
                                            ) : (
                                                <FaUserCheck size={20} className="text-green-500 cursor-pointer" /> // Icono para activar
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;

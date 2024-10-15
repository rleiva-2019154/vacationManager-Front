import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useGetUsers } from "../../hooks/useGetUsers";
import { useState } from 'react';
import { assignRole } from "../../services/api";
import { toast } from 'react-hot-toast'; // Para mostrar notificaciones

export const AssignRole = () => {
    const { users, setUsers, loading, error } = useGetUsers();
    const [selectedRole, setSelectedRole] = useState("");
    const [userId, setUserId] = useState("");

    // Maneja el cambio de rol seleccionado
    const handleRoleChange = (role) => {
        setSelectedRole(role);
    };

    // Maneja la selección de usuario
    const handleUserSelect = (id) => {
        setUserId(id);
    };

    // Función para asignar el rol al usuario seleccionado
    const handleAssignRole = async (e) => {
        e.preventDefault();

        if (!userId || !selectedRole) {
            toast.error("Debes seleccionar un usuario y un rol antes de asignar.");
            return;
        }

        try {
            await assignRole(userId, selectedRole);
            toast.success("Rol asignado exitosamente");

            // Remover el usuario asignado de la lista
            setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
            setUserId("");  // Limpiar la selección
            setSelectedRole("");  // Limpiar la selección
        } catch (error) {
            toast.error("Error al asignar rol: " + error.message);
        }
    };

    return (
        <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
            <Navbar className="fixed top-0 left-0 right-0 h-16" />
            <div className="flex-1 overflow-auto p-4">
                <div className="flex flex-col flex-1 items-center mt-8">
                    <h2 className="text-3xl font-bold">Asignar Rol a Usuario</h2>
                    {loading && <p>Cargando usuarios...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && users.length === 0 && <p>No hay usuarios sin rol asignado.</p>}
                    {!loading && users.length > 0 && (
                        <form className="mt-8 w-full max-w-lg" onSubmit={handleAssignRole}>
                            <div className="grid grid-cols-1 gap-6">
                                {/* ComboBox de Usuarios */}
                                <div>
                                    <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                                        Seleccionar Usuario
                                    </label>
                                    <select
                                        id="user"
                                        name="user"
                                        value={userId}
                                        onChange={(e) => handleUserSelect(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Seleccione un usuario</option>
                                        {users.map((user) => (
                                            <option key={user._id} value={user._id}>
                                                {user.name} {user.surname} - ({user.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* ComboBox de Roles */}
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                        Seleccionar Rol
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={selectedRole}
                                        onChange={(e) => handleRoleChange(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Seleccione un rol</option>
                                        <option value="BOSS">Jefe</option>
                                        <option value="EMPLOYEE">Empleado</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500 focus:ring focus:ring-indigo-500"
                            >
                                Asignar Rol
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer className="fixed bottom-0 left-0 right-0 h-16" />
        </div>
    );
};

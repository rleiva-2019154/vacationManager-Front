import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTeams } from '../../hooks/useTeams'; // Hook para obtener los equipos
import { useGetAllUsers } from '../../hooks/useGetAllUsers'; // Hook para obtener todos los usuarios
import { addMemberToTeam } from '../../services/api'; // Función API para agregar miembros a un equipo

export const AddMember = () => {
    const { teams, loading: loadingTeams, error: errorTeams } = useTeams(); // Obtener todos los equipos
    const { users, loading: loadingUsers, error: errorUsers } = useGetAllUsers(); // Obtener todos los usuarios
    const [selectedTeam, setSelectedTeam] = useState('');
    const [newMember, setNewMember] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleAddMember = async () => {
        if (!selectedTeam || selectedMembers.length === 0) {
            toast.error('Selecciona un equipo y al menos un miembro para añadir.');
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            if (!token) {
                throw new Error('Token no encontrado');
            }

            await addMemberToTeam(selectedTeam, selectedMembers, token);
            toast.success('Miembro(s) añadido(s) correctamente al equipo.');
            setSelectedMembers([]); // Limpiar la selección de miembros
            setSelectedTeam(''); // Limpiar la selección del equipo
        } catch (error) {
            toast.error('Error al añadir miembro(s) al equipo: ' + error.message);
        }
    };

    const handleSelectMember = () => {
        if (newMember && !selectedMembers.includes(newMember)) {
            setSelectedMembers((prev) => [...prev, newMember]); // Añadir nuevo miembro
            setNewMember(''); // Limpiar el campo de selección de miembros
        } else {
            toast.error('Selecciona un miembro válido o ya está en la lista.');
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Añadir Miembro al Equipo</h3>
            {loadingTeams && <p>Cargando equipos...</p>}
            {errorTeams && <p className="text-red-500">{errorTeams}</p>}
            {loadingUsers && <p>Cargando usuarios...</p>}
            {errorUsers && <p className="text-red-500">{errorUsers}</p>}

            {/* Selección del equipo */}
            <select
                className="w-full p-2 mb-4 border rounded"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
            >
                <option value="">Selecciona un equipo</option>
                {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                        {team.name}
                    </option>
                ))}
            </select>

            {/* Selección de miembros */}
            <select
                className="w-full p-2 mb-4 border rounded"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
            >
                <option value="">Selecciona un miembro</option>
                {users.filter(user => user.role === 'EMPLOYEE').map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.name} {user.surname} ({user.email})
                    </option>
                ))}
            </select>

            <button
                type="button"
                onClick={handleSelectMember}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
            >
                Añadir Miembro
            </button>

            {/* Mostrar miembros seleccionados */}
            <div className="mb-4">
                <h4 className="font-semibold">Miembros Seleccionados:</h4>
                <ul>
                    {selectedMembers.map((memberId) => {
                        const member = users.find((user) => user._id === memberId);
                        return member ? (
                            <li key={memberId} className="flex justify-between border-b py-1">
                                <span>{member.name} {member.surname}</span>
                                <button
                                    onClick={() => setSelectedMembers((prev) => prev.filter((id) => id !== memberId))}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ) : null;
                    })}
                </ul>
            </div>

            {/* Botón para enviar la solicitud de añadir miembros */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddMember}
            >
                Guardar Cambios
            </button>
        </div>
    );
};

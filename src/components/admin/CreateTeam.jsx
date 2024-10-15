import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useGetAllUsers } from '../../hooks/useGetAllUsers'; // Hook para obtener todos los usuarios
import { useTeams } from '../../hooks/useTeams'; // Hook para obtener los equipos
import { createTeam } from '../../services/api'; // Función API para crear equipos

export const CreateTeam = () => {
    const { users, loading, error } = useGetAllUsers(); // Obtener todos los usuarios
    const { teams } = useTeams(); // Obtener todos los equipos y sus miembros
    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBoss, setSelectedBoss] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [project, setProject] = useState('');
    const [newMember, setNewMember] = useState(''); // Para almacenar el miembro que se selecciona

    // Obtener los IDs de los miembros que ya están en algún equipo
    const assignedMembers = teams.reduce((acc, team) => {
        return [...acc, ...team.members.map(member => member._id)]; // Mapear solo los IDs de los miembros
    }, []);

    // Filtrar usuarios no asignados a ningún equipo
    const availableMembers = users.filter(user => !assignedMembers.includes(user._id) && user.role === 'EMPLOYEE');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!teamName || !description || !selectedBoss || selectedMembers.length === 0 || !project) {
            toast.error('Todos los campos son obligatorios.');
            return;
        }

        try {
            const token = localStorage.getItem("userToken"); // Asegúrate de tener el token del usuario
            await createTeam({ name: teamName, description, boss: selectedBoss, members: selectedMembers, project }, token);
            toast.success('Equipo creado exitosamente');
            setTeamName('');
            setDescription('');
            setSelectedBoss('');
            setSelectedMembers([]);
            setProject('');
        } catch (error) {
            toast.error('Error al crear equipo: ' + error.message);
        }
    };

    const handleAddMember = () => {
        if (newMember && !selectedMembers.includes(newMember)) {
            setSelectedMembers((prev) => [...prev, newMember]); // Añadir el nuevo miembro a la lista
            setNewMember(''); // Limpiar el campo de selección
        } else {
            toast.error('Selecciona un miembro válido o ya está en la lista.');
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Crear Nuevo Equipo</h3>
            {loading && <p>Cargando usuarios...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre del equipo */}
                <input
                    type="text"
                    placeholder="Nombre del equipo"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />

                {/* Descripción */}
                <textarea
                    placeholder="Descripción del equipo"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />

                {/* Seleccionar Jefe */}
                <select
                    value={selectedBoss}
                    onChange={(e) => setSelectedBoss(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                >
                    <option value="">Seleccionar Jefe</option>
                    {users.filter(user => user.role === 'BOSS').map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name} {user.surname} ({user.email})
                        </option>
                    ))}
                </select>

                {/* Seleccionar Miembros */}
                <select
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                >
                    <option value="">Seleccionar Miembro</option>
                    {availableMembers.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name} {user.surname} ({user.email})
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={handleAddMember}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
                >
                    Añadir Miembro
                </button>

                {/* Mostrar miembros seleccionados */}
                <div className="mb-4">
                    <h4 className="font-semibold">Miembros Seleccionados:</h4>
                    <ul>
                        {selectedMembers.map(memberId => {
                            const member = users.find(user => user._id === memberId);
                            return member ? (
                                <li key={memberId} className="flex justify-between border-b py-1">
                                    <span>{member.name} {member.surname}</span>
                                    <button
                                        onClick={() => setSelectedMembers(prev => prev.filter(id => id !== memberId))}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>

                {/* Campo para el Proyecto */}
                <input
                    type="text"
                    placeholder="Proyecto en el que trabajan"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />

                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Crear</button>
            </form>
        </div>
    );
};

import { useState, useEffect } from 'react';
import { useTeams } from '../../hooks/useTeams';  // Hook para obtener equipos
import { useRemoveMembers } from '../../hooks/useRemoveMembers';  // Hook para eliminar miembros
import { toast } from 'react-hot-toast';

export const RemoveMember = () => {
    const { teams, loading: loadingTeams, error: errorTeams } = useTeams();  // Obtener equipos
    const { removeMemberFromTeam, loading: loadingRemove, error: errorRemove } = useRemoveMembers();  // Hook para eliminar miembros

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedMember, setSelectedMember] = useState('');

    // Cargar los miembros del equipo seleccionado
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        if (selectedTeam) {
            setTeamMembers(selectedTeam.members);  // Obtener miembros del equipo seleccionado
        }
    }, [selectedTeam]);

    const handleRemoveMember = async () => {
        if (!selectedMember) {
            toast.error('Debe seleccionar un miembro para eliminar');
            return;
        }
    
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            if (!token) throw new Error('Token no encontrado');
    
            const response = await removeMemberFromTeam(selectedTeam._id, selectedMember, token);
            if (response) {
                toast.success('Miembro eliminado correctamente');
            }
            setSelectedMember('');  // Resetear la selección de miembro
        } catch (error) {
            toast.error('Error al eliminar el miembro: ' + error.message);
        }
    };
    

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Eliminar Miembro del Equipo</h3>

            {loadingTeams && <p>Cargando equipos...</p>}
            {errorTeams && <p className="text-red-500">{errorTeams}</p>}
            <select
                className="w-full p-2 mb-4 border rounded"
                value={selectedTeam ? selectedTeam._id : ''}
                onChange={(e) => {
                    const team = teams.find(t => t._id === e.target.value);
                    setSelectedTeam(team);
                    setSelectedMember('');  // Resetear selección de miembro
                }}
            >
                <option value="">Selecciona un equipo</option>
                {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                        {team.name}
                    </option>
                ))}
            </select>

            {selectedTeam && (
                <>
                    <select
                        className="w-full p-2 mb-4 border rounded"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                    >
                        <option value="">Selecciona un miembro para eliminar</option>
                        {teamMembers.map((member) => (
                            <option key={member._id} value={member._id}>
                                {member.name} ({member.email})
                            </option>
                        ))}
                    </select>

                    <button
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                        onClick={handleRemoveMember}
                        disabled={loadingRemove}
                    >
                        {loadingRemove ? 'Eliminando...' : 'Eliminar'}
                    </button>

                    {errorRemove && <p className="text-red-500 mt-2">{errorRemove}</p>}
                </>
            )}
        </div>
    );
};

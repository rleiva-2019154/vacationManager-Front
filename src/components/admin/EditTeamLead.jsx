import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useTeams } from '../../hooks/useTeams'; // Hook para obtener los equipos
import { useGetAllUsers } from '../../hooks/useGetAllUsers'; // Hook para obtener los jefes
import { editTeamLead } from '../../services/api'; // Función API para editar jefe

export const EditTeamLead = () => {
    const { teams, loading: loadingTeams, error: errorTeams } = useTeams(); // Obtener equipos
    const { users: bosses, loading: loadingBosses, error: errorBosses } = useGetAllUsers(); // Obtener jefes
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [newBoss, setNewBoss] = useState('');

    useEffect(() => {
        if (selectedTeam) {
            setNewBoss(selectedTeam.boss._id); // Establecer el jefe actual del equipo
        }
    }, [selectedTeam]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedTeam || !newBoss) {
            toast.error('Todos los campos son obligatorios.');
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            if (!token) throw new Error('Token no encontrado');

            await editTeamLead(selectedTeam._id, newBoss, token);  // Llamada a la API
            toast.success('Jefe del equipo actualizado exitosamente');
            setSelectedTeam(null);  // Resetear selección
        } catch (error) {
            toast.error('Error al actualizar jefe: ' + error.message);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Editar Jefe del Equipo</h3>

            {loadingTeams && <p>Cargando equipos...</p>}
            {errorTeams && <p className="text-red-500">{errorTeams}</p>}
            <select
                className="w-full p-2 mb-4 border rounded"
                value={selectedTeam ? selectedTeam._id : ''}
                onChange={(e) => {
                    const team = teams.find(t => t._id === e.target.value);
                    setSelectedTeam(team);
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
                    <p className="mb-4">Jefe actual: {selectedTeam.boss.name}</p>

                    {loadingBosses && <p>Cargando jefes...</p>}
                    {errorBosses && <p className="text-red-500">{errorBosses}</p>}
                    <select
                        className="w-full p-2 mb-4 border rounded"
                        value={newBoss}
                        onChange={(e) => setNewBoss(e.target.value)}
                    >
                        <option value="">Selecciona un nuevo jefe</option>
                        {bosses
                            .filter(user => user.role === 'BOSS')
                            .map(boss => (
                                <option key={boss._id} value={boss._id}>
                                    {boss.name} ({boss.email})
                                </option>
                            ))}
                    </select>

                    <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                        onClick={handleSubmit}
                    >
                        Guardar cambios
                    </button>
                </>
            )}
        </div>
    );
};

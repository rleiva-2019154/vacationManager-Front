import { useState, useEffect } from 'react';
import { useTeams } from '../../hooks/useTeams'; // Hook para obtener los equipos
import { useDeleteTeam } from '../../hooks/useDeleteTeam'; // Hook para eliminar equipos
import { toast } from 'react-hot-toast';

export const DeleteTeam = () => {
    const { teams, error: errorTeams, loading: loadingTeams } = useTeams(); // Obtener todos los equipos
    const { deleteTeam, getTeamDetails, error: errorDelete, loading: loadingDelete } = useDeleteTeam(); // Hook para eliminar equipo
    const [selectedTeam, setSelectedTeam] = useState(''); // ID del equipo seleccionado
    const [teamDetails, setTeamDetails] = useState(null); // Detalles del equipo

    // Obtener detalles del equipo cuando se selecciona
    useEffect(() => {
        const fetchDetails = async () => {
            if (selectedTeam) {
                const token = JSON.parse(localStorage.getItem('user'))?.token;
                if (!token) {
                    toast.error('Token no encontrado');
                    return;
                }
                const details = await getTeamDetails(selectedTeam, token); // Obtener detalles
                setTeamDetails(details);
            } else {
                setTeamDetails(null); // Limpiar detalles si no hay equipo seleccionado
            }
        };
        fetchDetails();
    }, [selectedTeam]);

    // Eliminar equipo
    const handleDelete = async () => {
        if (!selectedTeam) {
            toast.error('Por favor, selecciona un equipo para eliminar');
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            if (!token) throw new Error('Token no encontrado');

            await deleteTeam(selectedTeam, token); // Eliminar el equipo
            toast.success('Equipo eliminado correctamente');
            setSelectedTeam(''); // Resetear selección después de eliminar
            setTeamDetails(null); // Limpiar detalles
        } catch (error) {
            toast.error('Error al eliminar el equipo: ' + error.message);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Eliminar Equipo</h3>
            {loadingTeams && <p>Cargando equipos...</p>}
            {errorTeams && <p className="text-red-500">{errorTeams}</p>}
            
            {/* Combo box para seleccionar equipo */}
            <select
                className="w-full p-2 mb-4 border rounded"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
            >
                <option value="">Selecciona un equipo para eliminar</option>
                {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                        {team.name}
                    </option>
                ))}
            </select>

            {/* Mostrar detalles del equipo */}
            {teamDetails && (
                <div className="border p-4 mb-4 rounded-md">
                    <h4 className="font-semibold">Detalles del Equipo</h4>
                    <p><strong>Nombre:</strong> {teamDetails.name}</p>
                    <p><strong>Proyecto:</strong> {teamDetails.project}</p>
                    <p><strong>Descripción:</strong> {teamDetails.description}</p>
                    <p><strong>Jefe:</strong> {teamDetails.boss?.name} ({teamDetails.boss?.email})</p>
                    <h4 className="font-semibold mt-4">Miembros:</h4>
                    <ul>
                        {teamDetails.members.map(member => (
                            <li key={member._id}>
                                {member.name} ({member.email})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Botón de eliminar */}
            <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
                disabled={loadingDelete}
            >
                {loadingDelete ? 'Eliminando...' : 'Eliminar'}
            </button>
            
            {errorDelete && <p className="text-red-500 mt-2">{errorDelete}</p>}
        </div>
    );
};

import { useTeams } from '../../hooks/useTeams';  // Importar el hook
import { useState } from 'react';
import { TeamDetails } from './TeamDetails';  // Importar el nuevo componente para ver detalles

export const ListTeams = () => {
    const { teams, loading, error } = useTeams();  // Usar el hook para obtener los equipos
    const [selectedTeam, setSelectedTeam] = useState(null);  // Guardar el equipo seleccionado

    if (loading) return <p>Cargando equipos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Lista de Equipos</h3>
            <ul>
                {teams.map((team) => (
                    <li key={team._id} className="mb-4">
                        <div
                            className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
                            onClick={() => 
                                setSelectedTeam(selectedTeam === team._id ? null : team._id)  // Alternar la visibilidad
                            }  
                        >
                            <h4 className="text-lg font-semibold">{team.name}</h4>
                            <p><strong>Descripción:</strong> {team.description}</p>
                            <p><strong>Proyecto:</strong> {team.project}</p>
                            <p><strong>Jefe:</strong> {team.boss.name} ({team.boss.email})</p>
                        </div>
                        {selectedTeam === team._id && <TeamDetails teamId={team._id} />}  {/* Mostrar los detalles del equipo */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

import { useTeamDetails } from '../../hooks/useTeamDetails';  // Hook para obtener los detalles
import PropTypes from 'prop-types'; // Importar PropTypes

export const TeamDetails = ({ teamId }) => {
    const { teamDetails, loading, error } = useTeamDetails(teamId);  // Obtener detalles del equipo

    if (loading) return <p>Cargando detalles del equipo...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="mt-4 p-4 bg-gray-50 shadow rounded">
            <h3 className="text-xl font-bold">Detalles del equipo</h3>
            {teamDetails ? (
                <>
                    <p><strong>Jefe:</strong> {teamDetails.boss.name} ({teamDetails.boss.email}) - Días disponibles: {teamDetails.boss.vacationDaysAvailable}</p>
                    <p><strong>Proyecto:</strong> {teamDetails.project}</p>
                    <p><strong>Descripción:</strong> {teamDetails.description}</p>

                    <h4 className="mt-4 font-semibold">Miembros y días de vacaciones:</h4>
                    <ul className="list-disc ml-5">
                        {teamDetails.members.map((member) => (
                            <li key={member._id}>
                                {member.name} ({member.email}) - Días disponibles: {member.vacationDaysAvailable}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No hay detalles disponibles para este equipo.</p>
            )}
        </div>
    );
};

// Agregar PropTypes para la validación
TeamDetails.propTypes = {
    teamId: PropTypes.string.isRequired, // Validar que teamId sea un string requerido
};

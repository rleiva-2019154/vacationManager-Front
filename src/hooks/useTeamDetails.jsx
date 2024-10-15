import { useState, useEffect } from 'react';
import { getTeamMembersWithVacationDays } from '../services/api';  // Función API

export const useTeamDetails = (teamId) => {
    const [teamDetails, setTeamDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                const response = await getTeamMembersWithVacationDays(teamId);  // Llamar a la API
                setTeamDetails(response.team);  // Cambiar para acceder a team
            } catch (e) {
                setError('Error al obtener los detalles del equipo: ' + e.message);
            } finally {
                setLoading(false);
            }
        };

        if (teamId) {
            fetchTeamDetails();
        }
    }, [teamId]);

    return { teamDetails, loading, error };
};

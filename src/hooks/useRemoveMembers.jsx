import { useState } from 'react';
import { removeMemberFromTeamAPI } from '../services/api';  // API para eliminar miembros

export const useRemoveMembers = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const removeMemberFromTeam = async (teamId, userId, token) => {
        setLoading(true);
        setError(null);

        try {
            const response = await removeMemberFromTeamAPI(teamId, userId, token);  // Llamada a la API
            return response.team;  // Devolver equipo actualizado si es necesario
        } catch (e) {
            setError('Error al eliminar el miembro: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    return { removeMemberFromTeam, error, loading };
};

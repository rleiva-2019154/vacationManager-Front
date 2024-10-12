import { useState } from 'react';
import { removeMembersFromTeamAPI } from '../services/api';  // API para eliminar miembros

export const useRemoveMembers = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const removeMembersFromTeam = async (teamId, userIds, token) => {
        setLoading(true);
        try {
            const response = await removeMembersFromTeamAPI(teamId, userIds, token);  // Llamada a la API
            return response;  // Devolver la respuesta para manejo adicional si es necesario
        } catch (e) {
            setError('Error al eliminar miembros del equipo: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    return { removeMembersFromTeam, error, loading };
};

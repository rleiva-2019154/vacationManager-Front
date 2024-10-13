import { useState } from 'react';
import { deleteTeamAPI, getTeamDetailsAPI } from '../services/api'; // Función API para eliminar el equipo y obtener detalles

export const useDeleteTeam = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteTeam = async (teamId, token) => {
        setLoading(true);
        try {
            await deleteTeamAPI(teamId, token); // Llamada a la API para eliminar
        } catch (e) {
            setError('Error al eliminar el equipo: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    const getTeamDetails = async (teamId, token) => {
        setLoading(true);
        try {
            const response = await getTeamDetailsAPI(teamId, token); // Llamada a la API para obtener detalles
            return response;
        } catch (e) {
            setError('Error al obtener detalles del equipo: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    return { deleteTeam, getTeamDetails, error, loading };
};

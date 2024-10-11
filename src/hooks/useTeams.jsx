import { useState, useEffect } from 'react';
import { getTeams, createTeam } from '../services/api';

export const useTeams = () => {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getTeams();
                setTeams(response.teams);
            } catch (e) {
                setError('Error al obtener equipos' + e);
            }
        };
        fetchTeams();
    }, []);

    // Función para agregar un nuevo equipo
    const addTeam = async () => {
        try {
            const newTeam = prompt("Ingrese el nombre del nuevo equipo:");
            if (newTeam) {
                const response = await createTeam({ name: newTeam });
                setTeams([...teams, response.team]);
            }
        } catch (e) {
            setError('Error al crear el equipo' + e);
        }
    };

    return { teams, addTeam, error };
};

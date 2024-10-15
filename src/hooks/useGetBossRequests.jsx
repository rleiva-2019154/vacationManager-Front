import { useState, useEffect } from 'react';
import { getBossVacationRequests } from '../services/api'; // Asegúrate de definir la función en tu archivo de servicios

export const useGetBossRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getBossVacationRequests();
                if (response.error) {
                    setError(response.message);
                } else {
                    setRequests(response.vacationRequests);
                }
            } catch (e) {
                setError('Error al obtener las solicitudes.' + e);
            }
            setLoading(false);
        };

        fetchRequests();
    }, []);

    return { requests, loading, error };
};

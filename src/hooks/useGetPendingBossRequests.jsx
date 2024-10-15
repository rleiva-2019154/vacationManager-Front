import { useEffect, useState } from 'react';
import { getPendingBossRequestsAPI } from '../services/api'; // Asegúrate de que la ruta es correcta

export const useGetPendingBossRequests = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const response = await getPendingBossRequestsAPI();
                if (response.error) {
                    setError(response.message);
                } else {
                    setPendingRequests(response.pendingRequests || []);
                }
            } catch (e) {
                setError("Error al obtener las solicitudes pendientes." + e);
            }
            setLoading(false);
        };

        fetchPendingRequests();
    }, []);

    return { pendingRequests, loading, error };
};

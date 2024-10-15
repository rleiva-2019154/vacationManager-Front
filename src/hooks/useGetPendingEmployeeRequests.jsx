import { useEffect, useState } from 'react';
import { getPendingEmployeeRequestsAPI } from '../services/api'; // Asegúrate de que la ruta es correcta

export const useGetPendingEmployeeRequests = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const response = await getPendingEmployeeRequestsAPI();
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

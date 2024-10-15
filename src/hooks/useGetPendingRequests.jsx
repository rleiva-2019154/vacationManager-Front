import { useEffect, useState } from "react";
import { getPendingRequests } from "../services/api";  // Importamos la API

export const useGetPendingRequests = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const data = await getPendingRequests();
                if (data.error) {
                    setError(data.message);
                } else {
                    setPendingRequests(data.requests);
                }
            } catch (e) {
                setError("Error al obtener las solicitudes pendientes" + e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPendingRequests();
    }, []);

    return { pendingRequests, isLoading, error };
};

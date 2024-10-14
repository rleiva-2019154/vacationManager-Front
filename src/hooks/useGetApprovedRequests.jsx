import { useEffect, useState } from "react";
import { getApprovedRequests } from "../services/api";  // Importamos la API

export const useGetApprovedRequests = () => {
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApprovedRequests = async () => {
            try {
                const data = await getApprovedRequests();
                if (data.error) {
                    setError(data.message);
                } else {
                    setApprovedRequests(data.requests);
                }
            } catch (e) {
                setError("Error al obtener las solicitudes aprobadas" + e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchApprovedRequests();
    }, []);

    return { approvedRequests, isLoading, error };
};

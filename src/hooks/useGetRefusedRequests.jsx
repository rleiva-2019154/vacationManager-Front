import { useState, useEffect } from 'react';
import { getRefusedRequestsAPI } from '../services/api'; // Importar la función API

export const useGetRefusedRequests = () => {
    const [refusedRequests, setRefusedRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRefusedRequests = async () => {
            const result = await getRefusedRequestsAPI();
            if (result.error) {
                setError(result.message);
            } else {
                setRefusedRequests(result.requests || []);
            }
            setIsLoading(false);
        };

        fetchRefusedRequests();
    }, []);

    return { refusedRequests, isLoading, error };
};

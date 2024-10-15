import { useEffect, useState } from 'react';
import { getRejectedRequestsEmployeesAPI } from '../services/api'; // Asegúrate de importar la función de la API

export const useGetRejectedRequestsEmployees = () => {
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRejectedRequests = async () => {
            try {
                const response = await getRejectedRequestsEmployeesAPI();
                if (response.error) {
                    setError(response.message);
                } else {
                    setRejectedRequests(response.requests || []); // Asegúrate de usar el nombre correcto aquí
                }
            } catch (e) {
                setError("Error al obtener las solicitudes rechazadas: " + e.message); // Mejora el mensaje de error
            }
            setLoading(false);
        };

        fetchRejectedRequests();
    }, []);

    return { rejectedRequests, loading, error };
};

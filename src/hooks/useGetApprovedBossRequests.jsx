import { useEffect, useState } from "react";
import { getApprovedBossRequestsAPI } from "../services/api"; // Asegúrate de que este API esté correctamente implementada

export const useGetApprovedBossRequests = () => {
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApprovedRequests = async () => {
            try {
                const response = await getApprovedBossRequestsAPI();
                if (response.error) {
                    setError(response.message);
                } else {
                    console.log("Datos recibidos:", response.approvedRequests); // Verifica si los datos llegan correctamente
                    setApprovedRequests(response.approvedRequests || []);
                }
            } catch (e) {
                console.error("Error fetching approved boss requests:", e);
                setError("Hubo un problema al cargar las solicitudes.");
            }
            setLoading(false);
        };

        fetchApprovedRequests();
    }, []);

    return { approvedRequests, loading, error };
};

import { useEffect, useState } from "react";
import { getRequests as getRequestsVacations } from "../services";
import toast from "react-hot-toast";

export const useGetRequests = () => {
    const [requestsVacations, setRequestVacations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getRequestsVacations();
                console.log("Datos de solicitudes:", data);

                if (data.error) {
                    toast.error(data.message || "Existió un error al listar las solicitudes");
                    setError(data.message || "Existió un error al listar las solicitudes");
                } else {
                    setRequestVacations(data.vacationRequests);  // Asegúrate de acceder a `vacationRequests`
                    toast.success("Solicitudes realizadas...");
                }
            } catch (e) {
                toast.error("No es posible conectar con el servidor" + e);
                setError("No se puede conectar con el servidor" + e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    return {
        requestsVacations,
        isLoading,
        error,
    };
};

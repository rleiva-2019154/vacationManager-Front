import { useState, useEffect } from "react";
import { getVacationDaysAvailableAPI } from "../services";

export const useGetVacationDaysAvailable = () => {
    const [vacationDaysAvailable, setVacationDaysAvailable] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVacationDays = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getVacationDaysAvailableAPI();
                setVacationDaysAvailable(data.vacationDaysAvailable);
            } catch (err) {
                setError(err.message || "Error al obtener los días de vacaciones.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchVacationDays();
    }, []);

    return { vacationDaysAvailable, isLoading, error };
};

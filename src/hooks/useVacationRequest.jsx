import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { requestVacationAPI } from '../services/api'; // Función que envía la solicitud de vacaciones al backend

export const useVacationRequest = () => {
    const [isLoading, setIsLoading] = useState(false);

    const requestVacation = async (vacationData) => {
        setIsLoading(true);
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            await requestVacationAPI(vacationData, token);
            toast.success('Solicitud de vacaciones enviada correctamente.');
        } catch (e) {
            toast.error('Error al enviar la solicitud de vacaciones.' + e);
        } finally {
            setIsLoading(false);
        }
    };

    return { requestVacation, isLoading };
};

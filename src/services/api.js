import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://vacation-manager-back.vercel.app/vacationManager/v1',
    timeout: 5000
})

export const login = async (data) => {
    try {
        const response = await apiClient.post("/auth/login", data)

        return response.data
    } catch (e) {
        const errorResponse = e.response?.data;

        if (Array.isArray(errorResponse?.errors)) {
            const errorMessage = errorResponse.errors[0]?.msg || 'Error al iniciar sesion';
            return {
                error: true,
                message: errorMessage,
            }
        }

        const errorMessage = errorResponse?.error || 'Falló el iniciar sesión'

        return {
            error: true,
            message: errorMessage,
        }
    }
}

export const register = async (data) => {
    try {

        const response = await apiClient.post("/auth/register", data, {
            headers: {
                "Content-Type": "application/json",
            }
        })

        return response.data;

    } catch (e) {
        const errorResponse = e.response?.data;

        if (Array.isArray(errorResponse?.errors)) {
            const errorMessage = errorResponse.errors[0]?.msg || 'Error al registrar usuario';
            return {
                error: true,
                message: errorMessage,
            }
        }

        const errorMessage = errorResponse?.error || 'Falló el registro de usuario'

        return {
            error: true,
            message: errorMessage,
        }
    }
}

export const getRequests = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.uid || !user.token) {
            throw new Error('No se encontró el UID o el token del usuario en localStorage');
        }

        // Asegúrate de que envías el token en los headers
        const response = await apiClient.get(`/vacations/getUserVacationRequests/${user.uid}`, {
            headers: {
                Authorization: user.token,  // Enviar el token de autorización
            },
        });

        return response.data;
    } catch (e) {
        const errorResponse = e.response?.data;

        if (Array.isArray(errorResponse?.errors)) {
            const errorMessage = errorResponse.errors[0]?.msg || 'Error al obtener las solicitudes';
            return {
                error: true,
                message: errorMessage,
            };
        }

        const errorMessage = errorResponse?.error || 'Falló al obtener las solicitudes';

        return {
            error: true,
            message: errorMessage,
        };
    }
};
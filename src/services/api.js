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
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

export const getUsers = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
            throw new Error('Token de usuario no encontrado');
        }

        const response = await apiClient.get("/auth/getUsers", {
            headers: {
                Authorization: user.token, 
            },
        });

        return response.data;
    } catch (e) {
        const errorMessage = e.response?.data?.message || 'Error al obtener los usuarios';
        throw new Error(errorMessage);
    }
};

export const assignRole = async (userId, role) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            throw new Error('Token de usuario no encontrado');
        }

        const response = await apiClient.post(
            "/auth/assignRole",
            { userId, role },
            {
                headers: {
                    Authorization: user.token,
                },
            }
        );

        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.error || 'Error al asignar el rol',
        };
    }
};

export const createTeam = async (teamData) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            throw new Error('Token de usuario no encontrado');
        }

        const response = await apiClient.post(
            "/teams/createTeam",
            teamData,
            {
                headers: {
                    Authorization: user.token,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.message || 'Error al crear el equipo',
        };
    }
};


export const getTeams = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            throw new Error('Token de usuario no encontrado');
        }

        const response = await apiClient.get(
            "/teams/getTeams",
            {
                headers: {
                    Authorization: user.token,
                },
            }
        );

        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.message || 'Error al obtener equipos',
        };
    }
};

export const getTeamMembersWithVacationDays = async (teamId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
            throw new Error('Token de usuario no encontrado');
        }

        const response = await apiClient.get(`/teams/getTeamMembersWithVacationDays/${teamId}`, {
            headers: {
                Authorization: user.token,
            },
        });

        return response.data;
    } catch (e) {
        throw new Error(e.response?.data?.message || 'Error al obtener los miembros del equipo');
    }
};

export const editTeam = async (teamId, teamData, token) => {
    try {
        const response = await apiClient.put(`/teams/editTeam/${teamId}`, teamData, {
            headers: {
                Authorization: token,  // Asegúrate de enviar solo el token, sin "Bearer"
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al editar el equipo');
    }
};

export const addMemberToTeam = async (teamId, memberIds, token) => {
    try {
        const response = await apiClient.put(`/teams/addMemberToTeam/${teamId}`, { userIds: memberIds }, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al añadir miembro(s) al equipo');
    }
};

export const editTeamLead = async (teamId, bossId, token) => {
    try {
        const response = await apiClient.put(`/teams/editTeamBoss/${teamId}`, { boss: bossId }, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al actualizar jefe');
    }
};

export const removeMemberFromTeamAPI = async (teamId, userId, token) => {
    try {
        const response = await apiClient.delete(`/teams/removeMemberFromTeam/${teamId}`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            data: { userId }  // Enviar el userId en el cuerpo de la solicitud DELETE
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al eliminar el miembro');
    }
};

export const deleteTeamAPI = async (teamId, token) => {
    try {
        const response = await apiClient.delete(`/teams/deleteTeam/${teamId}`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Devolver la respuesta si todo sale bien
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al eliminar el equipo');
    }
};

export const getTeamDetailsAPI = async (teamId, token) => {
    try {
        const response = await apiClient.get(`/teams/getTeamById/${teamId}`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        return response.data.team; // Devolver los detalles del equipo
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener detalles del equipo');
    }
};

export const addHolidayAPI = async (holidayData, token) => {
    try {
        const response = await apiClient.post(`holidays/addHoliday`, holidayData, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al agregar festivo');
    }
};

export const getHolidaysAPI = async (token) => {
    try {
        const response = await apiClient.get(`/holidays/getHolidays`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener festivos');
    }
};

export const deleteHolidayAPI = async (holidayId, token) => {
    try {
        const response = await apiClient.delete(`/holidays/deleteHoliday/${holidayId}`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al eliminar el festivo');
    }
};

export const updateHolidayAPI = async (holidayId, data, token) => {
    try {
        const response = await apiClient.put(`/holidays/updateHoliday/${holidayId}`, data, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al actualizar el festivo');
    }
};

export const requestVacationAPI = async (vacationData) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            throw new Error('Token de usuario no encontrado');
        }

        const response = await apiClient.post('/vacations/addVacations', vacationData, {
            headers: {
                Authorization: user.token,
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Retorna los datos de la respuesta
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al solicitar vacaciones');
    }
};

export const getRefusedRequestsAPI = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user || !user.token) {
            throw new Error('Token de usuario no encontrado');
        }

        const response = await apiClient.get(`/vacations/getRefusedRequests/${user.uid}`, {
            headers: {
                Authorization: user.token,  // Enviar el token de autorización
            },
        });

        return response.data; // Retornar los datos de la respuesta
    } catch (error) {
        return {
            error: true,
            message: error.response?.data?.message || 'Error al obtener las solicitudes rechazadas',
        };
    }
};

export const getPendingRequests = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.uid || !user.token) {
            throw new Error('No se encontró el UID o el token del usuario en localStorage');
        }

        const response = await apiClient.get(`/vacations/getPendingRequests/${user.uid}`, {
            headers: {
                Authorization: user.token,  // Enviar el token de autorización
            },
        });

        return response.data;
    } catch (e) {
        const errorResponse = e.response?.data;

        if (Array.isArray(errorResponse?.errors)) {
            const errorMessage = errorResponse.errors[0]?.msg || 'Error al obtener las solicitudes pendientes';
            return {
                error: true,
                message: errorMessage,
            };
        }

        const errorMessage = errorResponse?.error || 'Falló al obtener las solicitudes pendientes';

        return {
            error: true,
            message: errorMessage,
        };
    }
};

export const getApprovedRequests = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.uid || !user.token) {
            throw new Error('No se encontró el UID o el token del usuario en localStorage');
        }

        const response = await apiClient.get(`/vacations/getApprovedRequests/${user.uid}`, {
            headers: {
                Authorization: user.token,  // Enviar el token de autorización
            },
        });

        return response.data;
    } catch (e) {
        const errorResponse = e.response?.data;

        if (Array.isArray(errorResponse?.errors)) {
            const errorMessage = errorResponse.errors[0]?.msg || 'Error al obtener las solicitudes aprobadas';
            return {
                error: true,
                message: errorMessage,
            };
        }

        const errorMessage = errorResponse?.error || 'Falló al obtener las solicitudes aprobadas';

        return {
            error: true,
            message: errorMessage,
        };
    }
};

export const getVacationDaysAvailableAPI = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token || !user.uid) {
            throw new Error("No se encontró el UID o el token del usuario.");
        }

        const response = await apiClient.get(`/vacations/getVacationDaysAviable/${user.uid}`, {
            headers: {
                Authorization: user.token,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al obtener los días de vacaciones disponibles.");
    }
};

export const getUserTeams = async (uid) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
            throw new Error('Token de usuario no encontrado');
        }

        const response = await apiClient.get(`/teams/getUserTeams/${uid}`, {
            headers: {
                Authorization: user.token,  // Enviar el token de autorización
            },
        });

        return response.data; // Retornar los datos de la respuesta
    } catch (error) {
        return {
            error: true,
            message: error.response?.data?.message || 'Error al obtener los equipos del usuario',
        };
    }
};

export const getBossVacationRequests = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.token) {
            throw new Error('No se encontró el token del usuario');
        }

        const response = await apiClient.get('/vacations/getBossVacationRequests', {
            headers: {
                Authorization: user.token, // Asegúrate de enviar el token
            },
        });

        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error.response?.data?.message || 'Error al obtener las solicitudes de los jefes',
        };
    }
};

export const getApprovedBossRequestsAPI = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
            throw new Error("No se encontró el token del usuario");
        }

        const response = await apiClient.get("vacations/getApprovedBossRequests", {
            headers: {
                Authorization: user.token,  // Asegúrate de enviar el token de autorización
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error al obtener las solicitudes aprobadas del boss:", error);
        return {
            error: true,
            message: error.response?.data?.message || "Error al obtener las solicitudes aprobadas",
        };
    }
};


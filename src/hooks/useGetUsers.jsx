import { useState, useEffect } from 'react';
import { getUsers } from '../services/api'; 

export const useGetUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                // Filtrar solo los usuarios sin rol asignado
                const unassignedUsers = response.users.filter(user => user.role === 'UNASSIGNED');
                setUsers(unassignedUsers);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, setUsers, loading, error };  // Añadimos setUsers para poder actualizar la lista
};

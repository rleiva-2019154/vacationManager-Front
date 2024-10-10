import { useState, useEffect } from "react";
import { getUsers, assignRole } from "../services/api";

export const useAssignRole = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            if (response.error) {
                setError(response.message);
            } else {
                setUsers(response.users);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    const handleAssignRole = async (userId, role) => {
        const response = await assignRole(userId, role);
        if (response.error) {
            setError(response.message);
        } else {
            setUsers((prev) =>
                prev.map((user) => (user._id === userId ? { ...user, role } : user))
            );
        }
    };

    return {
        users,
        loading,
        error,
        handleAssignRole,
    };
};

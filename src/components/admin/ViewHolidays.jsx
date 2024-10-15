import { useEffect, useState } from 'react';
import { getHolidaysAPI } from '../../services/api';  // Función API para obtener festivos

export const ViewHolidays = () => {
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('user'))?.token;
                const data = await getHolidaysAPI(token);
                
                // Como el backend devuelve un array directo, lo asignamos directamente a holidays
                setHolidays(data);
            } catch (error) {
                console.error("Error fetching holidays:", error);
            }
        };

        fetchHolidays();
    }, []);

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Lista de Festivos</h3>
            {holidays.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {holidays.map(holiday => (
                        <li key={holiday._id} className="bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition duration-300">
                            <h4 className="text-lg font-semibold text-blue-800 mb-2">{holiday.name}</h4>
                            <p className="text-blue-600">
                                <i className="far fa-calendar-alt mr-2"></i>
                                {/* Mostrar la fecha correctamente con UTC */}
                                {new Date(holiday.date).toLocaleDateString('es-ES', {
                                    timeZone: 'UTC',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center text-gray-500">No hay festivos disponibles.</div>
            )}
        </div>
    );
};
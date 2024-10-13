import { useEffect, useState } from 'react';
import { getHolidaysAPI, deleteHolidayAPI } from '../../services/api';  // Funciones API para obtener y eliminar festivos
import { toast } from 'react-hot-toast';

export const DeleteHoliday = () => {
    const [holidays, setHolidays] = useState([]);
    const [selectedHoliday, setSelectedHoliday] = useState('');

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

    const handleDelete = async () => {
        if (!selectedHoliday) {
            toast.error('Por favor selecciona un festivo para eliminar.');
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            await deleteHolidayAPI(selectedHoliday, token);
            toast.success('Festivo eliminado correctamente.');

            // Eliminar el festivo de la lista local después de eliminarlo en el backend
            setHolidays(holidays.filter(holiday => holiday._id !== selectedHoliday));
            setSelectedHoliday('');
        } catch (e) {
            toast.error('Error al eliminar el festivo.' + e);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Eliminar Festivo</h3>
            <select
                className="w-full p-2 mb-4 border rounded"
                value={selectedHoliday}
                onChange={(e) => setSelectedHoliday(e.target.value)}
            >
                <option value="">Selecciona un festivo</option>
                {holidays.map(holiday => (
                    <option key={holiday._id} value={holiday._id}>
                        {holiday.name} - {new Date(holiday.date).toLocaleDateString()}
                    </option>
                ))}
            </select>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
            >
                Eliminar
            </button>
        </div>
    );
};



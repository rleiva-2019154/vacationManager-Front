import { useEffect, useState } from 'react';
import { getHolidaysAPI, updateHolidayAPI } from '../../services/api';  // Funciones API para obtener y actualizar festivos
import { toast } from 'react-hot-toast';

export const EditHoliday = () => {
    const [holidays, setHolidays] = useState([]);
    const [selectedHoliday, setSelectedHoliday] = useState('');
    const [holidayName, setHolidayName] = useState('');
    const [holidayDate, setHolidayDate] = useState('');

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('user'))?.token;
                const data = await getHolidaysAPI(token);
                setHolidays(data);
            } catch (error) {
                console.error("Error fetching holidays:", error);
            }
        };

        fetchHolidays();
    }, []);

    // Manejar la selección del festivo
    const handleSelectHoliday = (holidayId) => {
        const selected = holidays.find(h => h._id === holidayId);
        setSelectedHoliday(holidayId);
        setHolidayName(selected.name);
        setHolidayDate(new Date(selected.date).toISOString().split('T')[0]);  // Formato para el campo de fecha
    };

    const handleUpdate = async () => {
        if (!selectedHoliday || !holidayName || !holidayDate) {
            toast.error('Por favor, completa todos los campos.');
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            await updateHolidayAPI(selectedHoliday, { name: holidayName, date: holidayDate }, token);
            toast.success('Festivo actualizado correctamente.');

            // Limpiar campos y el combobox después de actualizar
            setSelectedHoliday('');
            setHolidayName('');
            setHolidayDate('');
        } catch (e) {
            toast.error('Error al actualizar el festivo.' + e);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Editar Festivo</h3>

            {/* Combobox para seleccionar el festivo */}
            <select
                className="w-full p-2 mb-4 border rounded"
                value={selectedHoliday}
                onChange={(e) => handleSelectHoliday(e.target.value)}
            >
                <option value="">Selecciona un festivo</option>
                {holidays.map(holiday => (
                    <option key={holiday._id} value={holiday._id}>
                        {holiday.name} - {new Date(holiday.date).toLocaleDateString()}
                    </option>
                ))}
            </select>

            {/* Campos para editar el nombre y la fecha del festivo */}
            {selectedHoliday && (
                <>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border rounded"
                        placeholder="Nombre del festivo"
                        value={holidayName}
                        onChange={(e) => setHolidayName(e.target.value)}
                    />
                    <input
                        type="date"
                        className="w-full p-2 mb-4 border rounded"
                        value={holidayDate}
                        onChange={(e) => setHolidayDate(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleUpdate}
                    >
                        Actualizar Festivo
                    </button>
                </>
            )}
        </div>
    );
};

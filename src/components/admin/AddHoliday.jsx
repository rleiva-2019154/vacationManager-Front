import { useState } from 'react';
import { addHolidayAPI } from '../../services/api' // Función API para agregar festivo
import { toast } from 'react-hot-toast';

export const AddHoliday = () => {
    const [holidayName, setHolidayName] = useState('');
    const [holidayDate, setHolidayDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!holidayName || !holidayDate) {
            toast.error('Todos los campos son obligatorios');
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            if (!token) throw new Error('Token no encontrado');

            await addHolidayAPI({ name: holidayName, date: holidayDate }, token);
            toast.success('Festivo agregado correctamente');
            setHolidayName('');
            setHolidayDate('');
        } catch (error) {
            toast.error('Error al agregar festivo: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Agregar Nuevo Festivo</h3>
            <input
                type="text"
                placeholder="Nombre del festivo"
                value={holidayName}
                onChange={(e) => setHolidayName(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="date"
                value={holidayDate}
                onChange={(e) => setHolidayDate(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Agregar
            </button>
        </form>
    );
};

import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { requestVacationAPI } from '../../services/api'; // Asegúrate de que esta función esté disponible

export const VacationRequest = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [comments, setComments] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que ambas fechas sean ingresadas
        if (!startTime || !endTime) {
            toast.error('Ambas fechas son obligatorias');
            return;
        }

        // Preparar los datos para la solicitud de vacaciones
        const vacationData = {
            uid: JSON.parse(localStorage.getItem('user')).uid, // Obtén el UID del usuario
            startTime,
            endTime,
            comments
        };

        try {
            // Llamar a la función de la API
            const response = await requestVacationAPI(vacationData);
            toast.success('Solicitud de vacaciones enviada correctamente.');
            // Limpiar los campos
            setStartTime('');
            setEndTime('');
            setComments('');
        } catch (error) {
            // Mostrar el mensaje de error devuelto por el servidor
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
            <Navbar className="fixed top-0 left-0 right-0 h-16" />
            <div className="flex-1 overflow-auto p-4">
                <div className="flex flex-col flex-1 items-center mt-8">
                    <h2 className="text-3xl font-bold">Solicitar Vacaciones</h2>
                    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md">
                        <div className="mb-4">
                            <label htmlFor="startTime" className="block text-sm font-medium leading-6">Fecha de Inicio</label>
                            <input
                                id="startTime"
                                type="date"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="endTime" className="block text-sm font-medium leading-6">Fecha de Fin</label>
                            <input
                                id="endTime"
                                type="date"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="comments" className="block text-sm font-medium leading-6">Comentarios</label>
                            <textarea
                                id="comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                rows="4"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                        >
                            Solicitar Vacaciones
                        </button>
                    </form>
                </div>
            </div>
            <Footer className="fixed bottom-0 left-0 right-0 h-16" />
        </div>
    );
};

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useTeams } from '../../hooks/useTeams'; // Hook para obtener los equipos
import { editTeam } from '../../services/api'; // Función API para editar equipos

export const EditTeam = () => {
    const { teams, loading: loadingTeams, error: errorTeams } = useTeams(); // Obtener todos los equipos
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamSelection, setTeamSelection] = useState(''); // Estado para controlar el valor del combobox
    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProject] = useState('');

    useEffect(() => {
        if (selectedTeam) {
            setTeamName(selectedTeam.name);
            setDescription(selectedTeam.description);
            setProject(selectedTeam.project);
        }
    }, [selectedTeam]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!teamName || !description || !project) {
            toast.error('Todos los campos son obligatorios.');
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;  // Obtener el token correctamente
            if (!token) {
                throw new Error('Token no encontrado');
            }

            await editTeam(selectedTeam._id, { name: teamName, description, project }, token);
            toast.success('Equipo actualizado exitosamente');
            setTeamName('');
            setDescription('');
            setProject('');
            setSelectedTeam(null); // Resetear el equipo seleccionado
            setTeamSelection(''); // Resetear el valor del combobox
        } catch (error) {
            toast.error('Error al actualizar equipo: ' + error.message);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Editar Equipo</h3>
            {loadingTeams && <p>Cargando equipos...</p>}
            {errorTeams && <p className="text-red-500">{errorTeams}</p>}
            <select
                className="w-full p-2 mb-4 border rounded"
                value={teamSelection} // Valor controlado por el estado teamSelection
                onChange={(e) => {
                    const team = teams.find(t => t._id === e.target.value);
                    setSelectedTeam(team);
                    setTeamSelection(e.target.value); // Actualiza el valor del combobox
                }}
            >
                <option value="">Selecciona un equipo para editar</option>
                {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                        {team.name}
                    </option>
                ))}
            </select>
            {selectedTeam && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Nuevo nombre del equipo"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <textarea
                        placeholder="Descripción del equipo"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Proyecto en el que trabajan"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Guardar cambios
                    </button>
                </form>
            )}
        </div>
    );
};

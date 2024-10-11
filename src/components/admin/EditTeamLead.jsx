export const EditTeamLead = () => {
    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Editar Jefe del Equipo</h3>
            {/* Aquí puedes añadir tu lógica para editar el jefe del equipo */}
            <select className="w-full p-2 mb-4 border rounded">
                <option>Selecciona un equipo</option>
                {/* Aquí lista los equipos */}
            </select>
            <input type="text" placeholder="Nombre del nuevo jefe" className="w-full p-2 mb-4 border rounded" />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Guardar</button>
        </div>
    );
};

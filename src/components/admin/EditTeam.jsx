export const EditTeam = () => {
    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Editar Equipo</h3>
            {/* Aquí puedes añadir tu lógica para editar un equipo */}
            <select className="w-full p-2 mb-4 border rounded">
                <option>Selecciona un equipo para editar</option>
                {/* Aquí lista los equipos */}
            </select>
            <input type="text" placeholder="Nuevo nombre del equipo" className="w-full p-2 mb-4 border rounded" />
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Guardar cambios</button>
        </div>
    );
};

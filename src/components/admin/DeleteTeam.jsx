export const DeleteTeam = () => {
    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Eliminar Equipo</h3>
            {/* Aquí puedes añadir tu lógica para eliminar un equipo */}
            <select className="w-full p-2 mb-4 border rounded">
                <option>Selecciona un equipo para eliminar</option>
                {/* Aquí lista los equipos */}
            </select>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Eliminar</button>
        </div>
    );
};

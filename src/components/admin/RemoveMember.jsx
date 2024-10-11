export const RemoveMember = () => {
    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Eliminar Miembro del Equipo</h3>
            {/* Aquí puedes añadir tu lógica para eliminar un miembro */}
            <select className="w-full p-2 mb-4 border rounded">
                <option>Selecciona un equipo</option>
                {/* Aquí lista los equipos */}
            </select>
            <select className="w-full p-2 mb-4 border rounded">
                <option>Selecciona un miembro para eliminar</option>
                {/* Aquí lista los miembros del equipo */}
            </select>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Eliminar</button>
        </div>
    );
};

export const AddMember = () => {
    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-4">Añadir Miembro al Equipo</h3>
            {/* Aquí puedes añadir tu lógica para agregar un miembro */}
            <select className="w-full p-2 mb-4 border rounded">
                <option>Selecciona un equipo</option>
                {/* Aquí lista los equipos */}
            </select>
            <input type="text" placeholder="Nombre del miembro" className="w-full p-2 mb-4 border rounded" />
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Añadir</button>
        </div>
    );
};

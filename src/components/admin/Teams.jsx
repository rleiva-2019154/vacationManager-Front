import { useState } from 'react';
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { CreateTeam } from './CreateTeam';
import { ListTeams } from './ListTeams';  // Importar el nuevo componente
import { EditTeam } from './EditTeam';
/*import { DeleteTeam } from './DeleteTeam';*/
import { AddMember } from './AddMember';
import { RemoveMember } from './RemoveMember';
import { EditTeamLead } from './EditTeamLead';

export const Teams = () => {
    const [activeComponent, setActiveComponent] = useState(null); // Controla qué componente está activo

    const renderComponent = () => {
        switch (activeComponent) {
            case 'create':
                return <CreateTeam />;
            case 'listTeams':
                return <ListTeams />;  // Renderizar el componente de listar equipos
            case 'edit':
                return <EditTeam />;
            /*case 'delete':
                return <DeleteTeam />;*/
            case 'addMember':
                return <AddMember />;
            case 'removeMember':
                return <RemoveMember />;
            case 'editBoss':
                return <EditTeamLead />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
            <Navbar className="fixed top-0 left-0 right-0 h-16" />
            <div className="flex-1 overflow-auto p-4">
                <div className="flex flex-col flex-1 items-center mt-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {/* Botones para cambiar el componente activo */}
                        <button onClick={() => setActiveComponent('create')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Crear Equipo</button>
                        <button onClick={() => setActiveComponent('listTeams')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Listar Equipos</button>
                        <button onClick={() => setActiveComponent('edit')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Editar Equipo</button>
                        <button onClick={() => setActiveComponent('delete')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Eliminar Equipo</button>
                        <button onClick={() => setActiveComponent('addMember')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Añadir Miembro</button>
                        <button onClick={() => setActiveComponent('removeMember')} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Eliminar Miembro</button>
                        <button onClick={() => setActiveComponent('editBoss')} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Editar Jefe</button>
                    </div>

                    {/* Renderizar el componente activo */}
                    <div className="w-full max-w-4xl">
                        {renderComponent()}
                    </div>
                </div>
            </div>
            <Footer className="fixed bottom-0 left-0 right-0 h-16" />
        </div>
    );
};

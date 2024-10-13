import { useState } from 'react';
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { AddHoliday } from './AddHoliday';  

export const Holidays = () => {
    const [activeComponent, setActiveComponent] = useState(null);  // Controla qué componente está activo

    const renderComponent = () => {
        switch (activeComponent) {
            case 'add':
                return <AddHoliday />;
            case 'view':
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
                        <button onClick={() => setActiveComponent('add')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Agregar Festivo
                        </button>
                        <button onClick={() => setActiveComponent('view')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Ver Todos
                        </button>
                        <button onClick={() => setActiveComponent('update')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                            Actualizar Festivo
                        </button>
                        <button onClick={() => setActiveComponent('delete')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Eliminar Festivo
                        </button>
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

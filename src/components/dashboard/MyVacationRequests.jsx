import { useState } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { MyRequestsPending } from "./MyRequestsPending";
import { MyApprovedRequests } from "./MyApprovedRequests";
import { MyRefuseRequests } from "./MyRefuseRequests";
import { GetRequests } from "./GetRequests";

export const MyVacationRequests = () => {
    const [activeComponent, setActiveComponent] = useState(null); // Controla qué componente está activo

    const renderComponent = () => {
        switch (activeComponent) {
            case 'pending':
                return <MyRequestsPending />;
            case 'approved':
                return <MyApprovedRequests />;
            case 'refuse':
                return <MyRefuseRequests />;
            case 'seeAllRequests':
                return <GetRequests />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
            <Navbar className="fixed top-0 left-0 right-0 h-16" />
            <div className="flex-1 overflow-auto p-8">  {/* Añadido más padding */}
                <div className="flex flex-col flex-1 items-center mt-8 space-y-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {/* Botones para cambiar el componente activo */}
                        <button onClick={() => setActiveComponent('pending')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Solicitudes pendientes
                        </button>
                        <button onClick={() => setActiveComponent('approved')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Solicitudes aprobadas
                        </button>
                        <button onClick={() => setActiveComponent('refuse')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Solicitudes rechazadas
                        </button>
                        <button onClick={() => setActiveComponent('seeAllRequests')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                            Ver todas las solicitudes
                        </button>
                    </div>

                    {/* Renderizar el componente activo */}
                    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                        {renderComponent()}
                    </div>
                </div>
            </div>
            <Footer className="fixed bottom-0 left-0 right-0 h-16" />
        </div>
    );
};

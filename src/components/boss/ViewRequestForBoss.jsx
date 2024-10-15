import { useState } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { AprovedRequestsForEmployee } from "./AprovedRequestsForEmployee"
import { PendingRequestForEmployee } from "./PendingRequestForEmployee";
import { SeeAllRequestsEmployees } from "./SeeAllRequestsEmployees";
import { RejectedRequestsForEmployee } from "./RejectedRequestsForEmployee"; // Importa el nuevo componente

export const ViewRequestForBoss = () => {
    const [activeComponent, setActiveComponent] = useState(null); // Controla qué componente está activo

    const renderComponent = () => {
        switch (activeComponent) {
            case 'pending':
                return <PendingRequestForEmployee />;
            case 'approved':
                return <AprovedRequestsForEmployee />;
            case 'rejected':
                return <RejectedRequestsForEmployee />; // Muestra las solicitudes rechazadas
            case 'seeAllRequests':
                return <SeeAllRequestsEmployees />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
            <Navbar className="fixed top-0 left-0 right-0 h-16" />
            <div className="flex-1 overflow-auto p-4">
                <div className="flex flex-col flex-1 items-center mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Botones para cambiar el componente activo */}
                        <button onClick={() => setActiveComponent('pending')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Solicitudes pendientes</button>
                        <button onClick={() => setActiveComponent('approved')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Solicitudes aprobadas</button>
                        <button onClick={() => setActiveComponent('rejected')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Solicitudes rechazadas</button> {/* Nuevo botón para solicitudes rechazadas */}
                        <button onClick={() => setActiveComponent('seeAllRequests')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Ver todas las solicitudes</button>
                    </div>

                    <div className="w-full max-w-4xl">
                        {renderComponent()}
                    </div>
                </div>
            </div>
            <Footer className="fixed bottom-0 left-0 right-0 h-16" />
        </div>
    );
};
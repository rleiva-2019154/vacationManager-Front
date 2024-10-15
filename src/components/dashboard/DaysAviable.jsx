import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useGetVacationDaysAvailable } from "../../hooks/useGetVacationDaysAvailable";

export const DaysAviable = () => {
    const { vacationDaysAvailable, isLoading, error } = useGetVacationDaysAvailable();

    return (
        <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
            <Navbar className="fixed top-0 left-0 right-0 h-16" />
            <div className="flex-1 overflow-auto p-8">
                <div className="flex flex-col flex-1 items-center mt-8 space-y-8">
                    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-bold mb-6">Días de Vacaciones Disponibles</h3>
                        {isLoading ? (
                            <p className="text-blue-500">Cargando...</p>
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : (
                            <p className="text-xl text-green-600 font-semibold">
                                Tienes {vacationDaysAvailable} días de vacaciones disponibles.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Footer className="fixed bottom-0 left-0 right-0 h-16" />
        </div>
    );
};

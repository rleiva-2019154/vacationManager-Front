import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useGetRequests } from "../../hooks/useGetRequests";

export const GetRequests = () => {
    const { requestsVacations, isLoading, error } = useGetRequests();

    // Verifica la estructura de los datos de las solicitudes de vacaciones
    console.log("Solicitudes de vacaciones:", requestsVacations);

    return (
        <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
            <Navbar className="fixed top-0 left-0 right-0 h-16" />
            <div className="flex-1 overflow-auto p-4">
                <div className="flex flex-col flex-1 items-center mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {requestsVacations && requestsVacations.length > 0 ? (
                            requestsVacations.map((request) => (
                                <Card 
                                    key={request._id} 
                                    sx={{ 
                                        maxWidth: 345, 
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
                                        borderRadius: '12px',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                        }
                                    }}
                                    className="bg-white hover:shadow-lg"
                                >
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography 
                                                gutterBottom 
                                                variant="h5" 
                                                component="div"
                                                className="font-semibold text-blue-700"
                                            >
                                                Desde: {new Date(request.startTime).toLocaleDateString()} <br />
                                                Hasta: {new Date(request.endTime).toLocaleDateString()}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary"
                                                className="text-sm mb-3"
                                            >
                                                <span className="font-bold">Estado: </span>
                                                <span className={request.status === "Aprobado" ? "text-green-500" : request.status === "Rechazado" ? "text-red-500" : "text-yellow-500"}>
                                                    {request.status}
                                                </span>
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary" 
                                                className="text-sm mb-2"
                                            >
                                                <span className="font-bold">Días solicitados: </span>
                                                {request.totalDaysRequested}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary" 
                                                className="text-sm mb-2"
                                            >
                                                <span className="font-bold">Comentarios: </span>
                                                {request.comments || "Sin comentarios"}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className="flex justify-end p-2">
                                        <Button 
                                            size="small" 
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Compartir
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))
                        ) : (
                            !isLoading && <p>No hay solicitudes de vacaciones</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer className="fixed bottom-0 left-0 right-0 h-16" />
        </div>
    );
};

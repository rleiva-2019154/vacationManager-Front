import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetBossRequests } from "../../hooks/useGetBossRequests";

export const SeeAllRequests = () => {
    const { requests, loading, error } = useGetBossRequests();

    return (
        <div className="p-4">  {/* Ajusta el padding general del componente */}
            <h3 className="text-xl font-bold mb-4 text-center">Solicitudes de Vacaciones de los Jefes</h3> {/* Menor margen entre el título y contenido */}
            {loading && <p className="text-center"><CircularProgress /></p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {requests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((request) => (
                        <Card 
                            key={request._id} 
                            sx={{ 
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)', // Reduce la sombra para que no parezca un "cajón" exagerado
                                borderRadius: '12px',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)', // Animación suave en hover
                                }
                            }}
                            className="bg-white"
                        >
                            <CardActionArea>
                                <CardContent>
                                    <Typography 
                                        gutterBottom 
                                        variant="h5" 
                                        component="div"
                                        className="font-semibold text-blue-700"
                                    >
                                        {request.uid.name} {request.uid.surname}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="textSecondary"
                                        className="text-sm mb-3"
                                    >
                                        <span className="font-bold">Desde: </span>
                                        {new Date(request.startTime).toLocaleDateString()} <br />
                                        <span className="font-bold">Hasta: </span>
                                        {new Date(request.endTime).toLocaleDateString()}
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
                        </Card>
                    ))}
                </div>
            ) : (
                !loading && <p className="text-center">No hay solicitudes de vacaciones para los jefes.</p>
            )}
        </div>
    );
};

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useGetApprovedRequests } from "../../hooks/useGetApprovedRequests";

export const MyApprovedRequests = () => {
    const { approvedRequests, isLoading, error } = useGetApprovedRequests();

    return (
        <div className="p-4">
            <h3 className="text-xl font-bold mb-4 text-center">Solicitudes Aprobadas</h3>
            {isLoading && <p className="text-center">Cargando solicitudes...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {approvedRequests && approvedRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {approvedRequests.map((request) => (
                        <Card 
                            key={request._id} 
                            sx={{ 
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',  // Sombra suave
                                borderRadius: '12px',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',  // Animación suave en hover
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
                                        Desde: {new Date(request.startTime).toLocaleDateString()} <br />
                                        Hasta: {new Date(request.endTime).toLocaleDateString()}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="textSecondary"
                                        className="text-sm mb-3"
                                    >
                                        <span className="font-bold">Estado: </span>
                                        <span className="text-green-500">
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
                !isLoading && <p className="text-center">No hay solicitudes aprobadas</p>
            )}
        </div>
    );
};

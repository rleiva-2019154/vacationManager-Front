import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetApprovedEmployeeRequests } from "../../hooks/useGetApprovedEmployeeRequests";

export const AprovedRequestsForEmployee = () => {
    const { approvedRequests, loading, error } = useGetApprovedEmployeeRequests();

    return (
        <div className="p-4">
            <h3 className="text-xl font-bold mb-4 text-center">Solicitudes de Vacaciones Aprobadas (empleados)</h3>
            
            {loading && <CircularProgress />}
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            {/* Verificar si hay solicitudes antes de intentar mapear */}
            {approvedRequests && approvedRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {approvedRequests.map((request) => (
                        <Card 
                            key={request._id} 
                            sx={{ 
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                borderRadius: '12px',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
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
                                        <span className="font-bold">Solicitante: </span>
                                        {request.uid.name} {request.uid.surname} ({request.uid.email})
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
                !loading && <p className="text-center">No hay solicitudes aprobadas</p>
            )}
        </div>
    );
};

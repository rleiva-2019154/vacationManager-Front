import { useState } from "react";
import { useGetPendingBossRequests } from "../../hooks/useGetPendingBossRequests";
import { approveVacationAPI, refuseVacationAPI } from "../../services/api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import toast, { Toaster } from 'react-hot-toast';

export const PendingRequest = () => {
    const { pendingRequests, loading, error } = useGetPendingBossRequests();
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [token] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null);

    const handleRequestClick = (requestId) => {
        setSelectedRequestId(selectedRequestId === requestId ? null : requestId);
    };

    const handleApprove = async (requestId) => {
        try {
            const response = await approveVacationAPI(requestId, token);
            toast.success(response.message);  // Mostrar alerta de éxito con react-hot-toast
            window.location.reload();  // Recargar para actualizar las solicitudes
        } catch (e) {
            toast.error("Error al aprobar la solicitud." + e);
        }
    };

    const handleReject = async (requestId) => {
        try {
            const response = await refuseVacationAPI(requestId, token);
            toast.success(response.message);  // Mostrar alerta de éxito con react-hot-toast
            window.location.reload();  // Recargar para actualizar las solicitudes
        } catch (e) {
            toast.error("Error al rechazar la solicitud." + e);
        }
    };

    return (
        <div className="p-4">
            <Toaster position="top-right" reverseOrder={false} />  {/* Toaster para mostrar notificaciones */}
            <h3 className="text-xl font-bold mb-4 text-center">Solicitudes Pendientes de los Jefes</h3>
            {loading && <CircularProgress className="block mx-auto" />}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {pendingRequests && pendingRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingRequests.map((request) => (
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
                            <CardActionArea onClick={() => handleRequestClick(request._id)}>
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
                                        {request.uid?.name || 'Usuario desconocido'}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="textSecondary"
                                        className="text-sm mb-3"
                                    >
                                        <span className="font-bold">Estado: </span>
                                        <span className="text-yellow-500">{request.status}</span>
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
                            {selectedRequestId === request._id && (
                                <div className="p-4 flex justify-between">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleApprove(request._id)}
                                    >
                                        Aprobar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleReject(request._id)}
                                    >
                                        Rechazar
                                    </Button>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            ) : (
                !loading && <p className="text-center">No hay solicitudes pendientes</p>
            )}
        </div>
    );
};

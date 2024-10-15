import { useEffect, useState } from 'react';
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserTeams, getTeamMembersWithVacationDays } from '../../services/api'; // Asegúrate de importar la función de la API

export const Team = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null); // Controla qué equipo está seleccionado
  const [teamMembers, setTeamMembers] = useState([]); // Almacena los miembros del equipo

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.uid) {
          const response = await getUserTeams(user.uid);
          console.log("Equipos recibidos:", response); // Verifica los datos de equipos
          if (response.error) {
            setError(response.message);
          } else {
            setTeams(response.teams);
          }
        } else {
          setError('No se encontró información del usuario.');
        }
      } catch (error) {
        setError('Error al obtener los equipos del usuario.' + error);
      }
      setLoading(false);
    };

    fetchTeams();
  }, []);

  const handleTeamClick = async (teamId) => {
    setSelectedTeamId(teamId); // Selecciona el equipo
    try {
      console.log("Haciendo solicitud para obtener miembros del equipo:", teamId); // Para verificar qué teamId se está pasando
      const response = await getTeamMembersWithVacationDays(teamId); // Llama a la API para obtener los miembros del equipo
      
      console.log("Respuesta de la API al obtener miembros:", response); // Para ver qué devuelve la API
      
      if (!response.error) {
        setTeamMembers(response.team.members || []); // Asegúrate de que la lista de miembros no sea undefined
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('Error al obtener los miembros del equipo:', error);
      setError('Error al obtener los miembros del equipo.');
    }
  };

  return (
    <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
      <Navbar className="fixed top-0 left-0 right-0 h-16" />
      <div className="flex-1 flex flex-col justify-center items-center overflow-auto p-8">
        <div className="flex flex-col flex-1 items-center mt-8 space-y-8 w-full max-w-7xl">
          <h3 className="text-3xl font-bold mb-4 text-center">Equipos del Usuario</h3>
          {loading && <CircularProgress />}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center">
              {teams.map((team) => (
                <Card
                  key={team._id}
                  sx={{
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    borderRadius: '12px',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                  className="bg-white w-full max-w-xs mx-auto"
                >
                  <CardActionArea onClick={() => handleTeamClick(team._id)}>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="font-semibold text-blue-700 text-center"
                      >
                        {team.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="text-sm mb-3 text-center"
                      >
                        <span className="font-bold">Descripción: </span>
                        {team.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="text-sm mb-2 text-center"
                      >
                        <span className="font-bold">Proyecto: </span>
                        {team.project}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="text-sm mb-2 text-center"
                      >
                        <span className="font-bold">Jefe: </span>
                        {team.boss?.name} ({team.boss?.email})
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </div>
          ) : (
            !loading && <p className="text-center">No se encontró ningún equipo para el usuario.</p>
          )}

          {/* Mostrar miembros del equipo seleccionado */}
          {selectedTeamId && (
            <div className="mt-6 w-full max-w-4xl">
              <h4 className="text-2xl font-bold text-center">Miembros del equipo</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <div key={member._id} className="p-4 bg-gray-100 rounded shadow">
                      <Typography variant="h6" className="font-semibold">
                        {member.name}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {member.email}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <p className="text-center">No se encontraron miembros en este equipo.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0 h-16" />
    </div>
  );
};

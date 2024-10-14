import { useEffect, useState } from 'react';
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserTeams } from '../../services/api'; // Asegúrate de importar la función de la API

export const Team = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.uid) {
        const response = await getUserTeams(user.uid);
        if (response.error) {
          setError(response.message);
        } else {
          setTeams(response.teams);
        }
      } else {
        setError('No se encontró información del usuario.');
      }
      setLoading(false);
    };

    fetchTeams();
  }, []);

  return (
    <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
      <Navbar className="fixed top-0 left-0 right-0 h-16" />
      <div className="flex-1 flex flex-col justify-center items-center overflow-auto p-8">  {/* Centra verticalmente el contenido */}
        <div className="flex flex-col flex-1 items-center mt-8 space-y-8 w-full max-w-7xl"> {/* Añadido max-width para limitar el contenido */}
          <h3 className="text-3xl font-bold mb-4 text-center">Equipos del Usuario</h3>
          {loading && <CircularProgress />}
          {error && <p className="text-red-500">{error}</p>}
          {teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center"> {/* Asegura que las tarjetas estén centradas */}
              {teams.map((team) => (
                <Card
                  key={team._id}
                  sx={{
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    borderRadius: '12px',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                  className="bg-white w-full max-w-xs mx-auto"
                >
                  <CardActionArea>
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
                        {team.boss.name} ({team.boss.email})
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </div>
          ) : (
            !loading && <p className="text-center">No se encontró ningún equipo para el usuario.</p>
          )}
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0 h-16" />
    </div>
  );
};

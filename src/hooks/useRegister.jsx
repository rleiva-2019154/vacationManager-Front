import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../services";
import toast from "react-hot-toast";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (name, surname, dpi, username, email, password) => {
    setIsLoading(true);

    try {
      const data = await registerRequest({
        name,
        surname,
        dpi,
        username,
        email,
        password,
      });

      if (data.error) {
        toast.error(data.message || "Error al registrar el usuario");
      } else {
        toast.success("Registro exitoso");
        navigate("/");
      }
    } catch (e) {
      toast.error("No se pudo conectar al servidor" + e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
  };
};

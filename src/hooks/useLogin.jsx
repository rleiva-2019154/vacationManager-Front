import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login as loginRequest } from "../services"
import toast from "react-hot-toast"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (payload) => {
        setIsLoading(true);

        try {
            const data = await loginRequest(payload);

            if(data.error){
                toast.error(data.message || 'Hubo un error al iniciar sesion.')
            }else{
                const { userDetails } = data;
                localStorage.setItem('user', JSON.stringify(userDetails))
                toast.success(data.msg || 'Sesion exitosa')
                navigate("/")
            }
        } catch (e) {
            toast.error('No se pudo conectar con el servidor. Intenta mas tarde.' + e)
        }finally{
            setIsLoading(false)
        }
    }

  return {
    login,
    isLoading
  }
}

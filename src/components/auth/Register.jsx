import PropTypes from "prop-types"
import logo from "../../assets/img/logoGeko.png"
import { useState } from "react";
import { useRegister } from "../../hooks";
import toast from "react-hot-toast";

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister()
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dpi, setDpi] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!name || !surname || !dpi || !username || !email || !password){
            toast.error("Todos los campos son obligatorios.")
            return; 
        }
        
        await register(name, surname, dpi, username, email, password)
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Geko Digital"
                    src={logo}
                    className="mx-auto h-19 w-auto"
                />
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">
                    Registrar cuenta
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6">
                            Nombre
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium leading-6">
                            Apellido
                        </label>
                        <div className="mt-2">
                            <input
                                id="surname"
                                name="surname"
                                type="text"
                                required
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="dpi" className="block text-sm font-medium leading-6">
                            DPI
                        </label>
                        <div className="mt-2">
                            <input
                                id="dpi"
                                name="dpi"
                                type="text"
                                required
                                value={dpi}
                                onChange={(e) => setDpi(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div> 

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                            Correo electronico
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6">
                                Contraseña
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            {isLoading ? "Registrando..." : "Registro"}
                        </button>
                    </div>
                </form>

                <span
                    onClick={switchAuthHandler}
                    className="mt-5 block text-center text-sm text-blue-600 cursor-pointer hover:undreline"
                >
                    ¿Ya tienes cuenta...? Inicia sesión acá!
                </span>
            </div>
        </div>
    )
}

Register.propTypes = {
    switchAuthHandler: PropTypes.func.isRequired
}

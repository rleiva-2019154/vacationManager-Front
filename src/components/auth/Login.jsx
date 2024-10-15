import PropTypes from "prop-types";
import logo from "../../assets/img/logoGeko.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLogin } from "../../hooks";
import { isValidEmail } from "../../validators/validates";

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      toast.error(
        "Por favor ingresa las credenciales completas (username or email) & password"
      );
      return;
    }
    const isEmail = isValidEmail(identifier);

    const payload = isEmail
      ? { email: identifier, password }
      : { username: identifier, password };

      await login(payload)
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Geko Digital" src={logo} className="mx-auto h-19 w-auto" />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">
          Inicio de sesión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium leading-6"
            >
              Email or username
            </label>
            <div className="mt-2">
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                autoComplete="off"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Password
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
              {isLoading ? 'Iniciando sesión' : 'Inicio de sesión'}
            </button>
          </div>
        </form>

        <span
          onClick={switchAuthHandler}
          className="mt-5 block text-center text-sm text-blue-600 cursor-pointer hover:undreline"
        >
          ¿Aún no tienes cuenta...? ¡Registrate acá!
        </span>
      </div>
    </div>
  );
};

Login.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};

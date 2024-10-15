import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-9xl font-semibold text-blue-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-2xl leading-7">¡Lo sentimos!</p>
        <p className="text-base leading-7">La pagina que buscas no se encuentra disponible.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Regresar al inicio
          </Link>
          <a href="mailto:rleiva-2019154@kinal.edu.gt?subject=Necesito%20ayuda" 
          className="text-sm font-semibold text-blue-900">
            Contactar a soporte <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

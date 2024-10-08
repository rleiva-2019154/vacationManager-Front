import { DashboardPage } from "./pages/DashboardPage";
import { AuthPage } from "./pages/AuthPage"
import { NotFound } from "./pages/NotFound";

const routes = [
    {path: "/auth", element: <AuthPage/>},
    {path: "/", element: <DashboardPage/>},
    {path: "/*", element: <NotFound/>}
]

export default routes;
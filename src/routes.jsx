import { DashboardPage } from "./pages/DashboardPage";
import { AuthPage } from "./pages/AuthPage"
import { NotFound } from "./pages/NotFound";
import { VacationRequest } from "./components/dashboard/VacationRequest";
import { StatusOfRequest } from "./components/dashboard/StatusOfRequest";
import { DaysAviable } from "./components/dashboard/DaysAviable";
import { Team } from "./components/dashboard/Team";
import { GetRequests } from "./components/dashboard/GetRequests";

const routes = [
    {path: "/auth", element: <AuthPage/>},
    {path: "/", element: <DashboardPage/>},
    {path: "/vacationRequest", element: <VacationRequest/>},
    {path: "/getRequests", element: <GetRequests/>},
    {path: "/statusOfRequest", element: <StatusOfRequest/>},
    {path: "/daysAviable", element: <DaysAviable/>},
    {path: "/team", element: <Team/>},
    {path: "/*", element: <NotFound/>}
]

export default routes;
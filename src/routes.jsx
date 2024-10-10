import { DashboardPage } from "./pages/DashboardPage";
import { AuthPage } from "./pages/AuthPage"
import { NotFound } from "./pages/NotFound";
import { VacationRequest } from "./components/dashboard/VacationRequest";
import { StatusOfRequest } from "./components/dashboard/StatusOfRequest";
import { DaysAviable } from "./components/dashboard/DaysAviable";
import { Team } from "./components/dashboard/Team";
import { GetRequests } from "./components/dashboard/GetRequests";
import { ProtectedRoute } from "./components/ProtectedRoute"

const routes = [
    {path: "/auth", element: <AuthPage/>},
    {path: "/", element: <DashboardPage/>},
    {path: "/*", element: <NotFound/>},

    /*{path: "/vacationRequest", element: <VacationRequest/>},
    {path: "/getRequests", element: <GetRequests/>},
    {path: "/statusOfRequest", element: <StatusOfRequest/>},
    {path: "/daysAviable", element: <DaysAviable/>},
    {path: "/team", element: <Team/>},*/
    {
        path: "/vacationRequest",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <VacationRequest/>
            </ProtectedRoute>
        ),
    },
    {
        path: "/getRequests",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <GetRequests/>
            </ProtectedRoute>
        ),
    },
    {
        path: "/statusOfRequest",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <StatusOfRequest/>
            </ProtectedRoute>
        ),
    },
    {
        path: "/daysAviable",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <DaysAviable/>
            </ProtectedRoute>
        ),
    },
    {
        path: "/team",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <Team/>
            </ProtectedRoute>
        ),
    },
];

export default routes;
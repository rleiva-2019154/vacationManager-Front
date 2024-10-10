import { DashboardPage } from "./pages/DashboardPage";
import { AuthPage } from "./pages/AuthPage"
import { NotFound } from "./pages/NotFound"

import { AssignRole } from "./components/admin/AssignRole";
import { ViewRequests } from "./components/admin/ViewRequests";
import { Teams } from "./components/admin/Teams";
import { Holidays } from "./components/admin/Holidays";

import { VacationRequest } from "./components/dashboard/VacationRequest";
import { StatusOfRequest } from "./components/dashboard/StatusOfRequest";
import { DaysAviable } from "./components/dashboard/DaysAviable";
import { Team } from "./components/dashboard/Team";
import { GetRequests } from "./components/dashboard/GetRequests";
import { ProtectedRoute } from "./components/ProtectedRoute"

const routes = [
    { path: "/auth", element: <AuthPage /> },
    { path: "/", element: <DashboardPage /> },
    { path: "/*", element: <NotFound /> },

    { 
        path: "/assignRole",
        element: (
            <ProtectedRoute allowedRoles={['ADMIN']}>
                <AssignRole/>
            </ProtectedRoute>
        )
    },
    { 
        path: "/viewRequests",
        element: (
            <ProtectedRoute allowedRoles={['ADMIN']}>
                <ViewRequests/>
            </ProtectedRoute>
        )
    },
    { 
        path: "/teams",
        element: (
            <ProtectedRoute allowedRoles={['ADMIN']}>
                <Teams/>
            </ProtectedRoute>
        )
    },
    { 
        path: "/holidays",
        element: (
            <ProtectedRoute allowedRoles={['ADMIN']}>
                <Holidays/>
            </ProtectedRoute>
        )
    },

    {
        path: "/vacationRequest",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <VacationRequest />
            </ProtectedRoute>
        ),
    },
    {
        path: "/getRequests",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <GetRequests />
            </ProtectedRoute>
        ),
    },
    {
        path: "/statusOfRequest",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <StatusOfRequest />
            </ProtectedRoute>
        ),
    },
    {
        path: "/daysAviable",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <DaysAviable />
            </ProtectedRoute>
        ),
    },
    {
        path: "/team",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <Team />
            </ProtectedRoute>
        ),
    },
];

export default routes;
import { DashboardPage } from "./pages/DashboardPage";
import { AuthPage } from "./pages/AuthPage"
import { NotFound } from "./pages/NotFound"

import { AssignRole } from "./components/admin/AssignRole";
import { Teams } from "./components/admin/Teams";
import { Holidays } from "./components/admin/Holidays";

import { ViewRequests } from "./components/dashboard/ViewRequests";

import { VacationRequest } from "./components/dashboard/VacationRequest";
import { DaysAviable } from "./components/dashboard/DaysAviable";
import { Team } from "./components/dashboard/Team";
import { MyVacationRequests } from "./components/dashboard/MyVacationRequests";
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
            <ProtectedRoute allowedRoles={['ADMIN', 'BOSS']}>
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
        path: "/myVacationRequests",
        element: (
            <ProtectedRoute allowedRoles={['BOSS', 'EMPLOYEE']}>
                <MyVacationRequests/>
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
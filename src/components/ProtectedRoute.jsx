import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
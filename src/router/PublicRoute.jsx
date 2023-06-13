import { Navigate, useLocation } from "react-router-dom";

export const PublicRoute = ({ isAuthenticated, children }) => {
    const location = useLocation();
    return !isAuthenticated ? children : <Navigate to={location.state?.from || '/'} replace />;
};

import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ isAuthenticated, children }) => {
    const location = useLocation();
    return isAuthenticated ? children : <Navigate to="/auth/login" state={{ from: location.pathname }} />;
};
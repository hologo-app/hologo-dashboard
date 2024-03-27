import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();

    const auth_role = localStorage.getItem("authRole")
    const user_name = localStorage.getItem("username")

    // const auth_role = auth?.role || ""; // Ensure auth role is a string

    return (
        auth_role === allowedRoles
            ? <Outlet />
            : user_name
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/auth" state={{ from: location }} replace />
    );
}

export default RequireAuth;

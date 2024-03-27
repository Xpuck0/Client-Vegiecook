import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthProvider";
import Path from "../paths";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthVisible } from "../contexts/LoginContext";

export default function GuestAuthGuard() {
    const { isAuthenticated } = useContext(AuthContext);
    const { toggleLoginVisible } = useAuthVisible();

    useEffect(() => {
        if (!isAuthenticated) {
            toggleLoginVisible();
        }
    }, [isAuthenticated, toggleLoginVisible]);

    if (!isAuthenticated) {
        return <Navigate to={Path.Home} />;
    }

    return (
        <Outlet />
    );
}

import { SSOCOOKIES } from "constants/app.const";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRequirement = () => {
    const token = Cookies.get(SSOCOOKIES.access);
    const location = useLocation()

    return (
        token
            ?
            <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default AuthRequirement

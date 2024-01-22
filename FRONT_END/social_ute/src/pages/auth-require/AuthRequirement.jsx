import { SSOCOOKIES } from "constants/app.const";
import { USERCOOKIES } from "constants/user.const";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRequirement = () => {
    const token = Cookies.get(SSOCOOKIES.access);
    const userID = Cookies.get(USERCOOKIES.userID);
    const location = useLocation()

    return (
        userID && token
            ?
            <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default AuthRequirement

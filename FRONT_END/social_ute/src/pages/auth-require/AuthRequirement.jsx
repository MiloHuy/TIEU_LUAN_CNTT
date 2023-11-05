import { useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken } from '../../app/slice/auth/auth.slice';

const AuthRequirement = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    const [cookies, setCookie] = useCookies(['access-token'])

    const handleSaveAccessToken = useCallback(() => {
        if (!token) return
        setCookie("access-token", token, { path: "/" });
    }, [token, setCookie])

    useEffect(() => {
        handleSaveAccessToken()
    }, [token, handleSaveAccessToken])

    return (
        token
            ?
            <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default AuthRequirement

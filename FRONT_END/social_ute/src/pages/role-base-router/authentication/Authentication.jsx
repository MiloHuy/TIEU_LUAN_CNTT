import { authFail, authSuccess } from 'app/slice/auth/auth.slice.js';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getMeInfo } from 'services/me.svc.js';
import Unauthorized from '../authorization/UnAuthorization';

export default function Authentication() {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const [hasRun, setHasRun] = useState(false);
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const fetchInfoMySelf = useCallback(async () => {
        try {
            const data_Info = await getMeInfo()
            dispatch(authSuccess({ ...data_Info.data.user }))
        }
        catch (err) {
            dispatch(authFail(err))
        }
    }, [dispatch])

    useEffect(() => {
        fetchInfoMySelf()
        setHasRun(true);
    }, [fetchInfoMySelf]);

    if (isAuthenticated) {
        return <Outlet />;
    }
    // or navigate route Unauthenticated
    return <Unauthorized />;
}

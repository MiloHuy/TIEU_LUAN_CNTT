import { authFail, authSuccess } from 'app/slice/auth/auth.slice.js';
import PropagateLoader from 'components/loading/propagate-loading/PropagateLoader';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getMeInfo } from 'services/me.svc.js';
import Unauthorized from '../authorization/UnAuthorization';

export default function Authentication() {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const [hasRun, setHasRun] = useState(false);
    const dispatch = useDispatch()

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

    if (!loading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <PropagateLoader
                    color="#9aa19f"
                    size={18}
                />
            </div >
        )
    }

    if (isAuthenticated) {
        return <Outlet />;
    }
    return <Unauthorized />;
}

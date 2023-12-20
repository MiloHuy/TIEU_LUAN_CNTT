import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Unauthorized from './UnAuthorization';

export default function Authorization({ roles }) {
    const { user } = useSelector((state) => state.auth);
    console.log('roles:' + roles);
    if (roles === user.role_id) {
        return <Outlet />;
    }
    // or navigate to route Unauthorized
    return <Unauthorized />;
}

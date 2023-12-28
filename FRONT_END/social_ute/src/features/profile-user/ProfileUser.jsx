import { Avatar } from "@nextui-org/react";
import { selectCurrenUser } from "app/slice/auth/auth.slice";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileUser = (props) => {
    const { userName } = props
    const user = useSelector(selectCurrenUser)

    const navigate = useNavigate()

    const handleNavigateHomeUser = () => {
        navigate(`/welcome/home-user/${user.id}`)
    }

    return (
        <div
            onClick={handleNavigateHomeUser}
            className='flex gap-5 items-center cursor-pointer'>
            <Avatar
                isBordered
                src={user.avatar.url} />
            <h2 className="text-xl text-black dark:text-white font-mono">{userName}</h2>
        </div>
    )
}

export default ProfileUser

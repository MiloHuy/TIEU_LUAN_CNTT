import { Avatar } from "@nextui-org/react";
import { selectCurrenUser } from "app/slice/auth/auth.slice";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromCookie } from "utils/user.utils";

const ProfileUser = (props) => {
    const { userName } = props
    const user = useSelector(selectCurrenUser)
    const userId = getUserIdFromCookie()

    const navigate = useNavigate()

    const handleNavigateHomeUser = () => {
        navigate(`/welcome/home-user/${userId}`)
    }

    return (
        <div
            onClick={handleNavigateHomeUser}
            className='flex gap-5 items-center cursor-pointer'>
            <Avatar
                isBordered
                src={user.avatar.url} />
            <h2 className="text-xl text-black dark:text-white font-nunito_sans">{userName}</h2>
        </div>
    )
}

export default ProfileUser

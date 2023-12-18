import { Avatar } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { getUserAvatarFromCookie, getUserIdFromCookie } from "utils/user.utils";

const ProfileUser = (props) => {
    const { userName } = props
    const userID = getUserIdFromCookie()
    const userAvatar = getUserAvatarFromCookie()
    const navigate = useNavigate()

    const handleNavigateHomeUser = () => {
        navigate(`/welcome/home-user/${userID}`)
    }

    console.log('userID', userID)

    return (
        <div
            onClick={handleNavigateHomeUser}
            className='flex gap-5 items-center cursor-pointer'>
            <Avatar
                isBordered
                src={userAvatar} />
            <h2 className="text-xl text-black dark:text-white font-mono">{userName}</h2>
        </div>
    )
}

export default ProfileUser

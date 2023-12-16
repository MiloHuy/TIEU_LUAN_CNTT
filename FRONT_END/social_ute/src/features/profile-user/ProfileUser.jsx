import { Avatar } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { getUserIdFromCookie } from "utils/user.utils";

const ProfileUser = (props) => {
    const { userName } = props
    const userID = getUserIdFromCookie()
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
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <h2 className="text-xl text-black dark:text-white font-mono">{userName}</h2>
        </div>
    )
}

export default ProfileUser

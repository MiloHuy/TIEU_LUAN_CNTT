import { Avatar } from "@nextui-org/react";
import { selectAvatarPostUser } from "app/slice/post/post.slice";
import { useSelector } from 'react-redux';

const CardHeader = ({ userName }) => {

    const user_img = useSelector(selectAvatarPostUser)

    return (
        <div className="flex flex-row gap-3 items-center h-full">
            <Avatar src={user_img} />

            <p className="text-md text-lg text-black dark:text-white font-open_sans font-bold ">
                {userName}
            </p>
        </div>
    )
}

export default CardHeader

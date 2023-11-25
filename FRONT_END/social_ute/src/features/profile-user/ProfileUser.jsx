import { Avatar } from "@nextui-org/react";

const ProfileUser = (props) => {

    return (
        <div className='flex gap-5 items-center'>
            <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <h2 className="text-sm text-black dark:text-white font-open_sans font-bold">UserName</h2>
        </div>
    )
}

export default ProfileUser

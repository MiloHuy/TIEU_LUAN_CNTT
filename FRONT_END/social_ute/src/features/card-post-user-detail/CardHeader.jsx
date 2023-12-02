import { Avatar } from "@nextui-org/react";

const CardHeader = ({ userName }) => {

    return (
        <div className="flex flex-row gap-3 items-center">
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />

            <p className="text-md text-lg text-black dark:text-white font-open_sans font-bold ">
                {userName}
            </p>
        </div>
    )
}

export default CardHeader

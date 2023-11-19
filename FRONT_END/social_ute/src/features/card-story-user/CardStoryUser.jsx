import { Avatar } from "@nextui-org/avatar"

const CardStoryUser = (props) => {
    return (
        <div className='flex flex-col gap-2 justify-center items-center space-x-1'>
            <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <h2 className='text-sm text-black dark:text-white font-bold font-merriweather text-center'>MiloHuy</h2>
        </div>
    )
}

export default CardStoryUser

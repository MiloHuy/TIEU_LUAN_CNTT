import { Avatar } from "@nextui-org/avatar";
import { useDisclosure } from '@nextui-org/react';
import ModalStory from "features/modal-story";

const CardStoryUser = (props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleOpenStory = () => {
        onOpen()
    }
    return (
        <div className='flex flex-col gap-2 justify-center items-center space-x-1'>
            <Avatar
                isBordered
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                onClick={handleOpenStory}
                className='cursor-pointer'
            />
            <h2 className='text-sm text-black dark:text-white font-bold font-merriweather text-center'>MiloHuy</h2>

            <ModalStory
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </div>
    )
}

export default CardStoryUser

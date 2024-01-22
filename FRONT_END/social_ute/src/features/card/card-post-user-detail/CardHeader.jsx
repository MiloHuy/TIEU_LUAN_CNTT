import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { selectAvatarPostUser, selectFirtName, selectLastName } from "app/slice/post/post.slice";
import ModalShowMoreOptions from "features/modal/modal-show-more-options";
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getFullName } from "utils/user.utils";

const CardHeader = ({ handleCallbackLikePost, handleCallbackSavedPost }) => {
    const userFirstName = useSelector(selectFirtName)
    const userLastName = useSelector(selectLastName)
    const user_img = useSelector(selectAvatarPostUser)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="flex flex-row gap-3 items-center h-full">
            <Avatar src={user_img} />

            <p className="text-md text-lg text-black dark:text-white font-nunito_sans">
                {getFullName(userFirstName, userLastName)}
            </p>

            <Button
                onClick={() => onOpen()}
                className='w-[20px] '
                size="sm"
                isIconOnly
                variant="light"
            >
                <MoreHorizontal size={28} strokeWidth={0.75} />

            </Button>

            <ModalShowMoreOptions
                isOpenShowMore={isOpen}
                onOpenChangeShowMore={onOpenChange}

                handleCallbackLikePost={handleCallbackLikePost}
                handleCallbackSavedPost={handleCallbackSavedPost}
            />
        </div>
    )
}

export default CardHeader

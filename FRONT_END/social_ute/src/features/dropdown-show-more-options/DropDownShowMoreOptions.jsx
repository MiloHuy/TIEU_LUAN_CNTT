import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { Bookmark, Heart, MoreHorizontal, SendHorizontal, Trash2 } from 'lucide-react';
import { getUserIdFromCookie } from "utils/user.utils";

const DropDownShowMoreOptions = ({ user_id }) => {
    const id = getUserIdFromCookie()

    const handleDeletePost = async () => {
        try {

        }
        catch (err) {

        }
    }

    return (
        <Dropdown
            className='bg-bg_dropdown_primary gap-2 flex'
        >
            <DropdownTrigger>
                <Button
                    className='w-[20px] '
                    size="sm"
                    isIconOnly
                    variant="light"
                >
                    <MoreHorizontal size={28} strokeWidth={0.75} />

                </Button>
            </DropdownTrigger>

            <DropdownMenu
                aria-label="Select Actions"
                color='default'
                variant="faded"
            >
                <DropdownSection
                    showDivider
                >
                    <DropdownItem
                        className='text-white '
                        key="new"
                        startContent={<Bookmark size={18} strokeWidth={0.75} />}
                    >
                        <p className='text-md font-open_sans font-bold gap-2'>
                            Lưu bài viết
                        </p>
                    </DropdownItem>

                    <DropdownItem
                        className='text-white '
                        key="like"
                        startContent={<Heart size={18} strokeWidth={0.75} />}
                    >
                        <p className='text-md font-open_sans font-bold dark:text-white gap-2'>Yêu thích bài viết</p>
                    </DropdownItem>

                    <DropdownItem
                        className='text-white '
                        key="share"
                        startContent={
                            <SendHorizontal
                                size={18}
                                strokeWidth={0.75}
                                className='transform -rotate-28 -translate-y-0.5' />}
                    >
                        <p className='text-md font-open_sans font-bold dark:text-white gap-2'> Chia sẻ bài viết</p>
                    </DropdownItem>

                </DropdownSection>
                {
                    user_id._id === id ?
                        <DropdownItem
                            className='text-white'
                            key="delete"
                            onClick={handleDeletePost}
                            startContent={
                                <Trash2 size={18} color="#d04e4e" strokeWidth={0.75} />}
                        >
                            <p className='text-md font-open_sans font-bold dark:text-white gap-2'>
                                Xóa bài viết
                            </p>
                        </DropdownItem>
                        : ''
                }
            </DropdownMenu>
        </Dropdown >
    )
}

export default DropDownShowMoreOptions

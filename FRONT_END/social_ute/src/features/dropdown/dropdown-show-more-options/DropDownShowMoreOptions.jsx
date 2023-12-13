import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import ModalConfirm from "features/modal/modal-confirm";
import { Bookmark, Heart, MoreHorizontal, SendHorizontal, Trash2 } from 'lucide-react';
import { useState } from "react";
import { getUserIdFromCookie } from "utils/user.utils";

const DropDownShowMoreOptions = ({ user_id, post_id }) => {
    const id = getUserIdFromCookie()
    const { onOpen, onClose } = useDisclosure();
    const [openModal, setOpenModal] = useState({
        drop_down: false,
        alert_modal: false,
    })

    const handleOpenDropDown = () => {
        setOpenModal((prev) => ({
            ...prev,
            drop_down: true
        }))
    }

    const handleOpenModelAlert = () => {
        setOpenModal((prev) => ({
            ...prev,
            alert_modal: true
        }))
    }

    const handleOpenModal = () => {
        console.log('adasd')
        if (openModal.drop_down === true && openModal.alert_modal !== true) {
            onOpen()
        }
        else if (openModal.alert_modal === true && openModal.drop_down !== true) {
            onOpen()
        }
    }

    const handleCloseModal = () => {
        if (openModal.drop_down === true && openModal.alert_modal !== true) {
            setOpenModal((prev) => ({
                ...prev,
                drop_down: false
            }))

            onClose()
        }
        else if (openModal.alert_modal === true && openModal.drop_down !== true) {
            setOpenModal((prev) => ({
                ...prev,
                alert_modal: false
            }))
            onClose()
        }
    }

    const handleActionByKey = (key) => {
        console.log('key', key);
        if (key === 'delete') {
            handleCloseModal()
            handleOpenModelAlert()
        }
    }

    return (
        <div>
            <Dropdown
                isOpen={openModal.drop_down}
                onOpenChange={handleOpenModal}
                onClose={handleCloseModal}
                className='bg-bg_dropdown_primary gap-2 flex'
            >
                <DropdownTrigger>
                    <Button
                        onClick={handleOpenDropDown}
                        className='w-[20px] '
                        size="sm"
                        isIconOnly
                        variant="light"
                    >
                        <MoreHorizontal size={28} strokeWidth={0.75} />

                    </Button>
                </DropdownTrigger>

                <DropdownMenu
                    selectionMode="single"
                    aria-label="Select Actions"
                    color='default'
                    variant="faded"
                    onAction={(key) => handleActionByKey(key)}
                >

                    <DropdownItem
                        showDivider
                        className='text-white '
                        key="like"
                        textValue='Yêu thích bài viết'
                        startContent={<Heart size={18} strokeWidth={0.75} />}
                    >
                        <p className='text-md font-open_sans font-bold dark:text-white gap-2'>Yêu thích bài viết</p>
                    </DropdownItem>

                    <DropdownItem
                        showDivider
                        className='text-white '
                        key="save"
                        startContent={<Bookmark size={18} strokeWidth={0.75} />}
                    >
                        <p className='text-md font-open_sans font-bold gap-2'>
                            Lưu bài viết
                        </p>
                    </DropdownItem>

                    <DropdownItem
                        className='text-white '
                        key="share"
                        showDivider
                        startContent={
                            <SendHorizontal
                                size={18}
                                strokeWidth={0.75}
                                className='transform -rotate-28 -translate-y-0.5' />}
                    >
                        <p className='text-md font-open_sans font-bold dark:text-white gap-2'> Chia sẻ bài viết</p>
                    </DropdownItem>

                    {
                        user_id._id === id
                            ?
                            <DropdownItem
                                className='text-white'
                                key="delete"
                                onClick={handleOpenModal}
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

            <ModalConfirm
                isOpen={openModal.alert_modal}
                onOpenChange={handleOpenModal}
                onClose={handleCloseModal}

                post_id={post_id}
            />
        </div>
    )
}

export default DropDownShowMoreOptions

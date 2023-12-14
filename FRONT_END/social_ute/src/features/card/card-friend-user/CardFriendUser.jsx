import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import ModalConfirm from "features/modal/modal-confirm";
import { MoreHorizontal, XCircle } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { unFriend } from "services/user.svc";
import { getFullName } from "utils/user.utils";

const CardFriendUser = ({ friend }) => {
    const { onOpen, onClose } = useDisclosure();
    const [openModal, setOpenModal] = useState({
        drop_down: false,
        confirm_modal: false,
    })
    const navigate = useNavigate()

    const handleOpenDropDown = () => {
        setOpenModal((prev) => ({
            ...prev,
            drop_down: true
        }))
    }

    const handleOpenModelAlert = () => {
        setOpenModal((prev) => ({
            ...prev,
            confirm_modal: true
        }))
    }

    const handleOpenModal = () => {
        if (openModal.drop_down === true && openModal.confirm_modal !== true) {
            onOpen()
        }
        else if (openModal.confirm_modal === true && openModal.drop_down !== true) {
            onOpen()
        }
    }

    const handleCloseModal = () => {
        if (openModal.drop_down === true && openModal.confirm_modal !== true) {
            setOpenModal((prev) => ({
                ...prev,
                drop_down: false
            }))

            onClose()
        }
        else if (openModal.confirm_modal === true && openModal.drop_down !== true) {
            setOpenModal((prev) => ({
                ...prev,
                confirm_modal: false
            }))
            onClose()
        }
    }

    const handleActionByKey = (key) => {
        if (key === 'unfriend') {
            handleCloseModal()
            handleOpenModelAlert()
        }
    }

    const handleUnFriend = async () => {
        try {
            await unFriend(friend._id)

            toast.success('Hủy kết bạn thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            window.location.reload()
        }
        catch (err) {
            console.log('err :' + err)

            toast.error('Hủy kết bạn thất bạn!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const handleNavigateFriend = (id) => {
        navigate(`/welcome/home-guest/${id}`)
    }

    return (
        <div className="relative group w-full h-[100px] rounded-[15px] border flex">
            <img
                className="h-full rounded-[15px] p-2"
                alt='friend'
                src={friend.avatar.url}
            />

            <div className='flex justify-between items-center w-full'>
                <div
                    onClick={() => handleNavigateFriend(friend._id)}
                    className="flex flex-col gap-2 h-full justify-center cursor-pointer">
                    <p className="text-sm text-black dark:text-white font-open_sans font-bold">
                        {getFullName(friend.first_name, friend.last_name)}
                    </p>

                    <p className="text-sm text-black dark:text-white font-open_sans font-bold">
                        Đoàn khoa
                    </p>
                </div>

                <Dropdown
                    className='bg-bg_dropdown_primary '
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
                        onAction={(key) => handleActionByKey(key)}
                        aria-label="unfriend"
                    >
                        <DropdownItem
                            showDivider
                            key="unfriend"
                            onClick={() => handleOpenModal(friend._id)}
                            className="text-white"
                            endContent={<XCircle size={20} strokeWidth={0.75} />}
                        >
                            <p className='text-md font-open_sans font-bold gap-2'>
                                Hủy kết bạn
                            </p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <ModalConfirm
                title='Bạn có chắc chắn muốn hủy kết bạn?'
                isOpen={openModal.confirm_modal}
                onOpenChange={handleOpenModal}
                onClose={handleCloseModal}

                handleCallback={handleUnFriend}
            />
        </div>
    )
}

export default CardFriendUser
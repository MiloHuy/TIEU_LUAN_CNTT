import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import ModalConfirm from "features/modal/modal-confirm";
import { Bookmark, Heart, MoreHorizontal, Trash2 } from 'lucide-react';
import { useCallback, useState } from "react";
import { toast } from 'react-toastify';
import { deletePost } from "services/post.svc";
import { getUserIdFromCookie } from "utils/user.utils";

const DropDownShowMoreOptions = ({ user_id, post_id, statusPost, handleCallbackLikedPost, handleCallbackSavedPost }) => {
    const id = getUserIdFromCookie()
    const { onOpen, onClose } = useDisclosure();
    const [openModal, setOpenModal] = useState({
        drop_down: false,
        confirm_modal: false,
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleCallBackLikedPost = useCallback(() => {
        handleCallbackLikedPost();
    }, [handleCallbackLikedPost])

    const handleLikePost = async () => {
        try {
            handleCallBackLikedPost()
        }
        catch (err) {
            console.log('error:', err)
        }
    }

    const handleCallBackSavedPost = useCallback(() => {
        handleCallbackSavedPost();
    }, [handleCallbackSavedPost])

    const handleSavePost = async () => {
        try {
            handleCallBackSavedPost()
        }
        catch (err) {
            console.log('error:', err)
        }
    }

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
        if (key === 'delete') {
            handleCloseModal()
            handleOpenModelAlert()
        }
    }

    const handleDeletePost = async () => {
        setIsLoading(true)
        try {
            await deletePost(post_id)

            toast.success('Xóa bài viết thành công!!!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setIsLoading(false);

            setTimeout(() => { window.location.reload() }, 1500)
        }
        catch (err) {

            toast.error('Xóa bài viết thất bại!!!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const CopyURL = () => {
        const el = document.createElement("input");
        el.value = `http://localhost:8080/welcome/post/${post_id}`
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);

        console.log('el.value:' + el.value)

        toast.success('Sao chép đường dẫn thành công!!!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

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
                        onClick={handleLikePost}
                        textValue='Yêu thích bài viết'
                        startContent={
                            <Heart
                                size={18}
                                strokeWidth={0.75}
                                fill={statusPost.isLiked === true ? 'red' : 'none'}
                            />
                        }
                    >
                        <p className='text-md font-nunito_sans dark:text-white gap-2'>
                            {statusPost.isLiked === true ? 'Hủy yêu thích' : 'Yêu thích bài viết'}
                        </p>
                    </DropdownItem>

                    <DropdownItem
                        showDivider
                        className='text-white '
                        key="save"
                        onClick={handleSavePost}
                        startContent={
                            <Bookmark
                                fill={statusPost.isSaved === true ? 'yellow' : 'none'}
                                size={18}
                                strokeWidth={0.75} />}
                    >
                        <p className='text-md font-nunito_sans gap-2'>
                            {statusPost.isSaved === true ? 'Hủy lưu' : 'Lưu bài viết'}
                        </p>
                    </DropdownItem>

                    <DropdownItem
                        showDivider
                        className='text-white '
                        key="save"
                        startContent={
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                <path fill="#4d4e51" d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                            </svg>
                        }
                    >
                        <p className='text-md font-nunito_sans gap-2'>
                            Phạm vi bài viết
                        </p>
                    </DropdownItem>

                    {/* <DropdownItem
                        className='text-white '
                        key="share"
                        onClick={CopyURL}
                        showDivider
                        startContent={
                            <SendHorizontal
                                size={18}
                                strokeWidth={0.75}
                                className='transform -rotate-28 -translate-y-0.5' />}
                    >
                        <p className='text-md font-nunito_sans dark:text-white gap-2'> Chia sẻ bài viết</p>
                    </DropdownItem> */}

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
                                <p className='text-md font-nunito_sans dark:text-white gap-2'>
                                    Xóa bài viết
                                </p>
                            </DropdownItem>
                            : ''
                    }
                </DropdownMenu>
            </Dropdown >

            <ModalConfirm
                isLoading={isLoading}
                title='Có phải bạn muốn xóa bài viết?'
                isOpen={openModal.confirm_modal}
                onOpenChange={handleOpenModal}
                onClose={handleCloseModal}

                handleCallback={handleDeletePost}
            />
        </div>
    )
}

export default DropDownShowMoreOptions

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
                        <p className='text-md font-mono dark:text-white gap-2'>
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
                                color={statusPost.isSaved === true ? 'yellow' : '#ffffff'}
                                fill={statusPost.isSaved === true ? 'yellow' : 'none'}
                                size={18}
                                strokeWidth={0.75} />}
                    >
                        <p className='text-md font-mono gap-2'>
                            {statusPost.isSaved === true ? 'Hủy lưu' : 'Lưu bài viết'}
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
                        <p className='text-md font-mono dark:text-white gap-2'> Chia sẻ bài viết</p>
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
                                <p className='text-md font-mono dark:text-white gap-2'>
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

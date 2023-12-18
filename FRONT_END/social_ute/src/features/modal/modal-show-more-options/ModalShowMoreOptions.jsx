import { Button, Divider, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { selectPostId, selectStatusLikedPost, selectStatusSavedPost } from "app/slice/post/post.slice";
import { SendHorizontal, Trash2 } from 'lucide-react';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deletePost } from "services/post.svc";
import ModalConfirm from "../modal-confirm";

const ModalShowMoreOptions = ({ isOpenShowMore, onOpenChangeShowMore }) => {
    const statusPost = {
        liked: useSelector(selectStatusLikedPost), // boolean
        saved: useSelector(selectStatusSavedPost) // boolean
    }

    const post_id = useSelector(selectPostId)
    const [isOpenConfirm, setOpenConfirm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { onOpen, onClose } = useDisclosure();

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

            setIsLoading(false)

            setTimeout(() => { window.location.reload() }, 2500)

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

    const handleOpenModalConfirm = () => {
        if (isOpenConfirm === true) {
            onOpen()
        }
    }

    const handleCloseModalConfirm = () => {
        if (isOpenConfirm === true) {
            setOpenConfirm(false)
        }
        onClose()
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
        <Modal
            isOpen={isOpenShowMore}
            onOpenChange={onOpenChangeShowMore}
            radius="sm"
            size='2xl'
            backdrop='opaque'
            hideCloseButton={true}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                }
            }}
            classNames={{
                base: "border-[#ffffff] bg-[#323232] dark:bg-black text-[#a8b0d3] w-[300px] h-[200px] ",
            }}
        >
            <ModalContent>
                {() => (
                    <div className="flex flex-col gap-4 justify-between items-center w-full h-full py-3">
                        <div className="grid grid-cols-1 gap-2 h-full">
                            {/* <Button
                                variant="light"
                                className='text-white w-full flex justify-start text-lg font-normal'
                                key="like"
                                startContent={
                                    <Heart
                                        fill={postStatus.liked === true ? 'red' : 'none'}
                                        size={19}
                                        strokeWidth={1} />}
                            >
                                <p className='text-md font-open_sans font-bold dark:text-white gap-2'>
                                    {postStatus.liked === true ? 'Hủy yêu thích' : 'Yêu thích bài viết'}
                                </p>
                            </Button>

                            <Button
                                variant="light"
                                className='text-white w-full flex justify-start text-lg font-normal'
                                key="save"
                                startContent={<Bookmark size={19} strokeWidth={1} fill={postStatus.saved === true ? 'yellow' : 'none'} />}
                            >
                                <p className='text-md font-open_sans font-bold gap-2'>
                                    {postStatus.saved === true ? 'Hủy lưu bài viêt' : 'Lưu bài viết'}
                                </p>
                            </Button> */}
                            <p className='text-2xl font-mono font-bold text-white gap-2 text-center'>Tùy chọn</p>
                            <Divider className="w-full bg-white" />
                            <div className="flex flex-col gap-3">
                                <Button
                                    className='text-white w-full flex justify-start text-lg font-normal'
                                    key="share"
                                    variant="light"
                                    onClick={CopyURL}
                                    startContent={
                                        <SendHorizontal
                                            size={18}
                                            strokeWidth={1}
                                            className='transform -rotate-28 -translate-y-0.5' />}
                                >
                                    <p className='text-md font-mono font-bold dark:text-white gap-2'> Chia sẻ bài viết</p>
                                </Button>

                                <Button
                                    onClick={() => setOpenConfirm(true)}
                                    className='text-white w-full flex justify-start text-lg font-normal'
                                    key="share"
                                    variant="light"
                                    startContent={
                                        <Trash2
                                            color='red'
                                            size={18}
                                            strokeWidth={1}
                                        />}
                                >
                                    <p className='text-md font-mono font-bold dark:text-white gap-2'> Xóa bài viết</p>
                                </Button>

                                <ModalConfirm
                                    isLoading={isLoading}
                                    title='Bạn có chắc chắn muốn xóa bài viết?'
                                    isOpen={isOpenConfirm}
                                    onOpenChange={handleOpenModalConfirm}
                                    onClose={handleCloseModalConfirm}

                                    handleCallback={handleDeletePost}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalShowMoreOptions

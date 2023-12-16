import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { setPostInit } from "app/slice/post/post.slice";
import CardPostUserDetail from "features/card/card-post-user-detail";
import { useDispatch } from 'react-redux';

const ModalPostUser = ({ isOpen, onOpenChange, handleCallbackLikePost, handleCallbackSavedPost }) => {
    const dispatch = useDispatch()

    const { onClose } = useDisclosure();

    const handleCloseModal = () => {
        onClose()
        dispatch(setPostInit())
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleCloseModal}
            radius="sm"
            size='5xl'
            backdrop='blur'
            stlye={{ height: '1000px' }}
            classNames={{
                base: "border-[#ffffff] bg-[#929292] dark:bg-black text-[#a8b0d3]",
            }}
        >
            <ModalContent>
                {() => (
                    <>
                        {
                            <CardPostUserDetail
                                handleCallbackLikePost={handleCallbackLikePost}
                                handleCallbackSavedPost={handleCallbackSavedPost}
                            />

                        }
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalPostUser

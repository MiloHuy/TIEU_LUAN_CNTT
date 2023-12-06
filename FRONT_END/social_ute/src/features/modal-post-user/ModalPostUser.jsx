import { Modal, ModalBody, ModalContent, Spinner } from "@nextui-org/react";
import { selectPostDescription, selectPostImg } from "app/slice/post/post.slice";
import CardPostUserDetail from "features/card-post-user-detail";
import { useSelector } from 'react-redux';

const ModalPostUser = ({ isOpen, onOpenChange, userName, }) => {
    const post_img = useSelector(selectPostImg)
    const post_description = useSelector(selectPostDescription)

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            radius="2xl"
            size='5xl'
            backdrop='blur'
            stlye={{ height: '1000px' }}
            classNames={{
                base: "border-[#ffffff] bg-[#929292] dark:bg-black text-[#a8b0d3]",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody>
                            {
                                post_img ?
                                    <CardPostUserDetail
                                        userName={userName}
                                        post_img={post_img}
                                        post_description={post_description}
                                    />
                                    :
                                    <Spinner color="default" />
                            }
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalPostUser

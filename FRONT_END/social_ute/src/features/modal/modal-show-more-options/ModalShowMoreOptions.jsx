import { Button, Modal, ModalContent } from "@nextui-org/react";
import { Bookmark, Heart, SendHorizontal, Trash2 } from 'lucide-react';

const ModalShowMoreOptions = ({ isOpen, onOpenChange }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
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
                    <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
                        <div className="flex flex-col gap-2">
                            <Button
                                variant="light"
                                className='text-white w-full flex justify-start text-lg font-normal'
                                key="like"
                                textValue='Yêu thích bài viết'
                                startContent={<Heart size={19} strokeWidth={1} />}
                            >
                                <p className='text-md font-open_sans font-bold dark:text-white gap-2'>Yêu thích bài viết</p>
                            </Button>

                            <Button
                                variant="light"
                                className='text-white w-full flex justify-start text-lg font-normal'
                                key="save"
                                startContent={<Bookmark size={19} strokeWidth={1} />}
                            >
                                <p className='text-md font-open_sans font-bold gap-2'>
                                    Lưu bài viết
                                </p>
                            </Button>

                            <Button
                                className='text-white w-full flex justify-start text-lg font-normal'
                                key="share"
                                variant="light"
                                startContent={
                                    <SendHorizontal
                                        size={19}
                                        strokeWidth={1}
                                        className='transform -rotate-28 -translate-y-0.5' />}
                            >
                                <p className='text-md font-open_sans font-bold dark:text-white gap-2'> Chia sẻ bài viết</p>
                            </Button>

                            <Button
                                className='text-white w-full flex justify-start text-lg font-normal'
                                key="share"
                                variant="light"
                                startContent={
                                    <Trash2
                                        size={19}
                                        strokeWidth={1}
                                    />}
                            >
                                <p className='text-md font-open_sans font-bold dark:text-white gap-2'> Xóa bài viết</p>
                            </Button>
                        </div>
                    </div>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalShowMoreOptions

import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import FormUploadImageAvatar from 'features/form/form-upload-image-avatar';

const ModalChangeAvatar = ({ isOpen, onOpenChange, onClose }) => {
    return (
        <Modal
            scrollBehavior='outside'
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            radius="3xl"
            size='lg'
            backdrop='blur'
            classNames={{
                base: "border-[#ffffff] bg-[#0C0C0C] dark:bg-black text-[#a8b0d3] h-[520px]",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader
                            className="flex gap-1 justify-center text-white">
                            Thay đổi ảnh đại diện
                        </ModalHeader>

                        <ModalBody>
                            <FormUploadImageAvatar />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalChangeAvatar

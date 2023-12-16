import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import FormUploadImageFile from 'features/form/form-upload-image-file';

const ModalUploadImageFile = ({ isOpen, onOpenChange, onClose }) => {
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
                            Tạo bài viết mới - File
                        </ModalHeader>

                        <ModalBody>
                            <FormUploadImageFile />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalUploadImageFile

import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import FormUploadImageFile from 'features/form/form-upload-image-file';

const ModalUploadImageFile = ({ isOpen, onOpenChange, onClose }) => {
    return (
        <Modal
            scrollBehavior='outside'
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            radius="2xl"
            size='sm'
            backdrop='blur'
            stlye={{ height: '1000px' }}
            classNames={{
                base: "border-[#ffffff] bg-[#929292] dark:bg-black text-[#a8b0d3]",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader
                            className="flex flex-col gap-1 justify-center text-black">
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

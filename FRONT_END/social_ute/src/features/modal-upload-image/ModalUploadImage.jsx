import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import FormUploadImage from 'features/form-upload-image';

const ModalUploadImage = ({ isOpen, onOpenChange }) => {
    return (
        <Modal
            scrollBehavior='outside'
            isOpen={isOpen}
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
                            Tạo bài viết mới
                        </ModalHeader>

                        <ModalBody>
                            <FormUploadImage />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalUploadImage

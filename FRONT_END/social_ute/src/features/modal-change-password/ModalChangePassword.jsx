import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import FormChangePassword from "features/form-change-password";

const ModalChangePassword = ({ isOpen, onOpenChange, onClose }) => {

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            radius="2xl"
            size='md'
            backdrop='blur'
            stlye={{ height: '1000px' }}
            classNames={{
                body: "py-6",
                base: "border-[#292f46] bg-[#202120] dark:bg-[#525451] text-[#a8b0d3]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalBody>
                            <FormChangePassword />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalChangePassword

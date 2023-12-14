import { Button, Modal, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Check, X } from 'lucide-react';
import { useCallback } from "react";

const ModalConfirm = ({ isOpen, onOpenChange, handleCallback, onClose, title }) => {

    const handleAgree = useCallback(() => {
        handleCallback();
    }, [handleCallback])

    return (
        <Modal
            hideCloseButton={true}
            isDismissable={false}
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            radius="2xl"
            size='md'
            backdrop='blur'
            stlye={{ height: '1000px' }}
            classNames={{
                body: "py-6",
                base: "bordered-[#292f46] bg-[#202120] dark:bg-[#525451] text-[#a8b0d3]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        >

            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-center">
                            {title}
                        </ModalHeader>

                        <ModalFooter>
                            <div className='w-full grid grid-cols-2 gap-2 items-center'>
                                <Button
                                    color="danger"
                                    variant="bordered"
                                    onPress={handleAgree}
                                    endContent={<Check size={16} strokeWidth={0.75} />}
                                >
                                    Có
                                </Button>

                                <Button
                                    variant="bordered"
                                    color="primary"
                                    onPress={onClose}
                                    endContent={<X size={16} strokeWidth={0.75} />}
                                >
                                    Không
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalConfirm

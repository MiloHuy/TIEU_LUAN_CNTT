import { Modal, ModalBody, ModalContent, ModalHeader, Progress } from "@nextui-org/react";
import Story from "components/story";
import { useEffect, useState } from "react";

const ModalStory = ({ isOpen, onOpenChange }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            const interval = setInterval(() => {
                setValue((v) => v + 1);
            }, 10);

            return () => clearInterval(interval)
        }, 5000)

    }, [])

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            radius="2xl"
            size='sm'
            backdrop='blur'
            hideCloseButton='true'
            stlye={{ height: '1000px' }}
            classNames={{
                base: "border-[#ffffff] bg-[#929292] dark:bg-black text-[#a8b0d3]",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <Progress
                                size="sm"
                                aria-label="Story..."
                                value={value}
                                color="default"
                                className="w-full"
                            /></ModalHeader>

                        <ModalBody  >
                            <Story />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalStory

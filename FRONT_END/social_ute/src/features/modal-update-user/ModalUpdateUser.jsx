import { Modal, ModalBody, ModalContent, Spinner } from "@nextui-org/react";
import FormUpdateUser from "features/form-update-user";

const ModalUpdateUser = ({ isOpen, onOpenChange, updateUser }) => {

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
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
                            {
                                updateUser ?
                                    <FormUpdateUser
                                        updateUser={updateUser.data}
                                    />
                                    :
                                    <div className="w-96 h-full flex justify-center">
                                        <Spinner color="default" size="lg" />
                                    </div>
                            }

                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalUpdateUser

import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import clsx from 'clsx';
import FormUploadImage from 'features/form-upload-image';

const SidebarBody = (props) => {
    const { icons, className } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSearch = () => {
        console.log("HandleSearch")
    }

    const hanldeNofication = () => {
        console.log("hanldeNofication")
    }

    const handleOpenModelCreate = () => {
        onOpen()
    }

    const handleEventSidebar = (name) => {
        switch (name) {
            case 'Search':
                handleSearch()
                return;
            case 'Nofitcation':
                hanldeNofication()
                return;
            case 'Create':
                handleOpenModelCreate()
                return
            default:
                return
        }
    }

    return (
        <div className={clsx('w-full h-full', className)}>
            <div className='w-full h-full flex flex-col gap-4 p-2 '>
                {icons.map((item) => {
                    return (
                        <div key={item.name} className='flex flex-row gap-2 justify-center'>
                            <Button
                                className='w-full flex justify-start gap-6'
                                color="default"
                                variant="light"
                                onClick={() => handleEventSidebar(item.name)}
                                startContent={item.icon}
                            >
                                <p className='font-merriweather text-lg font-bold'>
                                    {item.name}
                                </p>
                            </Button>
                        </div>
                    )
                })}
            </div>

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
        </div >
    )
}

export default SidebarBody

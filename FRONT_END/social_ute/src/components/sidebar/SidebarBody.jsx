import { Button, useDisclosure } from '@nextui-org/react';
import clsx from 'clsx';
import ModalUploadImage from 'features/modal-upload-image';
import { useNavigate } from 'react-router-dom';

const SidebarBody = (props) => {
    const { icons, className, userID } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const navigate = useNavigate()

    const handleNavigateUser = (link) => {
        navigate(`home-user/${userID}`)
    }

    const handleSearch = () => {
        console.log("HandleSearch")
    }

    const hanldeNofication = () => {
        console.log("hanldeNofication")
    }

    const handleOpenModelCreate = () => {
        onOpen()
    }

    const handleEventSidebar = (name, link) => {
        switch (name) {
            case "Home":
                navigate(link)
                return;
            case 'Search':
                handleSearch()
                return;
            case 'Nofitcation':
                hanldeNofication()
                return;
            case 'User':
                handleNavigateUser(link)
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
            <div className='w-full h-full grid grid-cols-1 gap-2 p-2 '>
                {icons.map((item) => {
                    return (
                        <div key={item.name} className='flex flex-row gap-2 justify-center'>
                            <Button
                                className='w-full flex justify-start gap-6'
                                color="default"
                                variant="light"
                                onClick={() => handleEventSidebar(item.name, item.link)}
                                startContent={item.icon}
                            >
                                <p className='font-mont text-lg font-bold'>
                                    {item.name}
                                </p>
                            </Button>
                        </div>
                    )
                })}
            </div>

            <ModalUploadImage
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />

        </div >
    )
}

export default SidebarBody

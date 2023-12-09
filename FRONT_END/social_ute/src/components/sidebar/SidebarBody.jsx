import { Button, useDisclosure } from '@nextui-org/react';
import clsx from 'clsx';
import ModalUploadImage from 'features/modal-upload-image';
import PopupNofication from 'features/popup-nofication';
import PopupSearch from 'features/popup-search';
import { AlignJustify, Bell, Home, LogOut, PlusCircle, Search, UserCircle2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SidebarBody = (props) => {
    const { icons, className, userID } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const navigate = useNavigate()

    const handleNavigateUser = () => {
        navigate(`home-user/${userID}`)
    }

    const handleSearch = (trigger) => {
        console.log("trigger: " + trigger)
    }

    const hanldeNofication = () => {
        console.log("hanldeNofication")
    }

    const handleOpenModelCreate = () => {
        onOpen()
    }

    const handleNavigateHome = () => {
        navigate('/welcome')
    }

    return (
        <div className={clsx('w-full h-full', className)}>
            <div className='w-full h-full grid grid-cols-1 gap-2 p-2 '>
                <div className='flex flex-col gap-2 justify-center'>
                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleNavigateHome}
                        startContent={<Home />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            Home
                        </p>
                    </Button>

                    <PopupSearch
                        trigger={
                            <Button
                                className='w-full flex justify-start gap-6'
                                color="default"
                                variant="light"
                                startContent={<Search />}
                            >
                                <p className='font-mont text-lg font-bold'>
                                    Search
                                </p>
                            </Button>
                        }
                    />

                    <PopupNofication
                        trigger={
                            <Button
                                className='w-full flex justify-start gap-6'
                                color="default"
                                variant="light"
                                startContent={<Bell />}
                            >
                                <p className='font-mont text-lg font-bold'>
                                    Nofitcation
                                </p>
                            </Button>
                        }
                    />

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleNavigateUser}
                        startContent={<UserCircle2 />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            User
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleOpenModelCreate}
                        startContent={<PlusCircle />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            Create
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        startContent={<AlignJustify />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            More
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        startContent={<LogOut />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            LogOut
                        </p>
                    </Button>

                </div>
            </div>

            <ModalUploadImage
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />

        </div >
    )
}

export default SidebarBody

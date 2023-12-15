import { Button, useDisclosure } from '@nextui-org/react';
import clsx from 'clsx';
import { SSOCOOKIES } from 'constants/app.const';
import { USERCOOKIES } from 'constants/user.const';
import ModalUploadImageBase64 from 'features/modal/modal-upload-image-base64';
import ModalUploadImageFile from 'features/modal/modal-upload-image-file';
import PopupNofication from 'features/popup/popup-nofication';
import PopupSearch from 'features/popup/popup-search';
import Cookies from 'js-cookie';
import { AlignJustify, Bell, Home, LogOut, PlusCircle, Search, UserCircle2, UserPlus } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from 'services/auth.svc';

const SidebarBody = (props) => {
    const { icons, className, userID } = props
    const { onOpen, onClose } = useDisclosure();
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState({
        modal_base_64: false,
        modal_file: false,
    })

    const handleNavigateUser = () => {
        navigate(`home-user/${userID}`)
    }

    const handleNavigateRequest = () => {
        navigate('request-friend')
    }

    const handleOpenModelCreate01 = () => {
        setOpenModal((prev) => ({
            ...prev,
            modal_base_64: true
        }))
    }

    const handleOpenModelCreate02 = () => {
        setOpenModal((prev) => ({
            ...prev,
            modal_file: true
        }))
    }

    const handleNavigateHome = () => {
        navigate('/welcome')
    }

    const handleLogOut = async () => {
        try {
            await logout()

            Cookies.remove(USERCOOKIES.userID)
            Cookies.remove(USERCOOKIES.userName)
            Cookies.remove(SSOCOOKIES.access)

            window.location.reload();
        }
        catch (err) {
            console.log('err: ', err)
        }
    }

    const handleOpenModal = () => {
        if (openModal.modal_base_64 === true && openModal.modal_file !== true) {
            onOpen()
        }
        else if (openModal.modal_file === true && openModal.modal_base_64 !== true) {
            onOpen()
        }
    }

    const handleCloseModal = () => {
        if (openModal.modal_base_64 === true && openModal.modal_file !== true) {
            setOpenModal((prev) => ({
                ...prev,
                modal_base_64: false
            }))

            onClose()
        }
        else if (openModal.modal_file === true && openModal.modal_base_64 !== true) {
            setOpenModal((prev) => ({
                ...prev,
                modal_file: false
            }))
            onClose()
        }
    }

    return (
        <div className={clsx('w-full h-full', className)}>
            <div className='w-full h-full grid grid-cols-1 gap-2 p-2 '>
                <div className='flex flex-col gap-2 justify-center'>
                    <Button
                        className='w-full flex justify-start gap-6 '
                        color="default"
                        variant="light"
                        onClick={handleNavigateHome}
                        startContent={<Home size={24} strokeWidth={0.75} className='hover:animate-ping duration-200 transform' />}
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
                                startContent={<Search size={24} strokeWidth={0.75} className='hover:animate-ping duration-200 transform' />}
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
                                startContent={<Bell size={24} strokeWidth={0.75} className='hover:animate-ping duration-200 transform' />}
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
                        startContent={<UserCircle2 size={24} strokeWidth={0.75} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            User
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleNavigateRequest}
                        startContent={<UserPlus size={24} strokeWidth={0.75} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            Requests
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleOpenModelCreate01}
                        startContent={<PlusCircle size={24} strokeWidth={0.75} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            Create01
                        </p>
                    </Button>

                    <ModalUploadImageBase64
                        isOpen={openModal.modal_base_64}
                        onOpenChange={handleOpenModal}
                        onClose={handleCloseModal}
                    />

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleOpenModelCreate02}
                        startContent={<PlusCircle size={24} strokeWidth={0.75} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            Create02
                        </p>
                    </Button>

                    <ModalUploadImageFile
                        isOpen={openModal.modal_file}
                        onOpenChange={handleOpenModal}
                        onClose={handleCloseModal}
                    />

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        startContent={<AlignJustify size={24} strokeWidth={0.75} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            More
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleLogOut}
                        startContent={<LogOut size={24} strokeWidth={0.75} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mont text-lg font-bold'>
                            LogOut
                        </p>
                    </Button>

                </div>
            </div>
        </div >
    )
}

export default SidebarBody

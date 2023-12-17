import { Button, useDisclosure } from '@nextui-org/react';
import clsx from 'clsx';
import { SSOCOOKIES } from 'constants/app.const';
import { USERCOOKIES } from 'constants/user.const';
import ModalSearchUser from 'features/modal/modal-search-user';
// import ModalUploadImageBase64 from 'features/modal/modal-upload-image-base64';
import ModalUploadImageFile from 'features/modal/modal-upload-image-file';
import PopupNofication from 'features/popup/popup-nofication';
import Cookies from 'js-cookie';
import { AlignJustify, Bell, Home, LogOut, PlusSquare, Search, UserCircle2, UserPlus } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from 'services/auth.svc';

const SidebarBody = (props) => {
    const { className, userID } = props
    const { onOpen, onClose } = useDisclosure();
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState({
        modal_search: false,
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
            modal_search: true
        }))
    }

    const handleOpenModelCreate02 = () => {
        setOpenModal((prev) => ({
            ...prev,
            modal_file: true
        }))
    }

    const handleOpenModelSearch = () => {
        setOpenModal((prev) => ({
            ...prev,
            modal_search: true
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
        console.log('adads')
        if (openModal.modal_search === true && openModal.modal_file !== true) {
            onOpen()
        }
        else if (openModal.modal_file === true && openModal.modal_search !== true) {
            onOpen()
        }
    }

    const handleCloseModal = () => {
        if (openModal.modal_search === true && openModal.modal_file !== true) {
            setOpenModal((prev) => ({
                ...prev,
                modal_search: false
            }))

            onClose()
        }
        else if (openModal.modal_file === true && openModal.modal_search !== true) {
            setOpenModal((prev) => ({
                ...prev,
                modal_file: false
            }))
            onClose()
        }
    }

    return (
        <div className={clsx('w-full h-full', className)}>
            <div className='w-full h-full grid grid-cols-1 gap-2 p-2'>
                <div className='flex flex-col gap-2 justify-center'>
                    <Button
                        className='w-full flex justify-start gap-6 '
                        color="default"
                        variant="light"
                        onClick={handleNavigateHome}
                        startContent={<Home size={24} strokeWidth={1} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mono text-xl '>
                            Trang chủ
                        </p>
                    </Button>

                    {/* <PopupSearch
                        trigger={
                            <Button
                                className='w-full flex justify-start gap-6'
                                color="default"
                                variant="light"
                                startContent={<Search size={24} strokeWidth={1} className='hover:animate-ping duration-200 transform' />}
                            >
                                <p className='font-mono text-xl '>
                                    Tìm kiếm
                                </p>
                            </Button>
                        }
                    /> */}

                    <Button
                        onClick={handleOpenModelSearch}
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        startContent={<Search size={24} strokeWidth={1} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mono text-xl '>
                            Tìm kiếm
                        </p>
                    </Button>

                    <ModalSearchUser
                        isOpen={openModal.modal_search}
                        onOpenChange={handleOpenModal}
                        onCloseModal={handleCloseModal}
                    />

                    <PopupNofication
                        trigger={
                            <Button
                                className='w-full flex justify-start gap-6'
                                color="default"
                                variant="light"
                                startContent={<Bell size={24} strokeWidth={1} className='hover:animate-ping duration-200 transform' />}
                            >
                                <p className='font-mono text-xl '>
                                    Thông báo
                                </p>
                            </Button>
                        }
                    />

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleNavigateUser}
                        startContent={<UserCircle2 size={24} strokeWidth={1} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mono text-xl '>
                            Trang cá nhân
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleNavigateRequest}
                        startContent={<UserPlus size={24} strokeWidth={1} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mono text-xl '>
                            Yêu cầu
                        </p>
                    </Button>

                    {/* <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleOpenModelCreate01}
                        startContent={<PlusCircle size={24} strokeWidth={1} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mono text-xl '>
                            Create01
                        </p>
                    </Button>

                    <ModalUploadImageBase64
                        isOpen={openModal.modal_search}
                        onOpenChange={handleOpenModal}
                        onClose={handleCloseModal}
                    /> */}

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleOpenModelCreate02}
                        startContent={<PlusSquare size={24} strokeWidth={1} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mono text-xl '>
                            Tạo
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
                        startContent={<AlignJustify size={24} strokeWidth={1} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mono text-xl '>
                            Xem thêm
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-6'
                        color="default"
                        variant="light"
                        onClick={handleLogOut}
                        startContent={<LogOut size={24} strokeWidth={1} className='hover:animate-ping duration-200 transform' />}
                    >
                        <p className='font-mono text-xl '>
                            Đăng xuất
                        </p>
                    </Button>

                </div>
            </div>
        </div >
    )
}

export default SidebarBody

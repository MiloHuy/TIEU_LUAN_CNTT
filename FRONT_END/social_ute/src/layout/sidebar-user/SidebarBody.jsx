import { useDisclosure } from '@nextui-org/react';
import { logOut } from 'app/slice/auth/auth.slice';
import clsx from 'clsx';
import { Button } from 'components/button';
import { Users } from 'components/icon/bonus.icon';
import { Toggle } from 'components/toggle';
import { SSOCOOKIES } from 'constants/app.const';
import { USERCOOKIES } from 'constants/user.const';
import ModalSearchUser from 'features/modal/modal-search-user';
import ModalUploadImageFile from 'features/modal/modal-upload-image-file';
import PopupNofication from 'features/popup/popup-nofication';
import Cookies from 'js-cookie';
import { Bell, Home, LogOut, MessagesSquare, PlusSquare, Search, UserCircle2, UserPlus } from "lucide-react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch()

    const handleNavigateUser = () => {
        navigate(`home-user/${userID}`)
    }

    const handleNavigateRequest = () => {
        navigate('request-friend')
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

            dispatch(logOut)

            Cookies.remove(USERCOOKIES.userID)
            Cookies.remove(SSOCOOKIES.access)
            navigate('/login')
        }
        catch (err) {
            console.log('err: ', err)
        }
    }

    const handleOpenModal = () => {
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
                <div className='flex flex-col gap-2 justify-between'>
                    <Toggle
                        className='w-full flex justify-start gap-3 items-center px-4 hover:scale-105'
                        variant="ghost"

                        onClick={handleNavigateHome}
                    >
                        <Home
                            size={24}
                            strokeWidth={1.5}
                        />

                        <p className='font-nunito_sans text-lg '>
                            Trang chủ
                        </p>
                    </Toggle>

                    <Button
                        className='w-full flex justify-start gap-3 items-center px-4 hover:scale-105'
                        variant="ghost"

                        onClick={handleOpenModelSearch}
                    >
                        <Search
                            size={24}
                            strokeWidth={1.5}
                        />

                        <p className='font-nunito_sans  text-lg '>
                            Tìm kiếm
                        </p>
                    </Button>

                    <ModalSearchUser
                        isOpen={openModal.modal_search}

                        onOpenChange={handleOpenModal}
                        onCloseModal={handleCloseModal}
                    />

                    <Button
                        className='w-full flex justify-start gap-3 items-center px-4 hover:scale-105'
                        variant="ghost"
                    >
                        <MessagesSquare
                            size={24}
                            strokeWidth={1.5}
                        />

                        <p className='font-nunito_sans text-lg '>
                            Tin nhắn
                        </p>
                    </Button>

                    <PopupNofication
                        trigger={
                            <Button
                                className='w-full flex justify-start gap-3 items-center px-4 hover:scale-105'
                                variant="ghost"
                            >
                                <Bell
                                    size={24}
                                    strokeWidth={1.5}
                                />

                                <p className='font-nunito_sans  text-lg '>
                                    Thông báo
                                </p>
                            </Button>
                        }
                    />

                    <Button
                        className='w-full flex justify-start gap-3 items-center px-4 hover:scale-105'
                        variant="ghost"

                        onClick={handleNavigateUser}
                    >
                        <UserCircle2
                            size={24}
                            strokeWidth={1.5}
                        />

                        <p className='font-nunito_sans text-lg '>
                            Trang cá nhân
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-3 items-center px-4 hover:scale-105 '
                        variant="ghost"
                    >
                        <Users />
                        <p className='font-nunito_sans text-lg '>
                            Nhóm
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-3 items-center px-4 hover:scale-105'
                        variant="ghost"

                        onClick={handleNavigateRequest}
                    >
                        <UserPlus
                            size={24}
                            strokeWidth={1.5}
                        />

                        <p className='font-nunito_sans text-lg '>
                            Yêu cầu
                        </p>
                    </Button>

                    <Button
                        className='w-full flex justify-start gap-3 items-center px-4 hover:scale-105'
                        variant="ghost"

                        onClick={handleOpenModelCreate02}
                    >
                        <PlusSquare
                            size={24}
                            strokeWidth={1.5}
                        />

                        <p className='font-nunito_sans text-lg '>
                            Tạo
                        </p>
                    </Button>

                    <ModalUploadImageFile
                        isOpen={openModal.modal_file}
                        onOpenChange={handleOpenModal}
                        onClose={handleCloseModal}
                    />

                    <Button
                        className='w-full flex justify-start gap-3 items-center px-4 hover:scale-105'
                        variant="ghost"

                        onClick={handleLogOut}
                    >
                        <LogOut
                            size={24}
                            strokeWidth={1.5}
                        />

                        <p className='font-nunito_sans text-lg '>
                            Đăng xuất
                        </p>
                    </Button>

                </div>
            </div>
        </div >
    )
}

export default SidebarBody

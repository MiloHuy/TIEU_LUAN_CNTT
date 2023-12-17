import { Button, useDisclosure } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AcceptFriend, RefuseRequest } from "services/user.svc";
import { getFullName } from "utils/user.utils";

const CardFriendRequest = ({ friends, handleCallback }) => {
    const { onOpen, onClose } = useDisclosure();
    const [openModal, setOpenModal] = useState({
        drop_down: false,
        confirm_modal: false,
    })
    const navigate = useNavigate()

    const initIsLoading = {
        isLoadingAccept: false,
        isLoadingRefused: false
    }
    const [isLoading, setIsLoading] = useState(initIsLoading)

    const handleNavigateFriend = (id) => {
        navigate(`/welcome/home-guest/${id}`)
    }

    const handleRefreshData = useCallback(() => {
        handleCallback();
    }, [handleCallback])

    const handleOpenDropDown = () => {
        setOpenModal((prev) => ({
            ...prev,
            drop_down: true
        }))
    }

    const handleOpenModelAlert = () => {
        setOpenModal((prev) => ({
            ...prev,
            confirm_modal: true
        }))
    }

    const handleOpenModal = () => {
        if (openModal.drop_down === true && openModal.confirm_modal !== true) {
            onOpen()
        }
        else if (openModal.confirm_modal === true && openModal.drop_down !== true) {
            onOpen()
        }
    }

    const handleCloseModal = () => {
        if (openModal.drop_down === true && openModal.confirm_modal !== true) {
            setOpenModal((prev) => ({
                ...prev,
                drop_down: false
            }))

            onClose()
        }
        else if (openModal.confirm_modal === true && openModal.drop_down !== true) {
            setOpenModal((prev) => ({
                ...prev,
                confirm_modal: false
            }))
            onClose()
        }
    }

    const handleAcceptRequest = async (id) => {
        try {
            setIsLoading((prev) => ({
                ...prev,
                isLoadingAccept: true
            }))
            await AcceptFriend(id)

            setIsLoading((prev) => ({
                ...prev,
                isLoadingAccept: false
            }))
            toast.success('Chấp nhận kết bạn thành công!!!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            handleRefreshData()
            // window.location.reload();
        }
        catch (err) {
            console.log("err:" + err)

            toast.error('Chấp nhận kết bạn thất bại!!!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const handleRefusedFriend = async (id) => {
        try {
            setIsLoading((prev) => ({
                ...prev,
                isLoadingRefused: true
            }))
            await RefuseRequest(id)

            setIsLoading((prev) => ({
                ...prev,
                isLoadingRefused: true
            }))
            toast.success('Từ chối kết bạn thành công!!!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            handleRefreshData()
        }
        catch (err) {
            console.log('err :' + err)

            toast.error('Từ chối kết bạn thất bạn!!!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        friends.requests.length !== 0
            ?
            friends.requests.map((request) => {
                return (
                    <div className="relative group w-2/3 h-[100px] border-black dark:border-white rounded-[15px] border-1 flex items-center justify-center">
                        <img
                            className="h-full rounded-[15px] p-2"
                            alt='friend'
                            src={request.avatar.url}
                        />

                        <div className='flex justify-between items-center w-full'>
                            <div
                                onClick={() => handleNavigateFriend(request._id)}
                                className="flex flex-col gap-2 h-full justify-center cursor-pointer">
                                <p className="text-sm text-black dark:text-white font-open_sans font-bold">
                                    {getFullName(request.first_name, request.last_name)}
                                </p>

                                <p className="text-sm text-black dark:text-white font-open_sans font-bold">
                                    {request.department}
                                </p>
                            </div>

                            <div className="flex gap-2 p-2">
                                <Button
                                    onClick={() => handleAcceptRequest(request._id)}
                                    isLoading={isLoading.isLoadingAccept}
                                    className="border"
                                    variant="ghost"
                                    radius="sm"
                                >
                                    <p className='text-sm font-open_sans font-bold gap-2'>
                                        Chấp nhận yêu cầu
                                    </p>
                                </Button>

                                <Button
                                    onClick={handleRefusedFriend}
                                    isLoading={isLoading.isLoadingRefused}
                                    className="border"
                                    variant="ghost"
                                    radius="sm"
                                >
                                    <p className='text-sm font-open_sans font-bold gap-2'>
                                        Hủy yêu cầu
                                    </p>
                                </Button>
                            </div>

                            {/* <Dropdown
                                className='bg-bg_dropdown_primary '
                            >
                                <DropdownTrigger>
                                    <Button
                                        onClick={handleOpenDropDown}
                                        className='w-[20px] '
                                        size="sm"
                                        isIconOnly
                                        variant="light"
                                    >
                                        <MoreHorizontal size={28} strokeWidth={0.75} />

                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    onAction={(key) => handleActionByKey(key)}
                                    aria-label="unfriend"
                                >
                                    <DropdownItem
                                        showDivider
                                        key="accept"
                                        onClick={() => handleOpenModal(request._id)}
                                        className="text-white"
                                        endContent={<CheckCheck size={16} strokeWidth={0.75} color='#14e117' />}
                                    >
                                        <p className='text-md font-open_sans font-bold gap-2'>
                                            Chấp nhận yêu cầu
                                        </p>
                                    </DropdownItem>

                                    <DropdownItem
                                        showDivider
                                        key="cancel"
                                        onClick={() => handleOpenModal(request._id)}
                                        className="text-white"
                                        endContent={<XCircle size={20} strokeWidth={0.75} color='#e70404' />}
                                    >
                                        <p className='text-md font-open_sans font-bold gap-2'>
                                            Hủy yêu cầu
                                        </p>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown> */}
                        </div>

                        {/* <ModalConfirm
                            title='Bạn có chắc chắn muốn hủy kết bạn?'
                            isOpen={openModal.confirm_modal}
                            onOpenChange={handleOpenModal}
                            onClose={handleCloseModal}

                            handleCallback={handleRefusedFriend}
                        /> */}
                    </div>
                )
            })
            :
            <p className='text-black dark:text-white font-mono text-md'>
                Không có yêu cầu kết bạn
            </p>
    )
}

export default CardFriendRequest

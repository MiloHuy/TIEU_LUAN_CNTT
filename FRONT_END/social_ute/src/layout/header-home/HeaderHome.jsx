import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import { RELATIONSHIP } from "constants/user.const";
import ModalChangePassword from "features/modal-change-password";
import ModalUpdateUser from "features/modal-update-user";
import { Check, MailPlus, Settings, UserCheck, UserPlus, X } from 'lucide-react';
import { useState } from "react";
import { getMeInfo } from "services/me.svc";
import { AcceptFriend, AddCancelFriend, RefuseFriend, followGuest } from "services/user.svc";

const HeaderHome = (props) => {
    const { userStatisics, userInfo, userName, userAvatar } = props
    const {
        count_followers,
        count_followings,
        count_posts,
        count_friends,
        count_stories
    } = userStatisics
    const { onOpen, onClose } = useDisclosure();

    const avatar_URL = userInfo ? userInfo.user.avatar.url : null

    const friend = userInfo ? userInfo.friend : null
    const add_friend = userInfo ? userInfo.add_friend : null
    const following = userInfo ? userInfo.following : null
    const request_add_friend = userInfo ? userInfo.friend_request : null

    const INIT_CHECK = {
        relationship: friend,
        add_friend: add_friend,
        isLoadingFriend: false,
        follow: following,
        isLoadingFollow: false,
        request_add_friend: request_add_friend,
        isLoadingRequest: false
    }

    const [check, setCheck] = useState(INIT_CHECK)
    const [updateUser, setUpdateUser] = useState()
    const [openModal, setOpenModal] = useState({
        change_password: false,
        change_user_info: false,
    })

    const handleAddOrCancelFriend = async () => {
        try {
            setCheck((prev) => ({
                ...prev,
                isLoadingFriend: true
            }))
            await AddCancelFriend(userInfo.user._id)

            setCheck((prev) => ({
                ...prev,
                relationship: !prev.relationship,
                add_friend: !prev.add_friend,
                follow: !prev.follow,
                isLoadingFriend: false,
            }))
        }
        catch (err) {
            console.log("err:" + err)
        }
    }

    const handleAcceptFriend = async () => {
        try {
            setCheck((prev) => ({
                ...prev,
                isLoadingRequest: true
            }))
            await AcceptFriend(userInfo.user._id)

            setCheck((prev) => ({
                ...prev,
                request_add_friend: !prev.request_add_friend,
                isLoadingRequest: false,
            }))

            window.location.reload();
        }
        catch (err) {
            console.log("err:" + err)
        }
    }

    const handleRefusedFriend = async () => {
        try {
            setCheck((prev) => ({
                ...prev,
                isLoadingRequest: true
            }))
            await RefuseFriend(userInfo.user._id)

            setCheck((prev) => ({
                ...prev,
                request_add_friend: !prev.request_add_friend,
                isLoadingRequest: false,
            }))

            window.location.reload();
        }
        catch (err) {
            console.log("err:" + err)
        }
    }

    const handleFollow = async () => {
        try {
            setCheck((prev) => ({
                ...prev,
                isLoadingFollow: true
            }))
            await followGuest(userInfo.user._id)

            setCheck((prev) => ({
                ...prev,
                follow: !prev.follow,
                isLoadingFollow: false,
            }))
        }
        catch (err) {
            console.log("err:" + err)
        }
    }

    const handleUpdateUser = async () => {
        setOpenModal(() => ({
            change_user_info: true,
            change_password: false
        }))

        try {
            const data_Info = await getMeInfo()
            setUpdateUser({ ...data_Info })
        }
        catch (err) {
            console.log("err:" + err)
        }
    }

    const hanldeChangePassword = async () => {
        setOpenModal(() => ({
            change_password: true,
            change_user_info: false
        }))
    }

    const handleOpenModal = () => {
        if (openModal.change_user_info === true && openModal.change_password !== true) {
            onOpen()
        }
        else if (openModal.change_password === true && openModal.change_user_info !== true) {
            onOpen()
        }
    }

    const handleCloseModal = () => {
        if (openModal.change_user_info === true && openModal.change_password !== true) {
            setOpenModal((prev) => ({
                ...prev,
                change_user_info: false
            }))

            onClose()
        }
        else if (openModal.change_password === true && openModal.change_user_info !== true) {
            setOpenModal((prev) => ({
                ...prev,
                change_password: false
            }))
            onClose()
        }
    }

    return (
        <div className="grid grid-rows-2 ">
            <div className='grid grid-cols-7 gap-2'>
                <div className='col-span-2 justify-center flex'>
                    <img
                        loading='lazy'
                        alt='avatar'
                        src={userAvatar ? userAvatar : avatar_URL}
                        className='rounded-full w-1/2'
                    />
                </div>

                <div className="col-span-5">
                    <div className='grid grid-rows-2 gap-6'>
                        <div className="flex gap-2 w-full items-center">
                            <p className='dark:text-white font-noto text-center'>
                                {userName}
                            </p>

                            {
                                userAvatar ?
                                    <div className='flex gap-2'>
                                        <Button
                                            radius="sm"
                                            className="w-50 h-7"
                                            onClick={handleUpdateUser}
                                        >
                                            Chỉnh sửa trang cá nhân
                                        </Button>

                                        <ModalUpdateUser
                                            isOpen={openModal.change_user_info}
                                            onOpenChange={handleOpenModal}
                                            onClose={handleCloseModal}

                                            updateUser={updateUser}
                                        />

                                        <Button
                                            onClick={hanldeChangePassword}
                                            isIconOnly
                                            variant="light"
                                            className="h-7"
                                        >
                                            <Settings
                                                size={20}
                                                strokeWidth={0.75}
                                                absoluteStrokeWidth
                                                className="hover:rotate-45"
                                            />
                                        </Button>

                                        <ModalChangePassword
                                            isOpen={openModal.change_password}
                                            onOpenChange={handleOpenModal}
                                            onClose={handleCloseModal}
                                        />
                                    </div>
                                    :
                                    ''
                            }

                            {
                                avatar_URL ?
                                    RELATIONSHIP.FRIEND === friend ?
                                        <div className='flex gap-2'>
                                            <Button
                                                isLoading={check.isLoadingFriend}
                                                radius="sm"
                                                className="w-50 h-7"
                                                onClick={handleAddOrCancelFriend}
                                            >
                                                {check.relationship ? 'Bạn bè' : 'Thêm bạn bè'}
                                            </Button>

                                            <Button
                                                isLoading={check.isLoadingFollow}
                                                onClick={handleFollow}
                                                radius="sm"
                                                className="w-50 h-7"
                                            >
                                                {check.follow ? 'Đang theo dõi' : 'Theo dõi'}
                                            </Button>
                                        </div>
                                        :
                                        RELATIONSHIP.ADD_FRIEND === add_friend ?
                                            <div className='gap-2 flex'>
                                                <Button
                                                    isLoading={check.isLoadingFriend}
                                                    radius="sm"
                                                    className="w-50 h-7"
                                                    onClick={handleAddOrCancelFriend}

                                                    endContent={
                                                        check.add_friend
                                                            ? <UserCheck size={18} color="#3aa162" strokeWidth={1.5} />
                                                            : <UserPlus size={18} strokeWidth={1} />}
                                                >
                                                    {check.add_friend ? "Đã gửi yêu cầu" : 'Thêm bạn bè'}
                                                </Button>

                                                <Button
                                                    isLoading={check.isLoadingFollow}
                                                    onClick={handleFollow}
                                                    radius="sm"
                                                    className="w-50 h-7"
                                                >
                                                    {check.follow ? 'Đang theo dõi' : 'Theo dõi'}
                                                </Button>
                                            </div>
                                            :
                                            RELATIONSHIP.REQUEST_FRIEND === request_add_friend
                                                ?
                                                <div className='gap-2 flex'>
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button
                                                                radius="sm"
                                                                className="w-50 h-7"
                                                                variant="solid"
                                                                endContent={<MailPlus size={20} color="#ededed" strokeWidth={0.75} />}
                                                            >
                                                                Đã gửi lời mời
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                                                            <DropdownItem
                                                                onClick={handleAcceptFriend}
                                                                key="accept"
                                                                endContent={<Check size={20} color="#06982b" strokeWidth={0.75} />}
                                                            >
                                                                Chấp nhận lời mời
                                                            </DropdownItem>

                                                            <DropdownItem
                                                                onClick={handleRefusedFriend}
                                                                key="refuse"
                                                                endContent={<X size={20} color="#e00b0b" strokeWidth={0.75} />}
                                                            >
                                                                Từ chối lời mời
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>

                                                    <Button
                                                        isLoading={check.isLoadingFollow}
                                                        radius="sm"
                                                        onClick={handleFollow}
                                                        className="w-50 h-7"
                                                    >
                                                        {check.follow ? 'Đang theo dõi' : 'Theo dõi'}
                                                    </Button>
                                                </div>
                                                :
                                                <div className='gap-2 flex'>
                                                    <Button
                                                        isLoading={check.isLoadingFriend}
                                                        radius="sm"
                                                        className="w-50 h-7"
                                                        onClick={handleAddOrCancelFriend}

                                                        endContent={
                                                            check.add_friend
                                                                ? <UserCheck size={18} color="#3aa162" strokeWidth={1.5} />
                                                                : <UserPlus size={18} strokeWidth={1}
                                                                />
                                                        }>

                                                        {check.add_friend ? 'Đã gửi yêu cầu' : 'Thêm bạn bè'}
                                                    </Button>

                                                    <Button
                                                        isLoading={check.isLoadingFollow}
                                                        radius="sm"
                                                        onClick={handleFollow}
                                                        className="w-50 h-7"
                                                    >
                                                        {check.follow ? 'Đang theo dõi' : 'Theo dõi'}
                                                    </Button>
                                                </div>
                                    : ''
                            }
                        </div>

                        <div className="flex flex-row gap-7">
                            <div className="flex gap-1">
                                <p className="dark:text-white font-noto">{count_posts}</p>
                                <p className="dark:text-white font-noto">Bài viết</p>
                            </div>

                            <div className="flex gap-1">
                                <p className="dark:text-white font-noto">{count_followers}</p>
                                <p className="dark:text-white font-noto">người theo dõi</p>
                            </div>

                            <div className="flex gap-1">
                                <p className="dark:text-white font-noto">Đang theo dõi:</p>
                                <p className="dark:text-white font-noto">{`${count_followings || 0} người dùng`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center h-0">
                <Divider orientation='horizontal' className="my-4 w-4/5" />
            </div>
        </div >
    )
}

export default HeaderHome

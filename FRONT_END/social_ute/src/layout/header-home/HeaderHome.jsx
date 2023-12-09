import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { RELATIONSHIP } from "constants/user.const";
import ModalUpdateUser from "features/modal-update-user";
import { Settings, UserCheck, UserPlus } from 'lucide-react';
import { useState } from "react";
import { getMeInfo } from "services/me.svc";
import { AddCancelFriend } from "services/user.svc";

const HeaderHome = (props) => {
    const { userStatisics, userInfo, userName, userAvatar } = props
    const {
        count_followers,
        count_followings,
        count_posts,
        count_friends,
        count_stories
    } = userStatisics
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const friend = userInfo ? userInfo.friend : null
    const add_friend = userInfo ? userInfo.add_friend : null

    const CHECK = {
        relationship: friend,
        add_friend: add_friend,
    }

    const [relationship, setRelationship] = useState(friend)
    const [checkAddFriend, setCheckAddFriend] = useState(add_friend)
    const [isLoading, setIsLoading] = useState(false)
    const [updateUser, setUpdateUser] = useState()

    const avatar_URL = userInfo ? userInfo.user.avatar.url : null

    const handleAddOrCancelFriend = async () => {
        try {
            setIsLoading(true)
            await AddCancelFriend(userInfo.user._id)

            setRelationship(!relationship)
            setCheckAddFriend(!checkAddFriend)
            setIsLoading(false)
        }
        catch (err) {
            console.log("err:" + err)
        }
        finally {
            setIsLoading(false)
        }
    }

    const handleUpdateUser = async () => {
        onOpen()

        try {
            setIsLoading(true)
            const data_Info = await getMeInfo()
            setUpdateUser({ ...data_Info })
            setIsLoading(false)
        }
        catch (err) {
            console.log("err:" + err)
        }
        finally {
            setIsLoading(false)
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
                                    <div className='flex '>
                                        <Button
                                            radius="sm"
                                            className="w-50 h-7"
                                            onClick={handleUpdateUser}
                                        >
                                            Chỉnh sửa trang cá nhân
                                        </Button>

                                        <ModalUpdateUser
                                            isOpen={isOpen}
                                            onOpenChange={onOpenChange}

                                            updateUser={updateUser}
                                        />

                                        <Button isIconOnly variant="light" className="h-7 ">
                                            <Settings
                                                size={20}
                                                strokeWidth={0.75}
                                                absoluteStrokeWidth
                                                className="hover:rotate-45"
                                            />
                                        </Button>
                                    </div>
                                    :
                                    ''
                            }

                            {
                                avatar_URL ?
                                    RELATIONSHIP.FRIEND === friend ?
                                        <div>
                                            <Button
                                                radius="sm"
                                                className="w-50 h-7"
                                                onClick={handleAddOrCancelFriend}
                                            >
                                                {relationship ? 'Bạn bè' : 'Thêm bạn bè'}
                                            </Button>
                                            <Button radius="sm" className="w-50 h-7">
                                                Theo dõi
                                            </Button>
                                        </div>
                                        :
                                        RELATIONSHIP.ADD_FRIEND === add_friend ?
                                            <div className='gap-2 flex'>
                                                <Button
                                                    isLoading={isLoading}
                                                    radius="sm"
                                                    className="w-50 h-7"
                                                    onClick={handleAddOrCancelFriend}

                                                    endContent={
                                                        checkAddFriend
                                                            ? <UserCheck size={18} color="#3aa162" strokeWidth={1.5} />
                                                            : <UserPlus size={18} strokeWidth={1} />}
                                                >
                                                    {checkAddFriend ? "Đã gửi yêu cầu" : 'Thêm bạn bè'}
                                                </Button>

                                                <Button radius="sm" className="w-50 h-7">
                                                    Theo dõi
                                                </Button>
                                            </div>
                                            :
                                            <div className='gap-2 flex'>
                                                <Button
                                                    isLoading={isLoading}
                                                    radius="sm"
                                                    className="w-50 h-7"
                                                    onClick={handleAddOrCancelFriend}

                                                    endContent={
                                                        checkAddFriend
                                                            ? <UserCheck size={18} color="#3aa162" strokeWidth={1.5} />
                                                            : <UserPlus size={18} strokeWidth={1}
                                                            />
                                                    }>

                                                    {checkAddFriend ? 'Đã gửi yêu cầu' : 'Thêm bạn bè'}
                                                </Button>

                                                <Button radius="sm" className="w-50 h-7">
                                                    Theo dõi
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

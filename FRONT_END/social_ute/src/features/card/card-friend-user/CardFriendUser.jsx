import { Button } from "components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "components/dropdown";
import ModalConfirm from "features/modal/modal-confirm";
import { MoreHorizontal } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { unFriend } from "services/user.svc";
import { getFullName } from "utils/user.utils";

const CardFriendUser = ({ friend }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleUnFriend = async () => {
        try {
            setIsLoading(true)
            await unFriend(friend._id)

            setIsLoading(false)
            toast.success('Hủy kết bạn thành công!!!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => { window.location.reload() }, 1500)
        }
        catch (err) {
            setIsLoading(false)
            console.log('err :' + err)

            toast.error('Hủy kết bạn thất bạn!!!', {
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

    const handleNavigateFriend = (id) => {
        navigate(`/welcome/home-guest/${id}`)
    }

    return (
        <div className="relative group max-w-[30rem] max-h-[6rem] rounded-[15px] border flex border-black/80 dark:border-white">
            <img
                loading="lazy"
                className="h-full rounded-[15px] p-2"
                alt='friend'
                src={friend.avatar.url}
            />

            <div className='flex justify-between items-center w-full'>
                <div
                    onClick={() => handleNavigateFriend(friend._id)}
                    className="flex flex-col gap-2 h-full justify-center cursor-pointer">
                    <p className="text-sm text-black dark:text-white font-quick_sans font-bold">
                        {getFullName(friend.first_name, friend.last_name)}
                    </p>

                    <p className="text-sm text-black dark:text-white font-quick_sans font-bold">
                        {friend.department}
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button
                            className='w-[20px]'
                            variant="light"
                        >
                            <MoreHorizontal size={28} strokeWidth={0.75} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <ModalConfirm
                            trigger={
                                <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
                                    <p className='text-md font-quick_sans font-bold gap-2'>
                                        Hủy kết bạn
                                    </p>
                                </DropdownMenuItem>
                            }
                            title='Bạn có chắc chắn muốn hủy kết bạn?'
                            isLoading={isLoading}

                            handleCallback={handleUnFriend}
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


        </div >
    )
}

export default CardFriendUser

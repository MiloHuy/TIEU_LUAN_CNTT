import { Button } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AcceptFriend, RefuseRequest } from "services/user.svc";
import { getFullName } from "utils/user.utils";

const CardFriendRequest = ({ friends, handleCallback }) => {
    const navigate = useNavigate()
    const [arrIsLoadingAccept, setArrIsLoadingAccept] = useState(new Array(friends.requests.length).fill(false))
    const [arrIsLoadingRefused, setArrIsLoadingRefused] = useState(new Array(friends.requests.length).fill(false))

    const handleNavigateFriend = (id) => {
        navigate(`/welcome/home-guest/${id}`)
    }

    const handleRefreshData = useCallback(() => {
        handleCallback();
    }, [handleCallback])

    const handleAcceptRequest = async (id, index) => {
        try {
            const arrClone = [...arrIsLoadingAccept]
            arrClone[index] = true

            setArrIsLoadingAccept([...arrClone])

            await AcceptFriend(id)

            arrClone[index] = false
            setArrIsLoadingAccept([...arrClone])

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

    const handleRefusedFriend = async (id, index) => {
        try {
            const arrClone = [...arrIsLoadingRefused]
            arrClone[index] = true

            setArrIsLoadingRefused([...arrClone])

            await RefuseRequest(id)

            arrClone[index] = false
            setArrIsLoadingRefused([...arrClone])

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

    console.log('arrIsLoadingRefused: ' + arrIsLoadingRefused)

    return (
        friends.requests.length !== 0
            ?
            friends.requests.map((request, index) => {
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
                                    onClick={() => handleAcceptRequest(request._id, index)}
                                    isLoading={arrIsLoadingAccept[index]}
                                    className="border border-black dark:border-white"
                                    variant="ghost"
                                    radius="sm"
                                >
                                    <p className='text-sm font-open_sans font-bold gap-2'>
                                        Chấp nhận yêu cầu
                                    </p>
                                </Button>

                                <Button
                                    onClick={() => handleRefusedFriend(request._id, index)}
                                    isLoading={arrIsLoadingRefused[index]}
                                    className="border border-black dark:border-white"
                                    variant="ghost"
                                    radius="sm"
                                >
                                    <p className='text-sm font-open_sans font-bold gap-2'>
                                        Hủy yêu cầu
                                    </p>
                                </Button>
                            </div>

                        </div>
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

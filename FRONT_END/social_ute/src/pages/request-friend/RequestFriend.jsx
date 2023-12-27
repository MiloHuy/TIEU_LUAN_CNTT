import ListRequestFriend from "features/list/list-request-friend"

const RequestFriend = () => {
    return (
        <div className="flex flex-col gap-3 w-full h-screen overflow-auto py-3">
            <div className="flex justify-center h-20">
                <h1 className='text-black text-center font-mono font-bold text-2xl dark:text-white'>
                    Danh sách lời mời kết bạn
                </h1>
            </div>

            <ListRequestFriend />
        </div >
    )
}

export default RequestFriend

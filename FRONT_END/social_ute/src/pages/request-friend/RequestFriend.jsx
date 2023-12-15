import ListRequestFriend from "features/list/list-request-friend"

const RequestFriend = () => {
    return (
        <div className="flex flex-col gap-3 w-full h-screen overflow-auto py-3 ">
            <h1 className='text-black text-center font-sans font-bold text-2xl h-40 dark:text-white'>
                Danh sách lời mời kết bạn
            </h1>

            <ListRequestFriend />
        </div >
    )
}

export default RequestFriend

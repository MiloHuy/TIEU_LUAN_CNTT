import { Spinner } from "@nextui-org/react";

const ListFriendsUser = ({ friends }) => {

    return (
        friends.friends.friend_id?.length
            ?
            friends.friends.friend_id.length !== 0
                ?
                friends.friends.friend_id.map((friend) => {
                    return (
                        <div
                            key={friend._id}
                            className=""
                        >
                            {friend.first_name}
                        </div>
                    )
                })
                : 'Hiện không có bạn bè nào ở đây cả.'
            :
            <div className='w-full h-full flex items-center justify-center'>
                <Spinner color="default" size="lg" />
            </div >

    )
}

export default ListFriendsUser

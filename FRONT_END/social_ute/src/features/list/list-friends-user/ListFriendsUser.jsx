import CardFriendUser from "features/card/card-friend-user";

const ListFriendsUser = ({ friends }) => {

    return (
        friends.friends.length !== 0
            ?
            <div className='grid grid-cols-2 gap-2 w-full h-full'>
                {
                    friends.friends.map((friend) => {
                        return (
                            <CardFriendUser
                                friend={friend}
                            />
                        )
                    })
                }
            </div >
            :
            <p className="text-black dark:text-white font-nunito_sans">
                Hiện không có bạn bè nào ở đây cả.
            </p>

    )
}

export default ListFriendsUser

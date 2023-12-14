import CardFriendRequest from "features/card/card-friend-request";
import { useCallback, useEffect, useState } from "react";
import { getRequestFriend } from "services/me.svc";

const ListRequestFriend = () => {
    const [friends, setFriends] = useState()
    const fetchAllRequests = useCallback(async () => {
        try {
            const data_requests = await getRequestFriend()
            setFriends(data_requests)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [])

    useEffect(() => {
        fetchAllRequests()
    }, [fetchAllRequests])

    console.log('friends: ', friends ? Object.entries(friends.data) : '')

    return (
        <div className="relative grid grid-cols-1 gap-2 w-full h-full justify-center items-start">
            <div className="w-full flex items-center justify-center">
                <CardFriendRequest />
            </div>

            <div className="w-full flex items-center justify-center">
                <CardFriendRequest />
            </div>

            <div className="w-full flex items-center justify-center">
                <CardFriendRequest />
            </div>

            <div className="w-full flex items-center justify-center">
                <CardFriendRequest />
            </div>

            <div className="w-full flex items-center justify-center">
                <CardFriendRequest />
            </div>
        </div>
    )
}

export default ListRequestFriend

import { Spinner } from "@nextui-org/react";
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

    return (
        <div className="relative grid grid-cols-1 gap-2 w-full h-full justify-center items-start">
            {
                friends
                    ?
                    <div className="w-full flex flex-col gap-3 items-center justify-center">
                        <CardFriendRequest
                            handleCallback={fetchAllRequests}
                            friends={friends.data}
                        />
                    </div>
                    :
                    <div className='w-full h-full flex items-center justify-center'>
                        <Spinner color="default" size="lg" />
                    </div >
            }

        </div>
    )
}

export default ListRequestFriend

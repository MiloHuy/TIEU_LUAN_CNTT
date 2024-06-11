import clsx from "clsx";
import ArrayEmpty from "combine/array-empty/ArrayEmpty";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { useUnfriend } from "hook/friends/useUnfriend";
import { useMeAllFriend } from "hook/me/useMeAllFriend";
import { useEffect } from "react";
import FriendCard from "./FriendCard";

const ListFriendsUser = ({ className, contentsDropDown }) => {
  const { friends, fetchMeFriends } = useMeAllFriend()
  const { isLoading, handleUnFriend } = useUnfriend()

  useEffect(() => {
    fetchMeFriends()
  }, [fetchMeFriends])

  return (
    <LoadingComponent
      type={TYPELOADING.SPINNER}
      condition={friends && friends.length !== 0}
    >
      <ArrayEmpty arr={friends} title='Bạn hiện chưa có bạn bè'>
        <div className={clsx("grid lg:grid-cols-2 md:grid-cols-1 gap-2", className)}>
          {
            friends.map((friend) => (
              <FriendCard
                key={friend._id}
                friend={friend}
                isLoading={isLoading}
                handleUnFriend={handleUnFriend}
                contentsDropDown={contentsDropDown}
              />
            ))
          }
        </div>
      </ArrayEmpty >
    </LoadingComponent>
  )
}

export default ListFriendsUser

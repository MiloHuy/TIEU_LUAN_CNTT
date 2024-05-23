import ArrayEmpty from "combine/array-empty/ArrayEmpty";
import { useUnfriend } from "hook/friends/useUnfriend";
import FriendCard from "./FriendCard";

const ListFriendsUser = ({ friends }) => {
  const { isLoading, handleUnFriend } = useUnfriend()

  return (
    <ArrayEmpty arr={friends} title='Bạn hiện chưa có bạn bè'>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
        {
          friends.map((friend) => (
            <FriendCard
              key={friend._id}
              friend={friend}
              isLoading={isLoading}
              handleUnFriend={handleUnFriend}
            />
          ))
        }
      </div >
    </ArrayEmpty >
  )
}

export default ListFriendsUser

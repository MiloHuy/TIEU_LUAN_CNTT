import ListRequestFriend from "features/list/list-request-friend";
import ListRequestInviteGroup from "features/list/list-request-invite-group";

const RequestFriend = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto p-10 font-quick_sans">
      <div className="flex justify-center h-20">
        <h1 className="text-black text-center font-quick_sans font-bold text-2xl dark:text-white">
          DANH SÁCH LỜI MỜI
        </h1>
      </div>

      <p className="font-bold text-lg w-full">Lời mời kết bạn</p>
      <ListRequestFriend />
      <p className="font-bold text-lg w-full">Lời mời vào nhóm</p>
      <ListRequestInviteGroup />
    </div>
  );
};

export default RequestFriend;

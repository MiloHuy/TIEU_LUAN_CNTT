import AxiosInstance from "services/axios-instance.svc";

export const deleteMemberGroup = async (url,groupId, memberId) => {
  const res = AxiosInstance.delete(
    url.replace(":gr_id", groupId).replace(":user_id", memberId)
  );
  return res;
}

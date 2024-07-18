import AxiosInstance from "services/axios-instance.svc"

export const editRegulationGroup = async (url,groupId,payload) => {
  const res = AxiosInstance.put(url.replace(':gr_id',groupId),payload)
  return res
}

export const editActiveMemberManage = async (url, groupId, memberId) => {
  const res = AxiosInstance.put(url.replace(":gr_id", groupId).replace(":user_id", memberId));
  return res;
}

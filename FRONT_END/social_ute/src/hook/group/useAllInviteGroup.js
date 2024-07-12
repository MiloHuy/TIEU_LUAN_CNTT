import { useCallback, useState } from "react";
import { getAllInviteGroup } from "services/group/api-get.svc";

export const useAllInviteGroup = () => {
  const [res,setRes] = useState();

  const fetchAllInviteGroup = useCallback(async () => {
    try {
      const data = await getAllInviteGroup();
      setRes(data.data);
    } catch (error) {
      
    }
  },[]);

  return {...res,fetchAllInviteGroup};
}

import { useCallback, useState } from "react";
import { getDepartments } from "services/auth.svc";

export const useSelectDepartement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();

  const handleFetchDepartment = useCallback(async (role) => {
    try {
      setIsLoading(true);
      const res = await getDepartments({ role: role });
      setResponse(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("error fetching department: ", err);
    }
  }, []);

  return {
    ...response,
    isLoading,
    handleFetchDepartment,
  };
};

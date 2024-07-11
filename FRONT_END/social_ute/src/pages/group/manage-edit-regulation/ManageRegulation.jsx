import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { useGetAllRegulations } from "hook/group/useGetAllRegulations";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ManageRegulation = () => {
  const { groupId } = useParams();
  const { isLoading, resData, fetchAllRegulations } = useGetAllRegulations();

  useEffect(() => {
    if (!groupId) return;
    fetchAllRegulations(groupId);
  }, [fetchAllRegulations, groupId]);

  return (
    <div className="w-full h-full mt-10 flex flex-col gap-4 p-10">
      <p className="text-xl font-quick_sans font-bold">Nội quy của nhóm</p>
      <LoadingComponent type={TYPELOADING.TITLE} condition={isLoading}>
        {resData &&
          resData.map((regulation, index) => (
            <div key={regulation.id} className="grid gap-2 w-full">
              <p>
                Nội dung {index + 1}: {regulation}
              </p>
            </div>
          ))}
      </LoadingComponent>
    </div>
  );
};

export default ManageRegulation;

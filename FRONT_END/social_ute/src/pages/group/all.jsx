import clsx from "clsx";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import ListGroupAttended from "features/list/list-group-attended";
import SelectListGroup from "features/select/select-list-group";
import { ArraySelectGroup } from "features/select/select-list-group/SelectListGroup";
import { useAllGroup } from "hook/group/useAllGroup";
import { useEffect, useState } from "react";

const AllGroup = () => {
  const [selectGroup, setSelectGroup] = useState(ArraySelectGroup[0].value);

  const {
    isLoading,
    resDataGroup,

    fetchAllGroup,
  } = useAllGroup();

  useEffect(() => {
    fetchAllGroup(selectGroup);
  }, [selectGroup, fetchAllGroup]);

  return (
    <div className={clsx(
      "w-full h-screen p-4 flex flex-col gap-4 overflow-auto",
      "text-black dark:text-white font-quick_sans font-bold text-[20px]"
    )}>
      <h1 className="font-black text-[40px]"> Nhóm bạn đã tham gia</h1>

      <SelectListGroup defaultValue={selectGroup} onChange={setSelectGroup} className='font-normal' />

      <LoadingComponent type={TYPELOADING.TITLE} condition={isLoading} >
        <h1>Tất cả các nhóm đã tham gia<span> ({resDataGroup?.length})</span></h1>

        <ListGroupAttended
          groups={resDataGroup}
        />
      </LoadingComponent>
    </div>
  )
}

export default AllGroup

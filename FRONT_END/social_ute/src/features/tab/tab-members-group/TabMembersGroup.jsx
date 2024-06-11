import { selectRolePermission } from "app/slice/group/group.slice"
import LoadingComponent from "combine/loading-component"
import { TYPELOADING } from "constants/type.const"
import { useGetAllMember } from "hook/group/useGetAllMember"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import MemberCard from "./MemberCard"

const TabMembersGroup = () => {
  const { isLoading, resData: allMembers, fetchAllMember } = useGetAllMember()
  const { groupId } = useParams()
  const rolePermission = useSelector(selectRolePermission)
  const { permission } = rolePermission

  useEffect(() => {
    if (!groupId) return

    fetchAllMember(permission, groupId)
  }, [groupId, fetchAllMember, permission])

  return (
    <LoadingComponent
      type={TYPELOADING.TITLE}
      condition={isLoading}
    >
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2 w-full">
        {allMembers
          && allMembers.map((member) => {
            return (
              <div className="flex justify-center">
                <MemberCard key={member.id} member={member} />
              </div>
            )
          })}
      </div>
    </LoadingComponent>
  )
}

export default TabMembersGroup

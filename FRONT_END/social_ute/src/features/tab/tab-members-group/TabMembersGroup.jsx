import { selectRolePermission } from "app/slice/group/group.slice"
import LoadingComponent from "combine/loading-component"
import { TYPELOADING } from "constants/type.const"
import { useGetAllMember } from "hook/group/useGetAllMember"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import MemberCard from "./MemberCard"

const TabMembersGroup = () => {
  const rolePermission = useSelector(selectRolePermission)
  const { permission, role } = rolePermission
  const { isLoading, resData: allMembers, fetchAllMember } = useGetAllMember()
  const { groupId } = useParams()

  useEffect(() => {
    if (!groupId) return

    fetchAllMember(permission, groupId)
  }, [groupId, fetchAllMember, role, permission])

  return (
    <LoadingComponent type={TYPELOADING.TITLE} condition={isLoading}>
      <div className="grid lg:grid-cols-2 gap-2 w-full justify-center">
        {allMembers && allMembers.map((member) => <MemberCard key={member.id} member={member} />)}
      </div>
    </LoadingComponent>
  )
}

export default TabMembersGroup

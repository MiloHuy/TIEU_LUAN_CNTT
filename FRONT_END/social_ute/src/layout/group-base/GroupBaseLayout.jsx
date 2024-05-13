import { selectRolePermission } from "app/slice/group/group.slice"
import TabsGroup from "features/tab/tab-groups/TabsGroup"
import { useGetInfoGroup } from "hook/group/useGetInfoGroup"
import HeaderGroup from "layout/header-group"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const GroupBaseLayout = () => {
  const rolePermission = useSelector(selectRolePermission)
  const { permission, role } = rolePermission
  const { groupId } = useParams()

  const { fetchGetInfoGroup, res } = useGetInfoGroup()

  useEffect(() => {
    if (!permission) return

    fetchGetInfoGroup(permission, groupId)
  }, [permission, groupId, fetchGetInfoGroup])

  return (
    <div className="flex flex-col gap-4 h-screen w-full">
      <HeaderGroup
        avatar={res?.avatar.url}
        info={{
          name: res?.name,
          roleName: role,
          privacyGroup: res?.privacy,
          numberMember: res?.number_of_members,
          permission: permission,
        }}
      />

      <TabsGroup />
    </div>
  )
}

export default GroupBaseLayout

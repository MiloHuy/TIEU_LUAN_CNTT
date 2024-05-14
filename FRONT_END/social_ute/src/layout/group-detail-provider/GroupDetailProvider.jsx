import LoadingComponent from "combine/loading-component"
import { TYPELOADING } from "constants/type.const"
import { useGetRolePermission } from "hook/group/useGetRolePermission"
import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"

const GroupDetailProvider = () => {
  const { groupId } = useParams()
  const { isLoading, fetchRolePermission, resDataRolePermission } = useGetRolePermission()

  useEffect(() => {
    if (!groupId) return

    fetchRolePermission(groupId)
  }, [fetchRolePermission, groupId])

  return (
    <LoadingComponent type={TYPELOADING.DOT} condition={isLoading}>
      {resDataRolePermission !== undefined ? <Outlet /> : null}
    </LoadingComponent>
  )
}

export default GroupDetailProvider

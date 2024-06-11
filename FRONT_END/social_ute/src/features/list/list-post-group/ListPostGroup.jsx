import LoadingComponent from "combine/loading-component"
import { TYPELOADING } from "constants/type.const"
import { useAllPostGroup } from "hook/group/useAllPostGroup"
import CardPostGroup from "./CardPostGroup"

const ListPostGroup = () => {
  const { resPonse, fetchAllPostGroup, } = useAllPostGroup()

  // useEffect(() => {
  //   fetchAllPostGroup()
  // }, [fetchAllPostGroup])

  return (
    <div className='flex flex-col gap-4 mt-4'>
      <LoadingComponent type={TYPELOADING.TITLE} condition={true}>
        {
          resPonse.map((post, index) => {
            return (
              <CardPostGroup key={index} postData={post} />
            )
          })
        }
      </LoadingComponent>
    </div>
  )
}

export default ListPostGroup

import ArrayEmpty from "combine/array-empty"
import LoadingComponent from "combine/loading-component"
import { TYPELOADING } from "constants/type.const"
import { useAllPostGroup } from "hook/group/useAllPostGroup"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import CardPostGroup from "./CardPostGroup"

const ListPostGroup = ({ permission, role, groupId }) => {
  const { resPonse, onIntersection, hasMore, elementRef } = useAllPostGroup(permission, role, groupId)

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection)
    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [resPonse, elementRef, onIntersection])

  return (
    <div className='flex flex-col gap-4 mt-4'>
      <LoadingComponent type={TYPELOADING.TITLE} condition={!hasMore} ref={elementRef}>
        <ArrayEmpty arr={resPonse} title="Không có bài viết trong nhóm">
          {
            resPonse?.map((post, index) => {
              return (
                <CardPostGroup key={index} postData={post} />
              )
            })
          }
        </ArrayEmpty>
      </LoadingComponent>
      {
        hasMore &&
        <div className='flex items-center justify-center h-full' ref={elementRef}>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        </div>
      }
    </div>
  )
}

export default ListPostGroup

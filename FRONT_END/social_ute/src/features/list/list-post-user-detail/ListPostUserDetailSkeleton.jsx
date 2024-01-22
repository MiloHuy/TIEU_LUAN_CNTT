import Skeleton from "components/skeleton"

const ListPostUserDetailSkeleton = () => {
    return (
        <div className="grid grid-cols-3 w-full gap-3">
            <Skeleton className="h-80 w-full rounded-lg" />
            <Skeleton className="h-80 w-full rounded-lg" />
            <Skeleton className="h-80 w-full rounded-lg" />
        </div>
    )
}

export default ListPostUserDetailSkeleton

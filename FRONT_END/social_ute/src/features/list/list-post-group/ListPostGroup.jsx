import LoadingComponent from "combine/loading-component"
import { TYPELOADING } from "constants/type.const"
import CardPostUser from "features/card/card-post-user"
import { useAllPostGroup } from "hook/group/useAllPostGroup"

const ListPostGroup = () => {
  const { resPonse, fetchAllPostGroup, } = useAllPostGroup()

  // useEffect(() => {
  //   fetchAllPostGroup()
  // }, [fetchAllPostGroup])

  return (
    <div className='flex flex-col gap-4 '>
      <LoadingComponent type={TYPELOADING.TITLE} condition={true}>
        {
          resPonse.map((post, index) => {
            return (
              <CardPostUser
                key={index}
                postData={{
                  img: [
                    { url: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' }
                  ],
                  description: 'This is a post',
                  userId: 123,
                  id: 123,
                  avatar: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
                  liked: true,
                  numberLikes: 10,
                  savedPosts: true,
                  privacy: 1,
                }}
              />
            )
          })
        }
      </LoadingComponent >
    </div>
  )
}

export default ListPostGroup

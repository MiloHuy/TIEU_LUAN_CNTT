import CardPostUser from "features/card/card-post-user"

const ListPostUser = ({ posts }) => {

  return (
    posts.length !== 0 ?
      posts.map((post) => {
        return (
          <CardPostUser
            postData={{
              img: post.post_img,
              description: post.post_description,
              userId: post.user_id,
              id: post._id,
              avatar: post.user_id.avatar.url,
              liked: post.liked,
              numberLikes: post.likes,
              savedPosts: post.stored,
              privacy: post.privacy,
            }}
          />
        )
      })
      :
      ''
  )
}

export default ListPostUser

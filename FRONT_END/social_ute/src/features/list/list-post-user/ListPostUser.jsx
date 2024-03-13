import CardPostUser from "features/card/card-post-user"

const ListPostUser = ({ posts }) => {

  return (
    posts.length !== 0 ?
      posts.map((post) => {
        return (
          <CardPostUser
            post_id={post._id}
            post_img={post.post_img}
            post_avatar={post.user_id.avatar.url}
            post_description={post.post_description}
            user_id={post.user_id}
            liked={post.liked}
            number_likes={post.likes}
            save_posts={post.stored}
          />

        )
      })
      :
      ''
  )
}

export default ListPostUser

import CardPostUser from "features/card-post-user"

const ListPostUser = ({ posts }) => {

    return (
        posts?.map((post) => {
            return (
                <CardPostUser
                    post_id={posts._id}
                    post_img={post.post_img.url}
                    post_description={post.post_description}
                    user_id={post.user_id}
                />
            )
        })
    )
}

export default ListPostUser

import CardPostUserMock from "features/card/card-post-user/CardPostUserMock"

const ListPostUser = ({ posts }) => {

    return (
        posts.length !== 0 ?
            posts.map((post) => {
                return (
                    // <CardPostUser
                    //     post_id={post._id}
                    //     post_img={post.post_img.url}
                    //     post_avatar={post.user_id.avatar.url}
                    //     post_description={post.post_description}
                    //     user_id={post.user_id}
                    //     liked={post.liked}
                    //     number_likes={post.likes}
                    //     save_posts={post.stored}
                    // />
                    <CardPostUserMock />
                )
            })
            :
            // <p className='text-black dark:text-white font-nunito_sans text-md'>
            //     Không có bài viết nào được hiện.
            // </p>
            ''
    )
}

export default ListPostUser

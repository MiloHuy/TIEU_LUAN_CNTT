import { Spinner } from "@nextui-org/react";
import CardPostUser from "features/card/card-post-user";

const ListPostUser = ({ posts }) => {

    return (
        posts ?
            posts.map((post) => {
                return (
                    <CardPostUser
                        post_id={post._id}
                        post_img={post.post_img.url}
                        post_avatar={post.user_id.avatar.url}
                        post_description={post.post_description}
                        user_id={post.user_id}
                        liked={post.liked}
                        number_likes={post.likes}
                        save_posts={post.stored}
                    />
                )
            }) : <Spinner color="default" size="lg" />

    )
}

export default ListPostUser

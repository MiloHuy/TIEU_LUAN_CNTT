import { Spinner } from "@nextui-org/react";
import CardPostUser from "features/card-post-user";

const ListPostUser = ({ posts, isLoaded }) => {

    return (
        posts ?
            posts.map((post) => {
                return (
                    <CardPostUser
                        isLoaded={isLoaded}
                        post_id={post._id}
                        post_img={post.post_img.url}
                        post_avatar={post.user_id.avatar.url}
                        post_description={post.post_description}
                        user_id={post.user_id}
                    />
                )
            }) : <Spinner color="default" size="lg" />

    )
}

export default ListPostUser

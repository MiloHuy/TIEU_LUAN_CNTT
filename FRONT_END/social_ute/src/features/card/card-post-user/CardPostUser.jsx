import DropdownShowMoreOptions from "features/dropdown/dropdown-show-more-options";
import { usePostDetail } from "hook/posts/usePostDetail";
import FooterActionsPost from "layout/footer-actions-post";
import HeaderPostUser from "layout/header-post-user";
import { getFullName, getUserIdFromCookie } from "utils/user.utils";

const CardPostUser = (props) => {
    const {
        post_img,
        post_description,
        user_id,
        post_id,
        post_avatar,
        liked,
        number_likes,
        save_posts, privacy } = props

    const userName = getFullName(user_id?.first_name, user_id?.last_name);
    const ID = getUserIdFromCookie();

    const { postDetail, fetchPostDetails, } = usePostDetail()

    return (
        <div className='max-w-[40vw] w-[40vw] p-2'>
            <div className="flex flex-col gap-2 py-2 w-full min-h-[95vh] h-max border border-black dark:border-white rounded-lg justify-between items-center overflow-hidden">
                <HeaderPostUser
                    className='min-h-[8vh] h-[8vh] rounded-[30px] w-[34vw]'
                    img={post_avatar}
                    name={userName}
                    privacy={privacy}
                    href={user_id._id !== ID ? `/welcome/home-guest/${user_id._id}` : `/welcome/home-user/${ID}`}
                    action={
                        <DropdownShowMoreOptions
                            user_id={user_id._id}
                            post_id={post_id}
                            privacy={privacy}
                        />
                    }
                />

                <div className="w-full min-h-[95vh] h-max flex flex-col justify-start ">
                    <div className='h-[75vh]'>
                        <CaroselVersion2
                            type={PostType.POST_IMG}
                            slides={post_img} />
                    </div>

                    <FooterActionsPost
                        fetchPostDetails={fetchPostDetails}

                        postDetail={postDetail}
                        post_id={post_id}
                        postDescription={post_description}
                        userName={userName}
                        liked_post={liked}
                        number_likes={number_likes}
                        saved_posts={save_posts}
                    />
                </div >
            </div >
        </div >
    )
}

export default CardPostUser

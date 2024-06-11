import clsx from "clsx";
import CaroselVersion2 from "components/carousel/Carosel-V2";
import { PostType } from "constants/post.const";
import DropdownShowMoreOptions from "features/dropdown/dropdown-show-more-options";
import FooterActionsPost from "layout/footer-actions-post";
import HeaderPostUser from "layout/header-post-user";
import { getFullName, getUserIdFromCookie } from "utils/user.utils";

const CardPostUser = (props) => {
  const { postData } = props

  const userName = getFullName(postData.userId?.first_name, postData.userId?.last_name);
  const ID = getUserIdFromCookie();

  const navigateHome = postData.userId?._id !== ID
    ? `/welcome/home-guest/${postData.userId?._id}`
    : `/welcome/home-user/${ID}`

  return (
    <div className='max-w-[40vw] w-[40vw] p-2' {...props}>
      <div className={
        clsx(
          "flex flex-col justify-between items-center gap-2 py-2 w-full min-h-[95vh] h-max overflow-hidden",
          "border border-black dark:border-white rounded-lg"
        )}>
        <HeaderPostUser
          className='min-h-[8vh] h-[8vh] rounded-lg w-[35vw] '
          img={postData.avatar}
          name={userName}
          privacy={postData.privacy}
          href={navigateHome}
          action={
            <DropdownShowMoreOptions
              user_id={postData.userId?._id}
              post_id={postData.id}
              privacy={postData.privacy}
            />
          }
        />

        <div className="w-full min-h-[95vh] h-max flex flex-col justify-start ">
          <CaroselVersion2
            className='h-[75vh]'
            type={PostType.POST_IMG}
            slides={postData.img} />

          <FooterActionsPost
            post_id={postData.id}
            postDescription={postData.description}
            userName={userName}
            liked_post={postData.liked}
            number_likes={postData.numberLikes}
            saved_posts={postData.savedPosts}
          />
        </div>
      </div >
    </div >
  )
}

export default CardPostUser

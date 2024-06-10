import CardBaseLayout from "combine/card-base/CardBaseLayout"
import CaroselVersion2 from "components/carousel/Carosel-V2"
import { PostType } from "constants/post.const"
import DropdownShowMoreOptions from "features/dropdown/dropdown-show-more-options"
import FooterActionsPost from "layout/footer-actions-post"
import HeaderPostUser from "layout/header-post-user"
import { useNavigate } from "react-router-dom"
import { getFullName, getUserIdFromCookie } from "utils/user.utils"

const CardPostGroup = ({ postData, ...props }) => {
  const userName = getFullName(postData.userId?.first_name, postData.userId?.last_name);
  const ID = getUserIdFromCookie();
  const navigate = useNavigate()

  return (
    <CardBaseLayout
      align="horizontal"
      className="w-[500px] justify-between items-center"
      header={
        <HeaderPostUser
          className='h-16 rounded-lg w-full'
          img={"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"}
          name={"MiLoHuy"}
          privacy={"2"}
          // href={navigateById(postData.userId?._id, ID, navigate)}
          action={
            <DropdownShowMoreOptions
              user_id={postData.userId?._id}
              post_id={postData.id}
              privacy={"2"}
            />
          }
        />
      }

      body={
        <CaroselVersion2
          className='h-[75vh]'
          type={PostType.POST_IMG}
          slides={[
            { url: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' }
          ]}
        />
      }

      footer={
        <FooterActionsPost
          post_id={postData.id}
          postDescription={postData.description}
          userName={userName}
          liked_post={postData.liked}
          number_likes={postData.numberLikes}
          saved_posts={postData.savedPosts}
        />
      }
      {...props}
    />
  )
}

export default CardPostGroup

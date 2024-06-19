import CardBaseLayout from "combine/card-base/CardBaseLayout";
import CaroselVersion2 from "components/carousel/Carosel-V2";
import { PostType } from "constants/post.const";
import DropdownShowMoreOptions from "features/dropdown/dropdown-show-more-options";
import HeaderPostUser from "layout/header-post-user";
import { getFullName } from "utils/user.utils";
import Footer from "./Footer";

const CardPostGroup = ({ postData, ...props }) => {
  // const ID = getUserIdFromCookie();
  // const navigate = useNavigate()
  const fullName = getFullName(
    postData.user_id?.first_name,
    postData.user_id?.last_name
  );

  return (
    <CardBaseLayout
      align="horizontal"
      className="w-[500px] justify-between items-center p-0"
      header={
        <HeaderPostUser
          className="h-16 rounded-lg w-full"
          img={postData.user_id?.avatar.url}
          name={fullName}
          privacy={postData.privacy}
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
          className="h-[500px] w-full"
          type={PostType.POST_IMG}
          slides={postData.post_img}
        />
      }
      footer={
        <Footer
          post_id={postData._id}
          postDescription={postData.post_description}
          userName={fullName}
          liked_post={postData.liked}
          number_likes={postData.likes}
          saved_posts={postData.stored}
        />
      }
      {...props}
    />
  );
};

export default CardPostGroup;

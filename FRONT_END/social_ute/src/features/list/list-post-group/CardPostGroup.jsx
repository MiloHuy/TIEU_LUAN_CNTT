import CardBaseLayout from "combine/card-base/CardBaseLayout";
import CaroselVersion2 from "components/carousel/Carosel-V2";
import { PostType } from "constants/post.const";
import HeaderPostUser from "layout/header-post-user";
import { getFullName } from "utils/user.utils";
import Footer from "./Footer";
import DropDownShowMoreActionPostGroup from "features/dropdown/dropdown-show-more-option-post-group/DropDownShowMoreActionPostGroup";

const CardPostGroup = ({ postData, permission, role, ...props }) => {
  const fullName = getFullName(
    postData.user_id?.first_name,
    postData.user_id?.last_name
  );

  // const dateNow = new Date();
  // const dateCreatePost = new Date(postData?.create_post_time);
  // const diffTime = Math.abs((dateNow - dateCreatePost) / (1000 * 60 * 60 * 24));

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
          createAt={postData.create_post_time}
          action={
            <DropDownShowMoreActionPostGroup
              permission={permission}
              role={role}
              postId={postData._id}
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

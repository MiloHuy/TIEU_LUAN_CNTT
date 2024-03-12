import { Button, useDisclosure } from "@nextui-org/react";
import { setInfoPost, setStatusPost } from "app/slice/post/post.slice";
import CaroselVersion2 from "components/carousel/Carosel-V2";
import { ShareIcon } from "components/icon/bonus.icon";
import { PostType } from "constants/post.const";
import DropdownShowMoreOptions from "features/dropdown/dropdown-show-more-options";
import ModalPostUser from "features/modal/modal-post-user";
import HeaderPostUser from "layout/header-post-user";
import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getPostById, likePost, postComment, storePost } from "services/post.svc";
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
    save_posts } = props

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const initStatusPost = {
    isLiked: liked,
    isSaved: save_posts,
  }
  const [statusPost, setStatusPosts] = useState(initStatusPost)
  const dispatch = useDispatch()

  const [numberLikes, setNumberLikes] = useState(number_likes)

  const userName = getFullName(user_id?.first_name, user_id?.last_name)
  const ID = getUserIdFromCookie()
  const [commentInput, setCommentInput] = useState({
    comment_content: ''
  })
  const [active, setActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleLikePost = async () => {
    try {
      setStatusPosts((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
      }))

      const data_numberLike = await likePost(post_id)

      setNumberLikes(data_numberLike.data.likes)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleCommentPost = async () => {
    onOpen()

    try {
      const postByid = await getPostById(post_id)
      dispatch(setInfoPost({ ...postByid }))

      dispatch(
        setStatusPost({
          like: statusPost.isLiked,
          save: statusPost.isSaved,
          number_likes
        }))
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSavePost = async () => {
    try {
      setStatusPosts((prev) => ({
        ...prev,
        isSaved: !prev.isSaved,
      }))

      await storePost(post_id)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handlePostComment = async () => {
    try {
      setIsLoading(true)
      await postComment(post_id, commentInput)

      setCommentInput({ comment_content: '' })
      setIsLoading(false)

    }
    catch (err) {
      console.log("err: " + err)
    }
  }

  const CopyURL = () => {
    const el = document.createElement("input");
    el.value = `http://localhost:8080/welcome/post/${post_id}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    toast.success('Sao chép đường dẫn thành công!!!', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    if (commentInput.comment_content !== '') {
      setActive(false)
    }
    else {
      setActive(true)
    }

  }, [commentInput.comment_content])

  return (
    <div className='max-w-[40vw] w-[40vw] p-2 '>
      <div className="flex flex-col gap-2 py-2 w-full min-h-[90vh] h-max border border-black dark:border-white rounded-lg justify-between items-center overflow-hidden">
        <HeaderPostUser
          className='min-h-[8vh] h-[8vh] rounded-[30px] w-[34vw]'
          img={post_avatar}
          name={userName}
          href={user_id._id !== ID ? `/welcome/home-guest/${user_id._id}` : `/welcome/home-user/${ID}`}
          action={
            <DropdownShowMoreOptions
              user_id={user_id}
              post_id={post_id}
              statusPost={statusPost}

              handleCallbackLikedPost={handleLikePost}
              handleCallbackSavedPost={handleSavePost}
            />
          }
        />

        <div className="w-full min-h-[90vh] h-max flex-col justify-between ">
          <div className='h-[75vh]'>
            <CaroselVersion2
              type={PostType.POST_IMG}
              slides={post_img} />
          </div>

          <div className='flex justify-between '>
            <div className='flex flex-row gap-1'>
              <Button
                className='w-[20px]'
                size="sm"
                isIconOnly
                variant="light"
              >
                <Heart
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                  size={20}
                />
              </Button>

              <Button
                className='w-[20px]'
                size="sm"
                isIconOnly
                variant="light"
              >
                <MessageCircle
                  size={20}
                  strokeWidth={1.5}
                />
              </Button>

              <Button
                size="sm"
                isIconOnly
                variant="light"
              >
                <ShareIcon />
              </Button>
            </div>
            <Button
              size="sm"
              isIconOnly
              variant="light"
            >
              <Bookmark
                size={20}
                strokeWidth={1.5}
              />
            </Button>
          </div>

          <div className='flex flex-col px-2'>
            <div className="flex-row flex gap-1">
              <h2 className='text-sm text-black dark:text-white font-nunito_sans font-bold'>12</h2>
              <span className='text-sm text-black dark:text-white font-nunito_sans font-bold'>lượt thích</span>
            </div>

            <div className="flex  w-full max-h-[30px]">
              <p className=" text-sm text-black dark:text-white gap-3 font-nunito_sans font-bold line-clamp-3 truncate">
                {userName}:
                <span className="font-normal pl-1 ">{post_description}</span>
              </p>
            </div>
          </div>

        </div >
      </div >

      <ModalPostUser
        isOpen={isOpen}
        onOpenChange={onOpenChange}

        userName={userName}
        handleCallbackLikePost={handleLikePost}
        handleCallbackSavedPost={handleSavePost}
      />

    </div >
  )
}

export default CardPostUser

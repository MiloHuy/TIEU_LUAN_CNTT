import { Button, useDisclosure } from "@nextui-org/react";
import { setInfoPost, setStatusPost } from "app/slice/post/post.slice";
import Input from "components/input";
import DropdownShowMoreOptions from "features/dropdown/dropdown-show-more-options";
import ModalPostUser from "features/modal/modal-post-user";
import HeaderPostUser from "layout/header-post-user";
import { Bookmark, Heart, MessageCircle, SendHorizontal } from 'lucide-react';
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

    const handleOnChange = (e) => {
        setCommentInput({ comment_content: e.target.value })
    }

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
        <div className='max-w-[40vw] w-[40vw] p-2'>
            <div className="flex flex-col w-full max-h-[80vh] h-max border border-black dark:border-white rounded-lg justify-between items-center">
                <HeaderPostUser
                    className='h-20 w-full border-b'
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

                <div className="w-full flex flex-col gap-2 h-[50rem] overflow-hidden">
                    <img
                        loading="lazy"
                        alt="img"
                        className="object-fill h-3/5 w-full "
                        src={post_img}
                    />
                    <div className='flex justify-between'>
                        <div className='flex flex-row gap-1'>
                            <Button
                                className='w-[20px]'
                                size="sm"
                                isIconOnly
                                variant="light"
                                onClick={handleLikePost}
                            >
                                <Heart
                                    strokeWidth={1.5}
                                    absoluteStrokeWidth
                                    size={20}
                                    fill={statusPost.isLiked === true ? 'red' : 'none'} />
                            </Button>

                            <Button
                                className='w-[20px]'
                                size="sm"
                                isIconOnly
                                variant="light"
                                onClick={handleCommentPost}
                            >
                                <MessageCircle size={20} strokeWidth={1.5} />
                            </Button>

                            <Button
                                size="sm"
                                isIconOnly
                                variant="light"

                                onClick={CopyURL}>
                                <SendHorizontal size={20} strokeWidth={1.5} className='transform -rotate-28 -translate-y-0.5' />
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            isIconOnly
                            variant="light"
                            onClick={handleSavePost}
                        >
                            <Bookmark
                                size={20}
                                strokeWidth={1.5}
                                fill={statusPost.isSaved === true ? 'yellow' : 'none'} />
                        </Button>
                    </div>

                    <div className='flex flex-col px-2 max-h-[25rem]'>
                        <div className="flex-row flex gap-1">
                            <h2 className='text-sm text-black dark:text-white font-nunito_sans font-bold'>{numberLikes}</h2>
                            <span className='text-sm text-black dark:text-white font-nunito_sans font-bold'>lượt thích</span>
                        </div>

                        <div className="flex-1 w-full max-h-[30px]">
                            <p className=" text-sm text-black dark:text-white font-nunito_sans font-bold line-clamp-3 truncate">
                                {`${userName} : `}
                                <span className="font-normal ">{` ${post_description}`}</span>
                            </p>
                        </div>
                    </div>

                    <div className='w-full flex gap-1 justify-start items-center px-2 mt-3'>
                        <img
                            alt='avatar'
                            src={post_avatar}
                            className="rounded-full w-8 h-8"
                        />

                        <Input
                            name='comment_content'
                            value={commentInput.comment_content}
                            onChange={handleOnChange}
                            size="sm"
                            placeholder="Thêm bình luận..."
                            className='text-black dark:placeholder:text-black border rounded-lg border-black w-full dark:border-white'
                            endContent={
                                <Button
                                    size="sm"
                                    variant="bordered"
                                    onClick={handlePostComment}
                                    isDisabled={active}
                                    className={`hover:bg-black border-black text-black hover:text-white font-nunito_sans  dark:text-white  text-sm shadow-lg  ${active ? 'invisible delay-150' : ''}`}
                                    color="primary"
                                >
                                    Đăng
                                </Button>
                            }
                        />
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

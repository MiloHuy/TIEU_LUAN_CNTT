import { Button, Input } from "@nextui-org/react";
import { selectPostId, selectStatusLikedPost, selectStatusNumberLikes, selectStatusSavedPost } from "app/slice/post/post.slice";
import { Bookmark, Heart, MessageCircle, SendHorizontal } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { likePost, postComment, storePost } from "services/post/api-post.svc";

const CardFooter = ({ signalFlag, handleCallbackLikePost, handleCallbackSavedPost }) => {
    const [commentInput, setCommentInput] = useState({
        comment_content: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const number_likes = useSelector(selectStatusNumberLikes)
    const statusPost = {
        liked: useSelector(selectStatusLikedPost), // boolean
        saved: useSelector(selectStatusSavedPost) // boolean
    }

    const [postStatus, setStatusPost] = useState(statusPost)

    const [active, setActive] = useState(true)

    const post_id = useSelector(selectPostId)

    const handleOnChange = (e) => {
        setCommentInput({ comment_content: e.target.value })
    }

    const handleCallBackLikePost = useCallback(() => {
        handleCallbackLikePost();
    }, [handleCallbackLikePost])

    const handleCallBackSavedPost = useCallback(() => {
        handleCallbackSavedPost();
    }, [handleCallbackSavedPost])

    const handleLikePost = async () => {
        try {
            setStatusPost((prev) => ({
                ...prev,
                liked: !prev.liked
            }))

            if (handleCallbackLikePost) {
                handleCallBackLikePost()
            }
            else {
                await likePost(post_id)
            }
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

            signalFlag(true)
        }
        catch (err) {
            console.log("err: " + err)
        }
    }

    const handleSavePost = async () => {
        try {
            setStatusPost((prev) => ({
                ...prev,
                saved: !prev.saved
            }))

            if (handleCallbackLikePost) {
                handleCallBackSavedPost()
            }
            else {
                await storePost(post_id)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (commentInput.comment_content !== '') {
            setActive(false)
        }
        else {
            setActive(true)
        }

    }, [commentInput.comment_content])

    console.log('statusPost: ' + Object.entries(statusPost))

    return (
        <div>
            <div className="flex justify-between flex-row">
                <div className='flex flex-row gap-1'>
                    <Button
                        onClick={handleLikePost}
                        className='w-[20px]'
                        size="sm"
                        isIconOnly
                        variant="light"
                    >
                        <Heart
                            color={postStatus.liked === true ? 'red' : '#000000'}
                            size={25}
                            strokeWidth={2}
                            fill={postStatus.liked === true ? 'red' : 'none'}
                        />
                    </Button>

                    <Button
                        className='w-[20px]'
                        size="sm"
                        isIconOnly
                        variant="light"
                    >
                        <MessageCircle size={25} strokeWidth={2} />
                    </Button>

                    <Button size="sm" isIconOnly variant="light" >
                        <SendHorizontal size={25} strokeWidth={2} className='transform -rotate-28 -translate-y-0.5' />
                    </Button>
                </div>
                <Button
                    onClick={handleSavePost}
                    size="sm"
                    isIconOnly
                    variant="light"
                >
                    <Bookmark
                        size={25}
                        strokeWidth={2}
                        fill={postStatus.saved === true ? 'yellow' : 'none'}
                    />
                </Button>
            </div>

            <div className='flex flex-col gap-2'>
                <div className="flex-row flex gap-1 ">
                    <h2
                        className='text-md text-black dark:text-white font-quick_sans  translate-x-2'>
                        {number_likes}
                    </h2>

                    <span className='text-md text-black dark:text-white font-quick_sans  translate-x-2'>
                        lượt thích
                    </span>
                </div>

                <div className='flex gap-1 items-end'>
                    <Input
                        name='comment_content'
                        value={commentInput.comment_content}
                        onChange={handleOnChange}
                        variant='bordered'
                        isLoading={isLoading}
                        placeholder="Thêm bình luận..."
                        className='text-black dark:placeholder:text-black border-black px-1'
                        endContent={
                            <Button
                                size="sm"
                                variant="bordered"
                                onClick={handlePostComment}
                                isDisabled={active}
                                className={`hover:bg-black border-black text-black hover:text-white font-mont font-bold text-sm shadow-lg  ${active ? 'invisible delay-150' : ''}`}
                                color="primary"
                            >
                                Đăng
                            </Button>}
                    />
                </div>
            </div>
        </div>
    )
}

export default CardFooter

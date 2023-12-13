import { Button, Input } from "@nextui-org/react";
import { selectPostId, selectStatusLikedPost, selectStatusNumberLikes, selectStatusSavedPost } from "app/slice/post/post.slice";
import { Bookmark, Heart, MessageCircle, SendHorizontal } from 'lucide-react';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { likePost, postComment, storePost } from "services/post.svc";

const CardFooter = ({ signalFlag }) => {
    const number_likes = useSelector(selectStatusNumberLikes)
    const [commentInput, setCommentInput] = useState({
        comment_content: ''
    })

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

    const handleLikePost = async () => {
        try {

            setStatusPost((prev) => ({
                ...prev,
                liked: !prev.liked
            }))

            await likePost(post_id)
        }
        catch (err) {
            console.log(err)
        }

    }

    const handlePostComment = async () => {
        try {
            await postComment(post_id, commentInput)

            setCommentInput({ comment_content: '' })

            signalFlag(true)
        }
        catch (err) {
            console.log("err: " + err)
        }
    }

    const handleSavePost = async () => {
        try {
            await storePost(post_id)
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
                <div className="flex-row flex gap-1">
                    <h2
                        className='text-sm text-black dark:text-white font-open_sans font-bold'>
                        {postStatus.liked === true ? Number(number_likes) + 1 : number_likes}
                    </h2>

                    <span className='text-sm text-black dark:text-white font-open_sans font-bold'>
                        lượt thích
                    </span>
                </div>

                <div className='flex gap-1 items-end'>
                    <Input
                        name='comment_content'
                        value={commentInput.comment_content}
                        onChange={handleOnChange}
                        variant='underlined'
                        placeholder="Thêm bình luận..."
                        className='text-white dark:placeholder:text-black'
                        endContent={
                            <Button
                                size="sm"
                                variant="bordered"
                                onClick={handlePostComment}
                                isDisabled={active}
                                className={`hover:bg-black border-black text-black font-mont font-bold text-sm shadow-lg  ${active ? 'invisible delay-150' : ''}`}
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

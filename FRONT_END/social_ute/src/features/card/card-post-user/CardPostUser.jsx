import { Avatar } from "@nextui-org/avatar";
import { Card, CardHeader } from "@nextui-org/card";
import { Button, Image, Input, Link, useDisclosure } from "@nextui-org/react";
import { setInfoPost, setStatusPost } from "app/slice/post/post.slice";
import DropdownShowMoreOptions from "features/dropdown/dropdown-show-more-options";
import ModalPostUser from "features/modal/modal-post-user";
import { Bookmark, Heart, MessageCircle, SendHorizontal } from 'lucide-react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getPostById, likePost, storePost } from "services/post.svc";
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

    const userName = getFullName(user_id?.first_name, user_id?.last_name)
    const ID = getUserIdFromCookie()

    const handleLikePost = async () => {
        try {
            setStatusPosts((prev) => ({
                ...prev,
                isLiked: !prev.isLiked,
            }))

            await likePost(post_id)
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

    return (
        <div className='w-10/12 p-2'>
            <Card
                classNames={{
                    base: 'border-black border dark:border-none'
                }}
                className="grid grid-rows-8 w-full h-[550px] "
                radius='sm'
                shadow='sm'>
                <CardHeader className="flex gap-3 justify-between row-span-1">
                    <div className="flex flex-row gap-3 items-center">
                        <Avatar src={post_avatar} />

                        <Link
                            color="foreground"
                            href={user_id._id !== ID ? `welcome/home-guest/${user_id._id}` : `welcome/home-user/${ID}`}
                            underline="active"
                        >
                            <p className="text-md hover:underline text-md text-black dark:text-white font-mono  ">
                                {userName}
                            </p>
                        </Link>

                    </div>

                    <DropdownShowMoreOptions
                        user_id={user_id}
                        post_id={post_id}

                        statusPost={statusPost}
                        handleCallbackLikedPost={handleLikePost}
                        handleCallbackSavedPost={handleSavePost}
                    />

                </CardHeader>

                <div className="w-full flex flex-col gap-2 row-span-6 h-[500px] overflow-hidden">
                    <Image
                        removeWrapper
                        loading="lazy"
                        alt="img"
                        className="object-fill h-3/5 w-full rounded-md"
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
                                    color={statusPost.isLiked === true ? 'red' : '#ffffff'}
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
                                color={statusPost.isSaved === true ? 'yellow' : '#ffffff'}
                                size={20}
                                strokeWidth={1.5}
                                fill={statusPost.isSaved === true ? 'yellow' : 'none'} />
                        </Button>
                    </div>

                    <div className='flex flex-col gap-2 px-2'>
                        <div className="flex-row flex gap-1">
                            <h2 className='text-md text-black dark:text-white font-mono '>{number_likes}</h2>
                            <span className='text-md text-black dark:text-white font-mono '>lượt thích</span>
                        </div>

                        <div className="flex-row flex gap-1">
                            <h2 className="text-md text-black dark:text-white  font-mono ">{`${userName}: ${post_description}`}</h2>
                        </div>

                        <Input variant='underlined' placeholder="Thêm bình luận..." />
                    </div>
                </div >
            </Card >

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

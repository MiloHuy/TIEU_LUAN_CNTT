import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Input, Link, useDisclosure } from "@nextui-org/react";
import { setInfoPost, setStatusPost } from "app/slice/post/post.slice";
import ModalPostUser from "features/modal-post-user";
import PopupShowMoreOptions from "features/popup-show-more-options";
import { Bookmark, Heart, MessageCircle, MoreHorizontal, SendHorizontal } from 'lucide-react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getPostById, likePost, storePost } from "services/post.svc";
import { getFullName } from "utils/user.utils";

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
    const [like, setLike] = useState(liked)
    const [save, setSave] = useState(save_posts)
    const dispatch = useDispatch()

    const userName = getFullName(user_id?.first_name, user_id?.last_name)

    const handleLikePost = async () => {
        try {
            setLike(!like)

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

            dispatch(setStatusPost({ like, save, number_likes }))
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleSavePost = async () => {
        try {
            setSave(!save)

            await storePost(post_id)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='w-10/12 p-2'>
            <Card className="grid grid-rows-8 w-full h-[600px]">
                <CardHeader className="flex gap-3 justify-between row-span-1">
                    <div className="flex flex-row gap-3 items-center">
                        <Avatar src={post_avatar} />

                        <Link color="foreground" href={`welcome/home-guest/${user_id._id}`} underline="active" >
                            <p className="text-md text-sm text-black dark:text-white font-open_sans font-bold ">
                                {userName}
                            </p>
                        </Link>

                    </div>

                    <PopupShowMoreOptions
                        trigger={
                            <Button
                                className='w-[20px]'
                                size="sm"
                                isIconOnly
                                variant="light"
                            >
                                <MoreHorizontal size={28} strokeWidth={1.5} />

                            </Button>
                        } />

                </CardHeader>

                <CardBody className="w-full flex flex-col gap-2 row-span-6 h-[500px] overflow-hidden">
                    <img
                        loading="lazy"
                        alt="img"
                        className="object-fill h-3/5 w-full rounded-xl"
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
                                    fill={like === true ? 'red' : 'none'} />
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

                            <Button size="sm" isIconOnly variant="light" >
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
                                fill={save === true ? 'yellow' : 'none'} />
                        </Button>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className="flex-row flex gap-1">
                            <h2 className='text-sm text-black dark:text-white font-open_sans font-bold'>{like === true ? Number(number_likes) + 1 : number_likes}</h2>
                            <span className='text-sm text-black dark:text-white font-open_sans font-bold'>lượt thích</span>
                        </div>

                        <div className="flex-row flex gap-1">
                            <h2 className="text-sm text-black dark:text-white  font-open_sans font-bold">{`${userName}: ${post_description}`}</h2>
                        </div>

                        <Input variant='underlined' placeholder="Thêm bình luận..." />
                    </div>
                </CardBody>
            </Card>

            <ModalPostUser
                isOpen={isOpen}
                onOpenChange={onOpenChange}

                userName={userName}
            />

        </div >
    )
}

export default CardPostUser

import { Button, Input } from "@nextui-org/react";
import { selectStatusLikedPost, selectStatusNumberLikes, selectStatusSavedPost } from "app/slice/post/post.slice";
import { Bookmark, Heart, MessageCircle, SendHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';

const CardFooter = () => {
    const liked = useSelector(selectStatusLikedPost)
    const saved = useSelector(selectStatusSavedPost)
    const number_likes = useSelector(selectStatusNumberLikes)

    return (
        <div>
            <div className="flex justify-between">
                <div className='flex flex-row gap-1'>
                    <Button
                        className='w-[20px]'
                        size="sm"
                        isIconOnly
                        variant="light"
                    >
                        <Heart
                            size={25}
                            strokeWidth={2}
                            fill={liked === true ? 'red' : 'none'}
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
                    size="sm"
                    isIconOnly
                    variant="light"
                >
                    <Bookmark
                        size={25}
                        strokeWidth={2}
                        fill={saved === true ? 'yellow' : 'none'}
                    />
                </Button>
            </div>

            <div className='flex flex-col gap-2'>
                <div className="flex-row flex gap-1">
                    <h2
                        className='text-sm text-black dark:text-white font-open_sans font-bold'>
                        {liked === true ? Number(number_likes) + 1 : number_likes}
                    </h2>

                    <span className='text-sm text-black dark:text-white font-open_sans font-bold'>
                        lượt thích
                    </span>
                </div>

                <Input
                    variant='underlined'
                    placeholder="Thêm bình luận..."
                    className='text-white dark:placeholder:text-black' />
            </div>
        </div>
    )
}

export default CardFooter

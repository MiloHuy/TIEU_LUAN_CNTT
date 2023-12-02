import { Button, Input } from "@nextui-org/react";
import { Bookmark, Heart, MessageCircle, SendHorizontal } from 'lucide-react';

const CardFooter = () => {
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
                        <Heart size={25} strokeWidth={2} />
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
                    <Bookmark size={25} strokeWidth={2} />
                </Button>
            </div>

            <div className='flex flex-col gap-2'>
                <div className="flex-row flex gap-1">
                    <h2 className='text-sm text-black dark:text-white font-open_sans font-bold'>800</h2>
                    <span className='text-sm text-black dark:text-white font-open_sans font-bold'>lượt thích</span>
                </div>

                <Input variant='underlined' placeholder="Thêm bình luận..." className='text-white dark:placeholder:text-black' />
            </div>
        </div>
    )
}

export default CardFooter

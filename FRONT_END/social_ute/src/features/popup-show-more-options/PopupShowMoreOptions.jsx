import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Bookmark, Heart, SendHorizontal } from 'lucide-react';

const PopupShowMoreOptions = ({ trigger }) => {

    return (
        <Popover
            placement="bottom-end"
            showArrow={true}
            classNames={{
                content: [
                    "bg-[#8F8F8F] text-white",
                    "dark:bg-[#8F8F8F] dark:text-white",
                ],
            }}
        >

            <PopoverTrigger children>
                {trigger}
            </PopoverTrigger>

            <PopoverContent className="w-[200px]">
                <div className='grid grid-cols-1 gap-1 w-full'>
                    <Button variant="light" >
                        <div className='flex w-full gap-2'>
                            <Bookmark size={20} strokeWidth={1.5} />
                            <p className='text-md font-open_sans font-bold dark:text-white'>Lưu bài viết</p>
                        </div>
                    </Button>

                    <div className=" w-full flex items-center justify-center">
                        <Divider orientation="horizontal" className="w-4/5" />
                    </div>

                    <Button variant="light"  >
                        <div className='flex w-full gap-2'>
                            <Heart size={20} strokeWidth={1.5} />
                            <p className='text-md font-open_sans font-bold dark:text-white'>Yêu thích bài viết</p>
                        </div>

                    </Button>

                    <div className=" w-full flex items-center justify-center">
                        <Divider orientation="horizontal" className="w-4/5" />
                    </div>

                    <Button variant="light" >
                        <div className='flex w-full gap-2'>
                            <SendHorizontal
                                size={20}
                                strokeWidth={1.5}
                                className='transform -rotate-28 -translate-y-0.5' />

                            <p className='text-md font-open_sans font-bold dark:text-white'> Chia sẻ bài viết</p>
                        </div>
                    </Button>
                </div>

            </PopoverContent>

        </Popover>
    )
}

export default PopupShowMoreOptions

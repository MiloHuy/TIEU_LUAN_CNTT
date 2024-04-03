import { Button } from "@nextui-org/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/carousel";
import { ShareIcon } from "components/icon/bonus.icon";
import HeaderPostUser from "layout/header-post-user";
import { Bookmark, Heart, MessageCircle } from 'lucide-react';

const CardPostUserMock = () => {
    return (
        <div className='max-w-[40vw] w-[38vw] p-2'>
            <div className="flex flex-col gap-2 py-2 w-full max-h-[80vh] h-max border border-black dark:border-white rounded-lg items-center">
                <HeaderPostUser
                    className='min-h-[8vh] h-[8vh] rounded-[30px] w-[34vw] '
                />

                <div className="w-full min-h-[70vh] h-[70vh] flex-col gap-2 justify-between">
                    <Carousel className="w-full h-3/5 ">
                        <CarouselContent>
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <img
                                            loading="lazy"
                                            alt="img"
                                            className="object-fill h-3/5 w-full"
                                            src='https://github.com/shadcn.png'
                                        />
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>

                    <div className='flex justify-between mt-8'>
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
                                {/* <SendHorizontal
                                    size={20}
                                    strokeWidth={1.5}
                                    className='transform -rotate-28 -translate-y-0.5'
                                /> */}
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
                                userName:
                                <span className="font-normal gap-3">post_description</span>
                            </p>
                        </div>
                    </div>

                </div >
            </div >

        </div >
    )
}

export default CardPostUserMock

import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button, Input } from "@nextui-org/react";
import { Bookmark, Heart, MessageCircle, MoreHorizontal, SendHorizontal } from 'lucide-react';

const CardPostUser = (props) => {
    const { post_img, post_description } = props
    return (
        <Card className="grid grid-rows-7 w-3/4 h-[600px]">
            <CardHeader className="flex gap-3 justify-between row-span-1">
                <div className="flex flex-row gap-1 items-center">
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                    <p className="text-md">Username</p>
                </div>
                <MoreHorizontal size={28} strokeWidth={1.5} />
            </CardHeader>
            <Divider />
            <CardBody className="w-full flex flex-col gap-2 row-span-5 h-[500px] overflow-hidden">
                <img
                    alt="img"
                    className="object-fill h-3/5 w-full rounded-xl"
                    src='https://static.wikia.nocookie.net/webarebears/images/f/fa/Panda_png.png/'
                />
                <div className='flex justify-between'>
                    <div className='flex flex-row gap-1'>
                        <Button className='w-[20px]' size="sm" isIconOnly variant="light">
                            <Heart size={20} strokeWidth={1.5} />
                        </Button>

                        <Button className='w-[20px]' size="sm" isIconOnly variant="light">
                            <MessageCircle size={20} strokeWidth={1.5} />
                        </Button>

                        <Button size="sm" isIconOnly variant="light" >
                            <SendHorizontal size={20} strokeWidth={1.5} className='transform -rotate-28 -translate-y-0.5' />
                        </Button>
                    </div>
                    <Button size="sm" isIconOnly variant="light" >
                        <Bookmark size={20} strokeWidth={1.5} />
                    </Button>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className="flex-row flex gap-1">
                        <h2>800</h2>
                        <span>lượt thích</span>
                    </div>

                    <div className="flex-row flex gap-1">
                        <h2>{`userName: ${post_description}`}</h2>
                    </div>

                    <Input type="email" variant='underlined' placeholder="Thêm bình luận..." />
                </div>
            </CardBody>
        </Card>
    )
}

export default CardPostUser

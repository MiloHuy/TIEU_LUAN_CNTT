import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Input, Modal, ModalBody, ModalContent, Skeleton, useDisclosure } from "@nextui-org/react";
import CardPostUserDetail from "features/card-post-user-detail";
import { Bookmark, Heart, MessageCircle, MoreHorizontal, SendHorizontal } from 'lucide-react';
import { useState } from "react";
import { getPostById, likePost, storePost } from "services/post.svc";


const CardPostUser = (props) => {
    const { post_img, post_description, user_id, post_id, isLoaded } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [like, setLike] = useState(false)
    const [save, setSave] = useState(false)

    console.log("Isloading...: ", isLoaded)

    const userName = [user_id?.first_name, user_id?.last_name].join(" ")

    const handleLikePost = async () => {
        try {
            setLike(!like)

            await likePost(post_id)

            console.log('Đã like bài viết')
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCommentPost = async () => {
        onOpen()

        try {
            await getPostById(post_id)
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
        <div className='w-full p-2'>
            <Skeleton isLoaded='false'>
                <Card isPressable className="grid grid-rows-8 w-full h-[600px]">
                    <CardHeader className="flex gap-3 justify-between row-span-1">
                        <div className="flex flex-row gap-3 items-center">
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />

                            <p className="text-md text-sm text-black dark:text-white font-open_sans font-bold ">
                                {userName}
                            </p>
                        </div>

                        <MoreHorizontal size={28} strokeWidth={1.5} />

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
                                    <Heart size={20} strokeWidth={1.5} fill={like === true ? 'red' : 'none'} />
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
                                <Bookmark size={20} strokeWidth={1.5} fill={save === true ? 'yellow' : 'none'} />
                            </Button>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className="flex-row flex gap-1">
                                <h2 className='text-sm text-black dark:text-white font-open_sans font-bold'>800</h2>
                                <span className='text-sm text-black dark:text-white font-open_sans font-bold'>lượt thích</span>
                            </div>

                            <div className="flex-row flex gap-1">
                                <h2 className="text-sm text-black dark:text-white  font-open_sans font-bold   ">{`${userName}: ${post_description}`}</h2>
                            </div>

                            <Input variant='underlined' placeholder="Thêm bình luận..." />
                        </div>
                    </CardBody>
                </Card>
            </Skeleton>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="2xl"
                size='5xl'
                backdrop='blur'
                stlye={{ height: '1000px' }}
                classNames={{
                    base: "border-[#ffffff] bg-[#929292] dark:bg-black text-[#a8b0d3]",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <CardPostUserDetail
                                    userName={userName}
                                    post_img={post_img}
                                    post_description={post_description}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >

    )
}

export default CardPostUser

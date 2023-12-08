import { Image, useDisclosure } from "@nextui-org/react";
import { setInfoPost } from "app/slice/post/post.slice";
import FormUploadImageDetail from "features/form-upload-image-detail";
import ModalPostUser from "features/modal-post-user";
import { useDispatch } from 'react-redux';
import { getPostById } from "services/post.svc";

const ListPostUserDetail = (props) => {
    const { posts, userName } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useDispatch()

    const handleOpenPostDetails = async (post_id) => {
        onOpen()

        try {
            const postByid = await getPostById(post_id)
            dispatch(setInfoPost({ ...postByid }))
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        posts.length !== 0
            ?
            <div className='grid grid-cols-3 gap-2 w-full h-screen'>
                {
                    posts.data.posts.map((post) => {
                        return (
                            <div className="relative group w-full h-full rounded-[15px] bg-white">
                                <Image
                                    isZoomed
                                    loading="lazy"
                                    className="object-fill h-80 w-96 opacity-10 block  transition duration-500 ease-in-out hover:opacity-30 cursor-pointer"
                                    src={post.post_img.url}
                                    alt='image1'
                                    onClick={() => handleOpenPostDetails(post._id)}
                                />
                            </div>
                        )
                    }
                    )
                }
                <ModalPostUser
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    userName={userName}
                />
            </div >
            :
            <FormUploadImageDetail />
    )
}

export default ListPostUserDetail
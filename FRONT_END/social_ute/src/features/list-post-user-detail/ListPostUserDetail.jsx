import { Image } from "@nextui-org/react";
import FormUploadImageDetail from "features/form-upload-image-detail";

const ListPostUserDetail = (props) => {
    const { posts } = props

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
                                    className="object-fill h-80 w-96 opacity-10 block  transition duration-500 ease-in-out hover:opacity-30"
                                    src={post.post_img.url}
                                    alt='image1' />

                            </div>
                        )
                    }
                    )
                }
            </div >
            :
            <FormUploadImageDetail />
    )
}

export default ListPostUserDetail

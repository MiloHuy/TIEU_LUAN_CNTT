import { Image } from "@nextui-org/react";
import FormUploadImageDetail from "features/form/form-upload-image-detail";

const ListStoryUserDetail = (props) => {
    const { stories } = props

    return (
        stories.length !== 0 ? <div className='grid grid-cols-3 gap-2 w-full h-screen'>
            {
                stories.data.posts.map((story) => {
                    return (
                        <div className="relative group w-full h-full rounded-[15px] bg-white">
                            <Image
                                isZoomed
                                loading="lazy"
                                className="object-fill h-80 w-96 opacity-10 block  transition duration-500 ease-in-out hover:opacity-30"
                                src={story.post_img.url}
                                alt='image1' />

                        </div>
                    )
                }
                )
            }
        </div > : <FormUploadImageDetail />
    )
}

export default ListStoryUserDetail

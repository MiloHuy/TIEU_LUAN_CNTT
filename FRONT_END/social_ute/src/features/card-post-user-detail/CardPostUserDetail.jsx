import { Spinner } from "@nextui-org/react";
import { selectPostDescription, selectPostImg } from "app/slice/post/post.slice";
import { useSelector } from 'react-redux';
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

const CardPostUserDetail = ({ userName }) => {
    const post_img = useSelector(selectPostImg)
    const post_description = useSelector(selectPostDescription)

    return (
        <div className='w-full h-[500px] grid grid-cols-2 gap-2'>
            <div className="h-full">
                {post_img ?
                    <img
                        loading="lazy"
                        alt="img"
                        className="object-fill h-[500px] w-full rounded-xl"
                        src={post_img}
                    /> :
                    <div className='flex items-center justify-center h-full'>
                        <Spinner color="default" />
                    </div>
                }
            </div>

            <div className="grid grid-rows-7 gap-2 h-[550px]">
                <div className='row-span-1 flex items-start mt-2'>
                    <CardHeader userName={userName} />
                </div>

                <div className='row-span-4'>
                    <CardBody />
                </div>

                <div className='row-span-2'>
                    <CardFooter />
                </div>
            </div>
        </div>
    )
}

export default CardPostUserDetail

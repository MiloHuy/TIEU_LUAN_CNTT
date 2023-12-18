import { Spinner } from "@nextui-org/react";
import { selectPostDescription, selectPostImg } from "app/slice/post/post.slice";
import { useState } from "react";
import { useSelector } from 'react-redux';
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

const CardPostUserDetail = ({ handleCallbackLikePost, handleCallbackSavedPost }) => {
    const post_img = useSelector(selectPostImg)
    const post_description = useSelector(selectPostDescription)
    const [flag, setFlag] = useState(false)

    const SignalFlag = (flag) => {
        setFlag(flag)
    }

    return (
        <div className='w-full h-[500px] grid grid-cols-2 gap-2'>
            <div className="h-full ">
                {
                    post_img ?
                        <img
                            loading="lazy"
                            alt="img"
                            className="object-fill h-[500px] w-full rounded-sm"
                            src={post_img}
                        /> :
                        <div className='flex items-center justify-center h-full'>
                            <Spinner color="default" />
                        </div>
                }
            </div>

            <div className="flex flex-col h-[550px] gap-3">
                <div className='flex items-center pt-2 h-[50px]'>
                    <CardHeader
                        handleCallbackLikePost={handleCallbackLikePost}
                        handleCallbackSavedPost={handleCallbackSavedPost}
                    />
                </div>

                <div className='h-[300px] flex flex-col gap-2'>
                    {
                        post_img ?
                            <CardBody
                                flag={flag}
                            /> :
                            <Spinner color="default" />
                    }
                </div>

                <div className='h-20 w-full'>
                    {
                        post_img ?
                            <CardFooter
                                handleCallbackLikePost={handleCallbackLikePost}
                                handleCallbackSavedPost={handleCallbackSavedPost}
                                signalFlag={SignalFlag}
                            /> :
                            <div className='flex items-center justify-center h-full'>
                                <Spinner color="default" />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CardPostUserDetail

import PropagateLoader from "components/loading/propagate-loading";
import { useState } from "react";
import PostDetailV2 from "./PostDetailV2";

const PostDetail = () => {
    const [postInfo, setPostInfo] = useState()

    return (
        postInfo ?
            <div className="w-full h-full flex items-center ">
                <PostDetailV2 />
            </div>
            :
            <div className='w-full h-full flex items-center justify-center'>
                <PropagateLoader
                    color="#9aa19f"
                    size={18}
                />
            </div >
    )
}

export default PostDetail

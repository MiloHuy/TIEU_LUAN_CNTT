import { useDisclosure } from "@nextui-org/react";
import { setInfoPost, setStatusPost } from "app/slice/post/post.slice";
import PropagateLoader from "components/loading/propagate-loading";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { getPostById } from "services/post/api-get.svc";
import { likePost, storePost } from "services/post/api-post.svc";
import { getFullName, getUserIdFromCookie } from "utils/user.utils";
import PostDetailV2 from "./PostDetailV2";

const PostDetail = () => {
    const { postId } = useParams()
    const [postInfo, setPostInfo] = useState()

    const initStatusPost = {
        isLiked: '',
        isSaved: '',
    }
    const [statusPost, setStatusPosts] = useState(initStatusPost)
    const dispatch = useDispatch()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const userName = getFullName(postInfo?.post?.user_id?.first_name, postInfo?.post?.user_id?.last_name)
    const ID = getUserIdFromCookie()

    const fetchPostById = useCallback(async () => {
        try {
            const postByid = await getPostById(postId)
            setPostInfo(postByid.data)

            setStatusPosts({
                isLiked: postByid.data.post.liked,
                isSaved: postByid.data.post.stored
            })
        }
        catch (err) {
            console.log(err)
        }
    }, [postId])

    const handleLikePost = async () => {
        try {
            setStatusPosts((prev) => ({
                ...prev,
                isLiked: !prev.isLiked,
            }))

            await likePost(postId)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCommentPost = async () => {
        onOpen()

        try {
            const postByid = await getPostById(postId)
            dispatch(setInfoPost({ ...postByid }))

            dispatch(
                setStatusPost({
                    like: statusPost.isLiked,
                    save: statusPost.isSaved,
                    number_likes: postInfo.post.likes
                }))
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleSavePost = async () => {
        try {
            setStatusPosts((prev) => ({
                ...prev,
                isSaved: !prev.isSaved,
            }))

            await storePost(postId)
        }
        catch (err) {
            console.log(err)
        }
    }

    const CopyURL = () => {
        const el = document.createElement("input");
        el.value = window.location.href
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);

        toast.success('Sao chép đường dẫn thành công!!!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    useEffect(() => {
        fetchPostById()
    }, [fetchPostById])

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

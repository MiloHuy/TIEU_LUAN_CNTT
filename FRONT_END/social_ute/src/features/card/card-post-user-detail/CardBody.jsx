import { Spinner } from "@nextui-org/react";
import { selectPostId } from "app/slice/post/post.slice";
import ListCommentUser from "features/list/list-comment-user";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { getCommentPost } from "services/post.svc";

const CardBody = ({ flag }) => {
    const [comments, setComment] = useState()
    const post_id = useSelector(selectPostId)
    const [isDisabled, setIsDisabled] = useState(false)

    const fetchAllComment = useCallback(async () => {
        try {
            const allCommnent = await getCommentPost(post_id)
            setComment({ ...allCommnent.data })
        }
        catch (error) {
            console.log("Error: ", error.response)

            const { code } = error.response.data
            if (code) {
                setIsDisabled(true)
            }
        }
    }, [post_id])

    useEffect(() => {
        if (post_id || flag === true) {
            fetchAllComment()
        }
    }, [fetchAllComment, post_id, flag])

    return (

        comments
            ?
            isDisabled ?
                comments.comments.length ?
                    comments.comments.map((comment) => {
                        return (
                            <ListCommentUser
                                comment={comment}
                            />
                        )
                    }) : <p className="text-black">Không có bình luận nào ở bài viết này.</p>
                :
                <div className='w-full h-full flex items-center justify-center'>
                    <Spinner color="default" size="lg" />
                </div >
            : <p className='text-black dark:text-white font-mono text-lg'>
                Không thể bình luận
            </p>
    )

}

export default CardBody

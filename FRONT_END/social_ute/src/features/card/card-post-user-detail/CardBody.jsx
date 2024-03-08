import { Spinner } from "@nextui-org/react";
import { selectPostId } from "app/slice/post/post.slice";
import { selectGuestFrienndCheck } from "app/slice/user/guest.slice";
import { ERR_POST } from "constants/error.const";
import ListCommentUser from "features/list/list-comment-user";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCommentPost } from "services/post.svc";
import { checkCodeInArray } from "utils/code-error.utils";

const CardBody = ({ flag }) => {
    const [comments, setComment] = useState()
    const post_id = useSelector(selectPostId)
    const [isDisabled, setIsDisabled] = useState(true)
    const guest_friend_check = useSelector(selectGuestFrienndCheck)


    const fetchAllComment = useCallback(async () => {
        try {
            const allCommnent = await getCommentPost(post_id)
            setComment({ ...allCommnent.data })
        }
        catch (error) {
            const { code } = error.response.data

            const messageError = checkCodeInArray(ERR_POST, code)
            if (messageError) {
                setIsDisabled(false)

                toast.error(`${messageError}`, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
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
            comments.comments.length
                ?
                comments.comments.map((comment) => {
                    return (
                        <ListCommentUser
                            comment={comment}
                        />
                    )
                })
                : <p className="text-black">Không có bình luận nào ở bài viết này.</p>

            :
            <div className='w-full h-full flex items-center justify-center'>
                <Spinner color="default" size="lg" />
            </div >

    )

}

export default CardBody

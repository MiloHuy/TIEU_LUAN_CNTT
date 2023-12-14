import { Avatar, Button } from "@nextui-org/react";
import { Heart } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { likeComment } from "services/post.svc";
import { getFullName } from "utils/user.utils";

const ListCommentUser = ({ comment }) => {
    const [like, setLike] = useState(comment.liked)
    const navigate = useNavigate()

    const handleNaviageUser = () => {
        navigate('')
    }

    const handleLikeComment = async (id) => {
        try {
            setLike(!like)
            await likeComment(id)
        }
        catch (err) {
            console.log("err: " + err)
        }
    }

    console.log('like: ' + Object.entries(comment))

    return (
        <div className="w-full flex justify-between">
            <div className="flex flex-row gap-3 items-center">
                <Avatar
                    size="sm"
                    src={comment.user_id.avatar.url} />

                <p
                    onClick={handleNaviageUser}
                    className=" text-sm text-black dark:text-white font-open_sans font-bold hover:underline cursor-pointer">
                    {getFullName(comment.user_id.first_name, comment.user_id.last_name)}
                </p>

                <p className=" text-sm text-black dark:text-white font-open_sans font-bold ">{comment.comment_content}</p>

            </div>

            <Button
                onClick={() => handleLikeComment(comment._id)}
                isIconOnly
                variant="light" >
                <Heart
                    fill={like === true ? 'red' : 'none'}
                    size={16}
                    strokeWidth={0.75} />
            </Button>
        </div>

    )
}

export default ListCommentUser

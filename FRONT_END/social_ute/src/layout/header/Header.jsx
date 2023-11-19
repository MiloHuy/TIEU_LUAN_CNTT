import clsx from "clsx"
import CardStoryUser from "features/card-story-user"

const Header = (props) => {
    const { imgs, userNames, className } = props
    return (
        <div className={clsx("flex gap-2 space-x-2", className)}>
            <CardStoryUser />
            <CardStoryUser />
            <CardStoryUser />
            <CardStoryUser />
            <CardStoryUser />
            <CardStoryUser />
            <CardStoryUser />
            <CardStoryUser />
        </div>
    )
}

export default Header

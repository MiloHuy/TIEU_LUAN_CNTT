import clsx from "clsx"
import SidebarBody from "./SidebarBody"
import SidebarFooter from "./SidebarFooter"
import SidebarHeader from "./SidebarHeader"

const SidebarUser = (props) => {
    const { userID } = props

    const handleController = (value) => {
        props.handleController(value)
    }
    return (
        <div className={clsx('grid grid-cols-1 gap-2 left-0 w-full ', props.className)}>
            <SidebarHeader className='w-2/3' />
            <SidebarBody
                userID={userID}
                className='flex items-start justify-center p-4' />
            <SidebarFooter handleSwitch={handleController} className='flex items-center justify-start p-0 m-auto' />
        </div>
    )
}

export default SidebarUser

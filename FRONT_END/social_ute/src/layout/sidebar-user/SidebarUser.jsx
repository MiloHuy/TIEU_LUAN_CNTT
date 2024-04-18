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
        <div className={clsx('grid gap-2 left-0 min-w-[20vw] min-h-[100vh] border-r border-black dark:border-white overflow-auto no-scrollbar', props.className)}>
            <SidebarHeader className='w-full' />

            <SidebarBody
                userID={userID}
                className='flex items-start justify-center' />

            <SidebarFooter
                handleSwitch={handleController}
                className='flex items-center justify-start p-0 m-auto'
            />
        </div>
    )
}

export default SidebarUser

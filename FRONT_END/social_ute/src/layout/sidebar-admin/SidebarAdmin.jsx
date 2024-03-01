import clsx from "clsx"
import SidebarBody from "./SidebarBody"
import SidebarFooter from "./SidebarFooter"
import SidebarHeader from "./SidebarHeader"

const SidebarAdmin = (props) => {
    const { icons, userID, darkmode } = props

    const handleController = (value) => {
        props.handleController(value)
    }
    return (
        <div className={clsx('grid grid-cols-1 gap-2 left-0 w-full overflow-auto', props.className)}>
            <SidebarHeader className='w-2/3' />

            <SidebarBody
                icons={icons}
                darkmode={darkmode}
                className='flex items-start justify-center p-2' />

            <SidebarFooter handleSwitch={handleController} className='flex items-center justify-start p-0 m-auto' />
        </div>
    )
}

export default SidebarAdmin

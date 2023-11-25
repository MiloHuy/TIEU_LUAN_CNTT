import clsx from "clsx"
import SidebarBody from "./SidebarBody"
import SidebarFooter from "./SidebarFooter"
import SidebarHeader from "./SidebarHeader"

const Sidebar = (props) => {
    const { icons } = props

    const handleController = (value) => {
        props.handleController(value)
    }
    return (
        <div className={clsx('flex flex-col gap-2 left-0 max-w-[200px] border', props.className)}>
            <SidebarHeader />
            <SidebarBody icons={icons} className=' flex items-center justify-center p-4' />
            <SidebarFooter handleSwitch={handleController} className='flex items-center justify-center border' />
        </div>
    )
}

export default Sidebar
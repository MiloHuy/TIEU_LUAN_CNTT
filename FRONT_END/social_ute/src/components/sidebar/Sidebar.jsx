import clsx from "clsx"
import { icons } from "components/icon/siderbar.icon"
import SidebarBody from "./SidebarBody"
import SidebarFooter from "./SidebarFooter"
import SidebarHeader from "./SidebarHeader"

const Sidebar = (props) => {
    const handleController = (value) => {
        props.handleController(value)
    }
    return (
        <div className={clsx('flex flex-col gap-2', props.className)}>
            <SidebarHeader />
            <SidebarBody icons={icons} className='border flex items-center justify-center p-4' />
            <SidebarFooter handleSwitch={handleController} className='border flex items-center justify-center' />
        </div>
    )
}

export default Sidebar